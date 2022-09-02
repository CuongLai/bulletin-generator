const { constants } = require('./config');

export class Project {
    constructor(themeColor, layout) {
        this.themeColor = themeColor;
        this.layout = layout;
    }

    buildFrontPageSections(frontText, dateText, dateTextColor, images) {
        // TODO: validation on images

        return [
            {
                type: 'image',
                options: {
                    file: images['logo'],
                    maxWidth: constants.pageWidth / 2,
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
                        backgroundColor: this.themeColor,
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
                    color: this.themeColor,
                    side: 'right',
                    textSize: constants.textSize,
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

    buildImageSection(file, side) {
        return {
            type: 'image',
            options: {
                file,
                widthScale: this.layout.width,
                fit: this.layout.fit,
                side,
                border: this.layout.border ? {
                    color: this.themeColor,
                    thickness: 10,
                    borderRadius: 10,
                } : null,
                section: {
                    yOffset: this.layout.firstElement === 'image' ? this.layout.topMargin : this.layout.spaceBetween,
                    height: this.layout.imageHeight,
                },
            },
        }
    }

    buildTextSection(text, side, textColor) {
        return {
            type: 'text',
            options: {
                text,
                color: textColor,
                side,
                textSize: 66.67,
                widthScale: this.layout.width,
                border: this.layout.border ? {
                    color: this.themeColor,
                    thickness: 10,
                    borderRadius: 10,
                } : null,
                section: {
                    yOffset: this.layout.firstElement === 'text' ? this.layout.topMargin : this.layout.spaceBetween,
                    height: this.layout.textHeight,
                },
            },
        };
    }
}