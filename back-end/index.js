const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
const cors = require('cors');
const fontkit = require('@pdf-lib/fontkit');

const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/generate', async (req, res) => {
  const {
    frontCoverText,
    frontCoverBottomText,
    primaryColor,
  } = req.body;

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit)
  const customFont = await pdfDoc.embedFont(fs.readFileSync('./assets/Roboto-Regular.ttf'));
  const page = pdfDoc.addPage([3300, 2550])

  const { width, height } = page.getSize();
  const textSize = 100;

  // TODO: remove center line
  page.moveTo(width / 2, 2500);
  page.drawSvgPath('M 0,0 l 0,2450');

  const logo = await pdfDoc.embedPng(fs.readFileSync('./assets/logo-red.png'));
  const logoDims = logo.scale(.92);
  page.drawImage(logo, {
    x: ((width / 4) * 3) - (logoDims.width / 2),
    y: height - logoDims.height + 45,
    width: logoDims.width,
    height: logoDims.height,
  });

  page.drawRectangle({
    x: width / 2,
    y: height - 108 - 426,
    width: width / 2,
    height: 108,
    color: rgb(0.75, 0.2, 0.2),
  });

  const frontPageImage = await pdfDoc.embedPng(fs.readFileSync('./assets/calendar.png'));
  const frontPageImageDims = frontPageImage.scale(1.85);
  page.drawImage(frontPageImage, {
    x: ((width / 4) * 3) - (frontPageImageDims.width / 2),
    y: height - frontPageImageDims.height + 500,
    width: frontPageImageDims.width,
    height: frontPageImageDims.height,
  });

  const frontCoverLines = req.body.frontCoverText.split('\n');
  page.drawText(frontCoverLines[0], {
    x: (width / 2) - (customFont.widthOfTextAtSize(frontCoverLines[0], textSize) / 2),
    y: 200,
    font: customFont,
    size: textSize,
  });

  page.drawText('Phương Tiện Thông Tin Liên Lạc Của\nCộng Đoàn Công Giáo Việt Nam Tại Vermont', {
    x: (width / 2) - (customFont.widthOfTextAtSize(frontCoverLines[0], textSize) / 2),
    y: 100,
    font: customFont,
    size: textSize,
  });
  
  const pdfBytes = await pdfDoc.save()
  fs.writeFileSync(`output/${new Date().toISOString()}.pdf`, pdfBytes);
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
