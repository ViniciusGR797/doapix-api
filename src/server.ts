import 'reflect-metadata';
import app from './app';
import config from './config';

const port = config.port;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
