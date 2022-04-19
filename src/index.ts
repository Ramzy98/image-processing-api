import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Working');
});

app.listen(3005, () => {
  console.log('Server is running on port 3000');
});
