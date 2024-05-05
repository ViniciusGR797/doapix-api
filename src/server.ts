import 'reflect-metadata';
import { server } from './app';
import config from './config';

const port = config.port;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
