const { constants } = require('./config');

export function validateAndCalculateSectionDims(section) {
    let sectionWidth = constants.pageWidth / 2;
    let sectionHeight = constants.pageHeight;

    if (section.widthScale && section.width) throw new Error('Cannot provide both section.width and section.widthScale.');

    if (section.widthScale) {
        if (section.widthScale > 1 || section.widthScale < 0) throw new Error('section.widthScale must be between 0 and 1.');
        sectionWidth = section.widthScale * (constants.pageWidth / 2);
    } else if (section.width) {
        if (section.width > constants.pageWidth) throw new Error(`section.width cannot be larger than ${sectionWidth}.`);
        if (section.width < 0) throw new Error('section.width must be greater than or equal to 0.');
        sectionWidth = section.width;
    }

    if (section.heightScale) {
        // TODO: maybe support this?
        throw new Error('section.heightScale is not supported at this time. Please use section.height instead.');
    } else if (section.height) {
        if (section.height > constants.pageHeight) throw new Error(`section.height cannot be larger than ${sectionHeight}.`);
        if (section.height < 0) throw new Error('section.height must be greater than or equal to 0.');
        sectionHeight = section.height;
    }

    return { width: sectionWidth, height: sectionHeight };
}
