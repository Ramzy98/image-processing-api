import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
const converter = express.Router();

async function resizeImage(filename: string, width: number, height: number) {
  if (!filename) {
    return null;
  }
  if (!width || !height || width < 0 || height < 0) {
    return null;
  }
  const inputImage = `./images/full/${filename}.jpg`;
  const outputImagePath = `./images/thumb/${filename}-thumb.jpg`;
  const outputImage = sharp(inputImage).resize(width, height);
  await outputImage.toFile(outputImagePath);
  return outputImagePath;
}

converter.get('/', async (req, res) => {
  const { filename, width, height }: any = req.query;
  let resultedImage: string | null;
  try {
    var thumbFiles = fs.readdirSync('./images/thumb');
    var fullFiles = fs.readdirSync('./images/full');
    if (fullFiles.includes(filename + '.jpg')) {
      if (thumbFiles.includes(`${filename}-thumb.jpg`)) {
        resultedImage = `./images/thumb/${filename}-thumb.jpg`;
      } else {
        resultedImage = await resizeImage(
          filename,
          parseInt(width),
          parseInt(height)
        );
      }
      if (resultedImage !== null) {
        res.sendFile(resultedImage, {
          root: '.',
        });
      } else {
        res.status(400).send('Bad Request');
      }
    } else {
      res.status(404).send('Image Not Found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

export default converter;
