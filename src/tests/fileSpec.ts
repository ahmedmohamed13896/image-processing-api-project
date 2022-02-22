import { promises as fs } from 'fs';
import path from 'path';
import File from './../file';

describe('Test image processing via sharp', (): void => {
  it('raises an error (invalid width value)', async (): Promise<void> => {
    const error: null | string = await File.createThumbnail({
      filename: 'foo',
      width: '100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

  it('raises an error (filename does not exist)', async (): Promise<void> => {
    const error: null | string = await File.createThumbnail({
      filename: 'foo',
      width: '300',
      height: '400'
    });
    expect(error).not.toBeNull();
  });


  it('succeeds to write resized thumb file (existing file, valid size values)', async (): Promise<void> => {
    await File.createThumbnail({ filename: 'encenadaport', width: '299', height: '299' });

    const resizedImagePath: string = path.resolve(
      File.imagesThumbPath,
      `encenadaport-299x299.jpg`
    );
    let errorFile: null | string = '';

    try {
      await fs.access(resizedImagePath);
      errorFile = null;
    } catch {
      errorFile = 'File was not created';
    }

    expect(errorFile).toBeNull();
  });
});

// Erase test file. Test should not run on productive system to avoid cache loss
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    File.imagesThumbPath,
    'encenadaport-99x99.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    // intentionally left blank
  }
});
