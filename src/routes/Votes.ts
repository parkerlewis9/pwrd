import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
// import { UserDao } from '@daos';
import { paramMissingError, logger, adminMW } from '@shared';
// import { UserRoles } from '@entities';

// Init shared
const router = Router();
// const userDao = new UserDao();


/******************************************************************************
 *                      Get All Votes - "GET /api/votes/all"
 ******************************************************************************/

let tempDB = {
    "good": 0,
    "indifferent": 0,
    "bad": 0
}

router.get('/all', adminMW, async (req: Request, res: Response) => {
    try {
        // const users = await userDao.getAll();
        return res.status(OK).json(tempDB);
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                       Add One - "POST /api/votes/vote"
 ******************************************************************************/

router.post('/', adminMW, async (req: Request, res: Response) => {
    try {
        // Check parameters
        const { vote } = req.body;

        if (!vote) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }

        if (vote === 'good') {
            tempDB.good++
        } else if (vote === 'indifferent') {
            tempDB.indifferent++
        } else if (vote === 'bad') {
            tempDB.bad++
        } else {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }

        return res.status(CREATED).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
