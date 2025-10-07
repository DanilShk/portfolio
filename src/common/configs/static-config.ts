import { join } from 'path';

export const staticConfig = {
  rootPath: join(process.cwd(), 'uploads'),
  serveRoot: '/uploads',
};
