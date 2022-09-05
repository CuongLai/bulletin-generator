import { fitOptions } from './enums';

export const constants = {
    pageWidth: 3300,
    pageHeight: 2550,
    textSize: 75,
    // Note: there is a small amount of top margin with text so we need to offset it
    textOffset: 22,
};

export const layouts = [
    {
        name: 'frontPage',
        description: 'Front page',
        elements: [
            'image',
            'text',
            'image',
            'text',
        ],
    },
    {
        name: 'oneCaptionThreeImages',
        description: 'Three images with one caption',
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
        elements: [
            'text',
            'image',
            'image',
            'image'
        ],
    },
    {
        name: 'oneCaptionFourImages',
        description: 'Four images with one caption',
        width: .9,
        topMargin: 100,
        bottomMargin: 100,
        spaceBetween: 50,
        textHeight: 300,
        get imageHeight() {
            return (constants.pageHeight - this.topMargin - this.bottomMargin - (this.spaceBetween * 4) - this.textHeight) / 4;
        },
        fit: fitOptions.fillAndCrop,
        border: true,
        elements: [
            'text',
            'image',
            'image',
            'image',
            'image',
        ],
    },
    {
        name: 'fullPageImage',
        description: 'Full page image',
        width: .9,
        topMargin: 100,
        bottomMargin: 100,
        get imageHeight() {
            return constants.pageHeight - this.topMargin - this.bottomMargin;
        },
        fit: fitOptions.fill,
        border: false,
        elements: [
            'image',
        ],
    },
]