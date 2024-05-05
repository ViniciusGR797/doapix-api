import Pusher from 'pusher';
import config from '../config';

const pusher = new Pusher({
  appId: config.pusher.appId,
  key: config.pusher.key,
  secret: config.pusher.secret,
  cluster: config.pusher.cluster,
  useTLS: config.pusher.useTLS
});

export default pusher;