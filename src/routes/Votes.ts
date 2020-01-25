import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { paramMissingError, logger, adminMW, dbConnection } from '@shared';
import { Vote } from '@entity';

// Init shared
const router = Router();
// const userDao = new UserDao();


/******************************************************************************
 *                      Get All Votes - "GET /api/votes/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    dbConnection.then(async connection => {
        let voteRepository = connection.getRepository(Vote)
        let savedVotes = await voteRepository.find()
        
        let tempDB = {
            "good": 0,
            "indifferent": 0,
            "bad": 0
        }
        savedVotes.forEach(vote => {
            if (vote.value == 'good') {
                tempDB['good']++
            } else if (vote.value == 'indifferent') {
                tempDB['indifferent']++
            } else if (vote.value == 'bad') {
                tempDB['bad']++
            }
        })

        try {
            return res.status(OK).json(tempDB);
        } catch (err) {
            logger.error(err.message, err);
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });
        }
    }).catch(e =>{
            console.log("Error while getting all", e.toString())
    })
});

/******************************************************************************
 *                       Add One - "POST /api/votes/vote"
 ******************************************************************************/

router.post('/', async (req: Request, res: Response) => {
    dbConnection.then(async connection => {
        try {
            // Check parameters
            const { vote } = req.body;

            if (!vote) {
                return res.status(BAD_REQUEST).json({
                    error: paramMissingError,
                });
            }

            let newVote = new Vote()

            if (vote === 'good') {
                newVote.value = vote
            } else if (vote === 'indifferent') {
                newVote.value = vote
            } else if (vote === 'bad') {
                newVote.value = vote
            } else {
                return res.status(BAD_REQUEST).json({
                    error: paramMissingError,
                });
            }

            let voteRepository = connection.getRepository(Vote)
            await voteRepository.save(newVote)

            return res.status(CREATED).end();
        } catch (err) {
            logger.error(err.message, err);
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });
        }
    }).catch(e => {
        console.log("Error during saving", e.toString())
    })

});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
