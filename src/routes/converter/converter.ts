import express from 'express';
import fs from 'fs';
import { resizeImage } from './helpers';
const converter = express.Router();

interface ImageParams {
  filename: string;
  width: number;
  height: number;
}

converter.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const filename = req.query.filename as string;
    const width = req.query.width as string;
    const height = req.query.height as string;
    if (!filename || !width || !height) {
      res.status(400).send('<h1>Bad Request</h1>');
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
          res
            .status(400)
            .send(
              'Bad Request, please make sure filename is correct and width and height are positive'
            );
        }
      } else {
        res.status(404).send('Image Not Found');
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }
);

export default converter;
export { resizeImage };
