import { fitOptions } from './enums';

export const constants = {
    pageWidth: 3300,
    pageHeight: 2550,
    textSize: 75,
    // Note: there is a small amount of top margin with text so we need to offset it
    textOffset: 22,
};

export const layouts = {
    captionWithThreeImages: {
        width: .9,
        topMargin: 100,
        bottomMargin: 100,
        spaceBetween: 50,
        textHeight: 300,
        get imageHeight() {
            return (constants.pageHeight - this.topMargin - this.bottomMargin - (this.spaceBetween * 3) - this.textHeight) / 3;
        },
        fit: fitOptions.fillAndCrop,
        border: true,
        firstElement: 'text',
    },
    captionWithFourImages: {
        width: .9,
        topMargin: 100,
        bottomMargin: 100,
        spaceBetween: 50,
        textHeight: 300,
        get imageHeight() {
            return (constants.pageHeight - this.topMargin - this.bottomMargin - (this.spaceBetween * 3) - this.textHeight) / 3;
        },
        fit: fitOptions.fillAndCrop,
        border: true,
        firstElement: 'text'
    },
    fullPageImage: {
        width: .9,
        topMargin: 100,
        bottomMargin: 100,
        get imageHeight() {
            return constants.pageHeight - this.topMargin;
        },
        fit: fitOptions.fill,
        border: false,
        firstElement: 'image',
    },
}