import { Router, Request, Response } from 'express';
import File from '../file';

// image
interface IImage {
    filename?: string;
    width?: string;
    height?: string;
}

const validate = async (image: IImage): Promise<null | string> => {

    // Check if requested file is available
    if (!(await File.isImageAvailable(image.filename))) {
        const availableImageNames: string = (
            await File.getAvailableImageNames()
        ).join(', ');
        return `Please add a valid filename as a params.Current available filenames are: ${availableImageNames}.`;
    }

    if (!image.width && !image.height) {
        return null;
    }

    // Check for valid width value
    const width: number = parseInt(image.width || '');
    if (Number.isNaN(width) || width < 1) {
        return "Please add a positive value for the width.";
    }

    // Check for valid height value
    const height: number = parseInt(image.height || '');
    if (Number.isNaN(height) || height < 1) {
        return "Please add a positive value for the height.";
    }

    return null;
};

const images: Router = Router();

images.get(
    '/',
    async (
        request: Request,
        response: Response
    ): Promise<void> => {
        // Check whether request can be worked with
        const validationMessage: null | string = await validate(request.query);
        if (validationMessage) {
            response.send(validationMessage);
            return;
        }

        let error: null | string = '';

        // Create thumbnail if not existing
        if (!(await File.isThumbnailExisting(request.query))) {
            error = await File.createThumbnail(request.query);
        }

        // Handle image processing error
        if (error) {
            response.send(error);
            return;
        }

        // Get image path and show image
        const path: null | string = await File.getImagePath(request.query);
        if (path) {
            response.sendFile(path);
        } else {
            response.send('This should not have happened :-D What did you do?');
        }
    }
);

export default images;
