import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import DevController from './app/controllers/DevController';
import SearchController from './app/controllers/SearchController';
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);
routes.delete('/devs/:id', DevController.destroy);
routes.put('/devs/:id', upload.single('file'), DevController.update);

routes.get('/search', SearchController.index);

routes.get('/files/:file', FileController.show);

export default routes;
