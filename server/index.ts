import express from 'express';
import replicas from './routes/replicas';
import chat from './routes/chat';
import speech from './routes/speech';

const app = express();
app.use(express.json());
app.use('/api/replicas', replicas);
app.use('/api/chat', chat);
app.use('/api/speech', speech);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('API listening on 3000');
});
