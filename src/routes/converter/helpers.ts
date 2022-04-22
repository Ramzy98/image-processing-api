import sharp from 'sharp';

export async function resizeImage(
  filename: string,
  width: number,
  height: number
): Promise<string | null> {
  if (!filename) {
    return null;
  }
  if (width < 0 || height < 0) {
    return null;
  }
  const inputImage = `./images/full/${filename}.jpg`;
  const outputImagePath = `./images/thumb/${filename}_${width}_${height}.jpg`;
  const outputImage = sharp(inputImage).resize(width, height);
  await outputImage.toFile(outputImagePath);
  return outputImagePath;
}
