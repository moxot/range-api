import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import logger from '../../logger';
import { RangesDTO } from './ranges.dto';
import { getBeforeEvent, getEventRanges } from './repo';
import calculateRanges from './helpers/calculateRanges';

const router = Router();

router.post('/', validateRequest(RangesDTO), async (req, res) => {
    try {
        const beforeEvent = await getBeforeEvent(req.body.vehicleId, req.body.startDate);
        const events = await getEventRanges(
            req.body.vehicleId,
            req.body.startDate,
            req.body.endDate,
        );
        const ranges = calculateRanges(beforeEvent, events, req.body.startDate, req.body.endDate);

        res.send(ranges);
    } catch (err) {
        logger.error(err.stack || err);
        res.sendStatus(500);
    }
});

export default router;
