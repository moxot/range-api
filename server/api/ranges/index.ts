import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import logger from '../../logger';
import { RangesDTO } from './ranges.dto';

const router = Router();

router.post('/', validateRequest(RangesDTO), async (req, res) => {
    try {
        res.sendStatus(200);
    } catch (err) {
        logger.error(err.stack || err);
        res.sendStatus(500);
    }
});

export default router;
