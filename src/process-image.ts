import sharp from 'sharp';

// query segments
interface IResizedImageParams {
  src: string;
  output: string;
  width: number;
  height: number;
}

const createImage = async (resizedImageparams: IResizedImageParams): Promise<null | string> => {
  try {
    await sharp(resizedImageparams.src)
      .resize(resizedImageparams.width, resizedImageparams.height)
      .toFormat('jpeg')
      .toFile(resizedImageparams.output);

    return null;
  } catch {
    return "There is a problem make image can't be processed.";
  }
};

export default createImage;
