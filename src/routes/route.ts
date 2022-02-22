import { Router, Response, Request } from 'express';
import images from './images';

const routes: Router = Router();

routes.use('/api/images', images);

routes.get(
    '/',
    (request: Request, response: Response): void => {
        response.send(
            `
            <h1> Server is running </h1>
            <p>
            Please visit <a href="/api/images?filename=encenadaport">/api/images?filename=encenadaport</a> to see full image
            </p>
            <p>
            And visit <a href="/api/images?filename=encenadaport&width=100&height=100">/api/images?filename=encenadaport&width=100&height=100</a> to get Thumbnail
            </p>
            `
        );
    }
);

export default routes;