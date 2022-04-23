import { resizeImage } from '../routes/converter/helpers';
import request from 'supertest';
import express from 'express';
const app = express();

describe('resizeImage', () => {
  it('should return null if filename is empty', async () => {
    const filename = '';
    const width = 100;
    const height = 100;
    const resultedImage = await resizeImage(filename, width, height);
    expect(resultedImage).toBeNull();
  });
  it('should return null if width is negative', async () => {
    const filename = 'test';
    const width = -100;
    const height = 100;
    const resultedImage = await resizeImage(filename, width, height);
    expect(resultedImage).toBeNull();
  });
  it('should return null if height is negative', async () => {
    const filename = 'test';
    const width = 100;
    const height = -100;
    const resultedImage = await resizeImage(filename, width, height);
    expect(resultedImage).toBeNull();
  });
});

describe('endpoint functionality', () => {
  it('should return the correct image', async () => {
    const filename = 'fjord';
    const width = 100;
    const height = 100;
    request(app)
      .get(`/converter/?filename=${filename}&width=${width}&height=${height}`)
      .expect(200)
      .expect('Content-Type', /image/);
  });
});
