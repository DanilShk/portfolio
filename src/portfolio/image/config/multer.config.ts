import { diskStorage } from 'multer';
import { randomUUID } from 'node:crypto';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename = `${randomUUID()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file: Express.Multer.File, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
};
