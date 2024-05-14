import express from 'express';
const router = express.Router();
import { createNewSession, getAllSessions, getActiveSessions, updateSession, playGame } from '../controllers/game.controller';

router.post('/game', createNewSession);
router.patch('/game/:id', updateSession);
router.post('/game/play', playGame);
router.get('/game/results', playGame);
router.get('/game', getAllSessions);
router.get('/game/active', getActiveSessions);

export default router;