const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
const { PdfService } = require('./pdfService');
const { constants } = require('./config');
const path = require('path');

async function generatePdf(outerSections, innerSections) {
    const pdfService = new PdfService();
    await pdfService.setUpPdf();

    const pages = [
        outerSections,
        innerSections,
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
                    : constants.pageHeight - height;
                    options.section.y = options.section.y - (yOffset || 0);
                    prevLeftSection = page[i];
                } else {
                    options.section.y = prevRightSection
                    ? prevRightSection.options.section.y - height
                    : constants.pageHeight - height;
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
