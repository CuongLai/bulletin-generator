const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
const { PdfService } = require('./pdfService');
const { config } = require('./config');
const path = require('path');

async function generatePdf(frontText, dateText, images) {
    const pdfService = new PdfService();
    await pdfService.setUpPdf();
    await pdfService.setUpPage();

    const sections = [
        {
            type: 'image',
            options: {
                file: images['logo'],
                maxWidth: 1650,
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
                color: '915eeb',
                side: 'right',
                textSize: 66.67,
                section: {
                    height: 108,
                    backgroundColor: '63CFF1',
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
                color: '32a852',
                side: 'right',
                textSize: 75,
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

    // const sections = [
    //   {
    //     type: 'image',
    //     options: {
    //       // imagePath: './assets/logo-red.png',
    //       file: frontImage.buffer,
    //       fileName: frontImage.originalname,
    //       maxWidth: 1650,
    //       maxHeight: 426,
    //       side: 'right',
    //       section: {
    //         height: 426,
    //       },
    //     },
    //   },
    //   {
    //     type: 'text',
    //     options: {
    //       text: 'test',
    //       color: '915eeb',
    //       side: 'right',
    //       textSize: 66.67,
    //       section: {
    //         height: 108,
    //         backgroundColor: '63CFF1',
    //       },
    //     },
    //   },
    //   {
    //     type: 'image',
    //     options: {
    //       file: frontImage.buffer,
    //       fileName: frontImage.originalname,
    //       maxWidth: 1440,
    //       maxHeight: 1100,
    //       side: 'right',
    //       section: {
    //         height: 1200,
    //       },
    //     },
    //   },
    //   {
    //     type: 'text',
    //     options: {
    //       text: frontCoverText,
    //       color: '32a852',
    //       side: 'right',
    //       textSize: 75,
    //       section: {
    //         height: 476,
    //       },
    //     },
    //   },
    //   {
    //     type: 'text',
    //     options: {
    //       text: 'Phương Tiện Thông Tin Liên Lạc Của\nCộng Đoàn Công Giáo Việt Nam Tại Vermont',
    //       color: '000000',
    //       side: 'right',
    //       textSize: 66.67,
    //       section: {
    //         height: 292,
    //       },
    //     },
    //   },
    //   // {
    //   //   type: 'text',
    //   //   options: {
    //   //     text: 'test',
    //   //     color: '915eeb',
    //   //     side: 'left',
    //   //     textSize: 66.67,
    //   //     widthScale: .9,
    //   //     border: {
    //   //       color: '000000',
    //   //       thickness: 10,
    //   //       borderRadius: 10,
    //   //     },
    //   //     section: {
    //   //       yOffset: 100,
    //   //       height: 300,
    //   //     },
    //   //   },
    //   // },
    //   {
    //     type: 'image',
    //     options: {
    //       // imagePath: './assets/calendar.png',
    //       file: backImage1.buffer,
    //       fileName: backImage1.originalname,
    //       // heightScale: .9,
    //       widthScale: .9,
    //       fit: fitOptions.fillAndCrop,
    //       side: 'left',
    //       border: {
    //         color: '000000',
    //         thickness: 10,
    //         borderRadius: 10,
    //       },
    //       section: {
    //         yOffset: 50,
    //         height: 500,
    //         backgroundColor: '63CFF1',
    //       },
    //     },
    //   },
    //   {
    //     type: 'image',
    //     options: {
    //       // imagePath: './assets/calendar.png',
    //       file: backImage2.buffer,
    //       fileName: backImage2.originalname,
    //       // heightScale: .9,
    //       widthScale: .9,
    //       fit: fitOptions.fillAndCrop,
    //       side: 'left',
    //       border: {
    //         color: '000000',
    //         thickness: 10,
    //         borderRadius: 10,
    //       },
    //       section: {
    //         yOffset: 50,
    //         height: 500,
    //         backgroundColor: '63CFF1',
    //       },
    //     },
    //   },
    //   {
    //     type: 'image',
    //     options: {
    //       // imagePath: './assets/calendar.png',
    //       file: backImage3.buffer,
    //       fileName: backImage3.originalname,
    //       // heightScale: .9,
    //       widthScale: .9,
    //       fit: fitOptions.fillAndCrop,
    //       side: 'left',
    //       border: {
    //         color: '000000',
    //         thickness: 10,
    //         borderRadius: 10,
    //       },
    //       section: {
    //         yOffset: 50,
    //         height: 500,
    //         backgroundColor: '63CFF1',
    //       },
    //     },
    //   },
    // ];

    try {
        let prevLeftSection;
        let prevRightSection;
        for (let i = 0; i < sections.length; i++) {
            const { type, options, options: { section: { height, yOffset } } } = sections[i];

            // set section y
            if (sections[i].options.side === 'left') {
                options.section.y = prevLeftSection
                ? prevLeftSection.options.section.y - height
                : config.pageHeight - height;
                options.section.y = options.section.y - (yOffset || 0);
                prevLeftSection = sections[i];
            } else {
                options.section.y = prevRightSection
                ? prevRightSection.options.section.y - height
                : config.pageHeight - height;
                options.section.y = options.section.y - (yOffset || 0);
                prevRightSection = sections[i];
            }

            if (type === 'text') {
                await pdfService.drawText(options);
            } else if (type === 'image') {
                // options.file = req.files[options.fileIndex].buffer;
                // options.fileName = req.files[options.fileIndex].originalname;
                await pdfService.drawImage(options);
            }
        }
    } catch (e) {
        throw e;
    }


    // RIGHT HALF
    // TODO: remove
    // pageService.page.drawRectangle(config.logoSection);
    // pageService.page.drawRectangle(config.dateSection);
    // pageService.page.drawRectangle(config.frontPageImageSection);
    // pageService.page.drawRectangle(config.frontPageTextSection);

    // logo
    // const logo = await pdfDoc.embedPng(fs.readFileSync(config.logo.imagePath));
    // const logoScale = config.scale(
    //   logo.width,
    //   logo.height,
    //   config.logoSection.width,
    //   config.logoSection.height,
    // );
    // const logoDims = logo.scale(logoScale);
    // config.setLogoDimensions(logoDims.width, logoDims.height);


    // page.drawImage(logo, config.logo.options);


    // dateRectangle
    // TODO: uncomment
    // page.drawRectangle(config.dateRectangle);

    // frontPageImage
    // TODO: get image from request body
    // const frontPageImage = await pdfDoc.embedJpg(fs.readFileSync('./assets/test.jpg'));
    // const frontPageImageScale = config.scale(
    //   frontPageImage.width,
    //   frontPageImage.height,
    //   config.frontPageImageMaxWidth,
    //   config.frontPageImageMaxHeight,
    // );
    // const frontPageImageDims = frontPageImage.scale(frontPageImageScale);
    // config.setFrontPageImageDimensions(frontPageImageDims.width, frontPageImageDims.height);
    // page.drawImage(frontPageImage, config.frontPageImage.options);

    // // frontPageText
    // const frontCoverTextOptions = config.getFrontPageTextOptions(frontCoverText);
    // console.log(frontCoverTextOptions[0].options);
    // frontCoverTextOptions.forEach(option => page.drawText(option.text, option.options));
    // const frontCoverLines = frontCoverText.split('\n');
    // let prevConfig;
    // for (const line of frontCoverLines) {
    //   prevConfig = {
    //     x: ((config.pageWidth / 4) * 3) - (customFont.widthOfTextAtSize(line, config.textSize) / 2),
    //     y: prevConfig
    //       ? (prevConfig.y - customFont.heightAtSize(config.textSize))
    //       : (config.frontPageImage.options.y - 400),
    //     font: customFont,
    //     size: config.textSize,
    //     color: config.hexToRgb('32a852'),
    //   }
    //   page.drawText(line, prevConfig);
    // }

    // page.drawText('Phương Tiện Thông Tin Liên Lạc Của\nCộng Đoàn Công Giáo Việt Nam Tại Vermont', {
    //   x: (width / 2) - (customFont.widthOfTextAtSize(frontCoverLines[0], config.textSize) / 2),
    //   y: 100,
    //   font: customFont,
    //   size: config.textSize,
    // });
    
    const pdfBytes = await pdfService.pdfDoc.save()
    console.log(pdfBytes);
    return pdfBytes;
    // fs.writeFileSync(path.join(__static, `/${new Date().toISOString()}.pdf`), pdfBytes);
}

module.exports = {
    generatePdf,
};
