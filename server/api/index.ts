import { Express } from 'express';
import ranges from './ranges';

export default function (server: Express) {
    server.use('/api/ranges', ranges);
}
