const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
const { PdfService } = require('./pdfService');
const { config } = require('./config');
const path = require('path');

function buildFrontPageSections(frontText, dateText, dateTextColor, images, themeColor) {
    // TODO: validation on images

    return [
        {
            type: 'image',
            options: {
                file: images['logo'],
                maxWidth: config.pageWidth / 2,
                maxHeight: 426,
                side: 'right',
                section: {
                    height: 426,
                },
            },
        },
        {
            type: 'text',
            options: {
                text: dateText,
                color: dateTextColor,
                side: 'right',
                textSize: 66.67,
                section: {
                    height: 108,
                    backgroundColor: themeColor,
                },
            },
        },
        {
            type: 'image',
            options: {
                file: images['frontImage'],
                maxWidth: 1440,
                maxHeight: 1100,
                side: 'right',
                section: {
                    height: 1200,
                },
            },
        },
        {
            type: 'text',
            options: {
                text: frontText,
                color: themeColor,
                side: 'right',
                textSize: config.textSize,
                section: {
                    height: 476,
                },
            },
        },
        {
            type: 'text',
            options: {
                text: 'Phương Tiện Thông Tin Liên Lạc Của\nCộng Đoàn Công Giáo Việt Nam Tại Vermont',
                color: '000000',
                side: 'right',
                textSize: 66.67,
                section: {
                    height: 292,
                },
            },
        },
    ];
}

async function generatePdf(frontText, dateText, images) {
    const pdfService = new PdfService();
    await pdfService.setUpPdf();

    const frontPageSections = buildFrontPageSections(frontText, dateText, 'ffffff', images, '03fca9');

    const frontCoverSections = [
        ...frontPageSections,
        {
            type: 'text',
            options: {
                text: 'test',
                color: '915eeb',
                side: 'left',
                textSize: 66.67,
                widthScale: .9,
                border: {
                    color: '000000',
                    thickness: 10,
                    borderRadius: 10,
                },
                section: {
                    yOffset: 100,
                    height: 300,
                },
            },
        },
        {
            type: 'image',
            options: {
                file: images['backImage1'],
                widthScale: .9,
                fit: 'fillAndCrop',
                side: 'left',
                border: {
                    color: '000000',
                    thickness: 10,
                    borderRadius: 10,
                },
                section: {
                    yOffset: 50,
                    height: 500,
                },
            },
        },
        {
            type: 'image',
            options: {
                file: images['backImage2'],
                widthScale: .9,
                fit: 'fillAndCrop',
                side: 'left',
                border: {
                    color: '000000',
                    thickness: 10,
                    borderRadius: 10,
                },
                section: {
                    yOffset: 50,
                    height: 500,
                },
            },
        },
        {
            type: 'image',
            options: {
                file: images['backImage3'],
                widthScale: .9,
                fit: 'fillAndCrop',
                side: 'left',
                border: {
                    color: '000000',
                    thickness: 10,
                    borderRadius: 10,
                },
                section: {
                    yOffset: 50,
                    height: 500,
                },
            },
        },
    ];

    const pages = [
        frontCoverSections,
        frontCoverSections,
    ];

    try {
        for (const page of pages) {
            await pdfService.setUpPage();

            let prevLeftSection;
            let prevRightSection;
            for (let i = 0; i < page.length; i++) {
                const { type, options, options: { section: { height, yOffset } } } = page[i];

                // set section y
                if (page[i].options.side === 'left') {
                    options.section.y = prevLeftSection
                    ? prevLeftSection.options.section.y - height
                    : config.pageHeight - height;
                    options.section.y = options.section.y - (yOffset || 0);
                    prevLeftSection = page[i];
                } else {
                    options.section.y = prevRightSection
                    ? prevRightSection.options.section.y - height
                    : config.pageHeight - height;
                    options.section.y = options.section.y - (yOffset || 0);
                    prevRightSection = page[i];
                }

                if (type === 'text') {
                    await pdfService.drawText(options);
                } else if (type === 'image') {
                    await pdfService.drawImage(options);
                }
            }
        }
    } catch (e) {
        throw e;
    }

    const pdfBytes = await pdfService.pdfDoc.save()
    return pdfBytes;
}

module.exports = {
    generatePdf,
};
