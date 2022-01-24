async function generatePdf(frontText, dateText, images) {
  const formData = new FormData();
  const imageKeys = Object.keys(images);
  for (let i = 0; i < imageKeys.length; i++) {
    formData.append('files', Object.values(images)[i]);
  }

  const sections = [
    {
      type: 'image',
      options: {
        fileIndex: imageKeys.indexOf('logo'),
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
        fileIndex: imageKeys.indexOf('frontImage'),
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
        fileIndex: imageKeys.indexOf('backImage1'),
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
        fileIndex: imageKeys.indexOf('backImage2'),
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
        fileIndex: imageKeys.indexOf('backImage3'),
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

  const postBody = {
    sections,
  };

  formData.append('data', JSON.stringify(postBody));

  const res = await fetch('http://localhost:3001/generate', {
    method: 'POST',
    body: formData,
  });
  // const data = await res.json();
}

module.exports = {
    generatePdf,
};
