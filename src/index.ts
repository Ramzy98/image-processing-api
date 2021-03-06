import express from 'express';
import routes from './routes';

const PORT = process.env.PORT || 3003;
const app = express();

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
