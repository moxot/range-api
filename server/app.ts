import * as express from 'express';
import helmet from 'helmet';
import * as cors from 'cors';
import { createServer } from 'http';
import { config } from 'dotenv';
config();

import router from './api';
import logger from './logger';

const port = process.env.PORT || 8000;
const server = express();

server.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
server.use(express.json());
server.use(cors());

router(server);

createServer(server).listen(port, () => {
    logger.log(`server is running at port ${port}`);
});
