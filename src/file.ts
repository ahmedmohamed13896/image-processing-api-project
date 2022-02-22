import { promises as fs } from 'fs';
import path from 'path';
import createImage from './process-image';

// IImage
interface IImage {
  width?: string;
  height?: string;
  filename?: string;
}

export default class File {
  // Images paths
  static imagesFullPath = path.resolve(__dirname, '../images/full');
  static imagesThumbPath = path.resolve(__dirname, '../images/thumb');


  // Get Image Path
  static async getImagePath(ImageParams: IImage): Promise<null | string> {
    if (!ImageParams.filename) {
      return null;
    }

    // Build appropriate path
    const filePath: string =
      ImageParams.width && ImageParams.height
        ? path.resolve(
          File.imagesThumbPath,
          `${ImageParams.filename}-${ImageParams.width}x${ImageParams.height}.jpg`
        ) : path.resolve(File.imagesFullPath, `${ImageParams.filename}.jpg`);

    // Check if file is existing
    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      return null;
    }
  }



  static async isImageAvailable(filename: string = ''): Promise<boolean> {
    if (!filename) {
      return false; // Fail early
    }

    return (await File.getAvailableImageNames()).includes(filename);
  }


  static async getAvailableImageNames(): Promise<string[]> {
    try {
      return (await fs.readdir(File.imagesFullPath)).map(
        (filename: string): string => filename.split('.')[0]
      ); // Cut extension
    } catch {
      return [];
    }
  }


  static async isThumbnailExisting(params: IImage): Promise<boolean> {
    if (!params.filename || !params.width || !params.height) {
      return false; // Fail early
    }

    // Set appropriate path
    const filePath: string = path.resolve(
      File.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  // Create thumbnail path.
  static async createImagePath(): Promise<void> {
    try {
      await fs.access(File.imagesThumbPath);
    } catch {
      fs.mkdir(File.imagesThumbPath);
    }
  }



  static async createThumbnail(params: IImage): Promise<null | string> {
    if (!params.filename || !params.width || !params.height) {
      return null;
    }

    const filePathFull: string = path.resolve(
      File.imagesFullPath,
      `${params.filename}.jpg`
    );

    const filePathThumb: string = path.resolve(
      File.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );


    // Resize image and store as thumbnail
    return await createImage({
      src: filePathFull,
      output: filePathThumb,
      width: parseInt(params.width),
      height: parseInt(params.height)
    });
  }
}
