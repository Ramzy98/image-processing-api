import express from 'express';
import converter from './converter/converter';

const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Routes Working');
});

routes.use('/converter', converter);

export default routes;
