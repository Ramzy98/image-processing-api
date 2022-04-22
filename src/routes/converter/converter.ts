import express from 'express';
import fs from 'fs';
import { resizeImage } from './helpers';
const converter = express.Router();

converter.get('/', async (req, res) => {
  const { filename, width, height }: any = req.query;
  if (!filename || !width || !height) {
    res.status(400).send('Bad Request');
    return;
  }
  let resultedImage: string | null;
  try {
    var thumbFiles = fs.readdirSync('./images/thumb');
    var fullFiles = fs.readdirSync('./images/full');
    if (fullFiles.includes(filename + '.jpg')) {
      if (thumbFiles.includes(`${filename}_${width}_${height}.jpg`)) {
        resultedImage = `./images/thumb/${filename}_${width}_${height}.jpg`;
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
export { resizeImage };
