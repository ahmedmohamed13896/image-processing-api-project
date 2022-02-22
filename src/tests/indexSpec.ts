import supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';
import path from 'path';
import File from './../file';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from endpoints', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /api/images', (): void => {
    it('gets /api/images?filename=encenadaport (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=encenadaport'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/images?filename=encenadaport&width=300&height=300 (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=encenadaport&width=300&height=300'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/images?filename=encenadaport&width=-100&height=100 (invalid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=encenadaport&width=-100&height=100'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/images (no arguments)', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/images');
      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /foo', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/foo');

      expect(response.status).toBe(404);
    });
  });
});

// Erase test file. Test should not run on productive system to avoid cache loss
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    File.imagesThumbPath,
    'encenadaport-300x300.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    // intentionally left blank
  }
});
