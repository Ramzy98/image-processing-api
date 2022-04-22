import { resizeImage } from '../routes/converter/helpers';

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
