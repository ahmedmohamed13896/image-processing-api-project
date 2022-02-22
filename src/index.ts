import express, { Application } from 'express';
import File from './file';
import routes from './routes/route';

const app: Application = express();
const port: number = 3000;

app.use(routes);

app.listen(port, async (): Promise<void> => {
    await File.createImagePath();
    console.log(`Server is running on Port ${port} .`);
});

export default app;
