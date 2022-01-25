import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
// const fontkit = require('@pdf-lib/fontkit');
import fontkit from '@pdf-lib/fontkit';
import * as fs from 'fs';
import * as path from 'path';
// import sharp from 'sharp';
const sharp = require('sharp');
import { validateAndCalculateSectionDims } from './helpers';
import { config } from './config';
import { fitOptions } from './enums';
import { Buffer } from 'buffer';

export class PdfService {
    async setUpPdf() {
        this.pdfDoc = await PDFDocument.create();
        this.pdfDoc.registerFontkit(fontkit);
        this.font = await this.pdfDoc.embedFont(fs.readFileSync(path.join(__static, '/Courgette Regular Mac.ttf')));
    }

    async setUpPage() {
        this.page = this.pdfDoc.addPage([config.pageWidth, config.pageHeight]) 

        // TODO: remove center line
        this.page.moveTo(config.pageWidth / 2, 2500);
        this.page.drawSvgPath('M 0,0 l 0,2450');
    }

    // determines which dimension will reach max first to get scale
    determineMaxDimension(width, height, maxWidth, maxHeight) {
        const ratio = width / height;
        const maxRatio = maxWidth / maxHeight;
        if (ratio > maxRatio) {
            // width will reach max first
            return 'width';
        } else {
            return 'height';
        }
    }

    scale(width, height, maxWidth, maxHeight) {
        const maxDim = this.determineMaxDimension(width, height, maxWidth, maxHeight);
        return maxDim === 'width' ? maxWidth / width : maxHeight / height;
    }

    hexToRgb(hex) {
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;

        return rgb(r / 255, g / 255, b / 255);
    }

    getVerticalCenterOfSection(section, imageHeight) {
        const test = (section.y + (section.height / 2)) - (imageHeight / 2);
        return test;
    }

    readFileAsync(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    async drawImage(options) {
        try {
            const { file, maxWidth, maxHeight, widthScale, heightScale, fit, side, border, section } = options;

            const sectionDims = validateAndCalculateSectionDims(section);
            if (section.backgroundColor) this.drawBackground(side, section, sectionDims);

                console.log(file);
            const fileExtension = file.name.split('.').reverse()[0];
            const fileBuffer = await this.readFileAsync(file);
            console.log(fileBuffer);
            let image = await this.pdfDoc[fileExtension === 'jpg' ? 'embedJpg' : 'embedPng'](fileBuffer);

            let scale = 1;
            let imageDims;
            if (fit) {
                console.log('huh', file);
                console.log(file.name);
                const fileName = file.name;
                const croppedFilePath = `./temp/${fileName}`;

                // set defaults
                const cropOptions = {
                    width: Math.floor(sectionDims.width),
                    height: Math.floor(sectionDims.height),
                    left: 0,
                    top: 0,
                };

                if (widthScale) cropOptions.width = Math.floor(cropOptions.width * widthScale);
                if (heightScale) cropOptions.height = Math.floor(cropOptions.height * heightScale);

                if (fit === fitOptions.fillAndCrop) {
                    // if maxDim is width, scale height to max and crop width. otherwise, do the opposite.
                    const maxDim = this.determineMaxDimension(image.width, image.height, cropOptions.width, cropOptions.height);
                    // NOTE: sharp.resize takes in width and height. if one dimension is null, it will autoscale it to fit the other dimension
                    let resizeWidth, resizeHeight;
                    if (maxDim === 'width') {
                        resizeHeight = cropOptions.height;
                        const resizedImageWidth = (resizeHeight / image.height) * image.width;
                        // TODO: by default, currently only shows the horizontal center of the image
                        cropOptions.left = Math.floor((resizedImageWidth / 2) - (cropOptions.width / 2));
                    } else {
                        resizeWidth = cropOptions.width;
                        const resizedImageHeight = (cropOptions.width / image.width) * image.height;
                        // TODO: currently only shows the vertical center of the image
                        cropOptions.top = Math.floor((resizedImageHeight / 2) - (cropOptions.height / 2));
                    }

                    console.log(typeof fileBuffer);
                    const uint8 = new Uint8Array(fileBuffer);
                    const test = await sharp(uint8)
                        .resize(resizeWidth, resizeHeight) // maintains aspect ratio
                        .extract(cropOptions)
                        .toBuffer();
                    console.log(test);
                        // .toBuffer();
                        // .toFile(croppedFilePath);
                    image = await this.pdfDoc[fileExtension === 'jpg' ? 'embedJpg' : 'embedPng'](test);
                    imageDims = image.scale(scale);
                } else if (fit === fitOptions.fill) {
                    imageDims = { width: cropOptions.width, height: cropOptions.height };
                }
            } else {
                if (maxWidth && maxHeight) {
                    scale = this.scale(
                        image.width,
                        image.height,
                        maxWidth,
                        maxHeight,
                    );
                } else if (widthScale) {
                    scale = (sectionDims.width * widthScale) / image.width;
                    console.log('scale ', scale, (config.pageWidth / 2) * widthScale, image.width);
                }
                imageDims = image.scale(scale);
            }

            this.page.drawImage(image, {
                x: ((config.pageWidth / 4) * (side === 'right' ? 3 : 1)) - (imageDims.width / 2), // center of right half of page
                y: this.getVerticalCenterOfSection(section, imageDims.height),
                width: imageDims.width,
                height: imageDims.height,
            });

            if (border) this.drawBorder(options);
        } catch (e) {
            throw e;
        }
    }

    async drawText(options) {
        const {
            text,
            color,
            side,
            section,
            textSize,
            border,
            widthScale,
            heightScale,
            scale,
            section: {
                backgroundColor,
            }
        } = options;

        const sectionDims = validateAndCalculateSectionDims(section);
        if (backgroundColor) this.drawBackground(side, section, sectionDims);
        if (border) this.drawBorder(options);

        const lines = text.split('\n');
        // get total height of lines
        const totalHeight = lines.length * this.font.heightAtSize(textSize);

        // build from bottom up
        let prevConfig;
        for (const line of lines.reverse()) {
            prevConfig = {
                x: ((config.pageWidth / 4) * (side === 'right' ? 3 : 1)) - (this.font.widthOfTextAtSize(line, textSize) / 2),
                y: prevConfig
                    ? (prevConfig.y + this.font.heightAtSize(textSize))
                    : (this.getVerticalCenterOfSection(section, totalHeight) + config.textOffset),
                font: this.font,
                size: textSize,
                color: this.hexToRgb(color),
            }
            this.page.drawText(line, prevConfig);
        }
    }

    drawBackground(side, section, sectionDims) {
        this.page.drawRectangle({
            // TODO: this will only center atm
            x: (side === 'right' ? config.pageWidth / 2 : 0) + (((config.pageWidth / 2) - sectionDims.width) / 2),
            y: section.y,
            width: sectionDims.width,
            height: sectionDims.height,
            color: this.hexToRgb(section.backgroundColor),
        });
    }

    drawBorder(options) {
        const {
            side,
            section,
            border: {
                color,
                thickness,
                borderRadius
            },
            widthScale,
            heightScale,
            scale,
        } = options;
        const width = (config.pageWidth / 2) - (borderRadius * 2);
        const height = section.height - (borderRadius * 2);

        let adjustedWidth, adjustedHeight;
        if (scale) {
            adjustedWidth = width * scale;
            const widthDiff = width - adjustedWidth;
            adjustedHeight = height - widthDiff;
        } else {
            adjustedWidth = width * (widthScale || 1);
            adjustedHeight = height * (heightScale || 1);
        }
        const widthDiff = width - adjustedWidth;
        const heightDiff = height - adjustedHeight;
        const xStartingPoint = borderRadius + (widthDiff / 2);
        const yStartingPoint = heightDiff / 2;
        const svgPath = `M${xStartingPoint},${yStartingPoint} h${adjustedWidth} a10,10 0 0 1 10,10 v${adjustedHeight} a10,10 0 0 1 -10,10 h-${adjustedWidth} a10,10 0 0 1 -10,-10 v-${adjustedHeight} a10,10 0 0 1 10,-10 z`;
        this.page.drawSvgPath(svgPath, {
            x: side === 'right' ? config.pageWidth / 2 : 0,
            y: section.y + section.height,
            borderColor: this.hexToRgb(color),
            borderWidth: thickness,
        });
    }
}
