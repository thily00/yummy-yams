import express from 'express';
const router = express.Router();
import { curentSession, createNewSession } from '../controllers/game.controller';

router.post('/gamesession', createNewSession);
router.get('/gamesession', curentSession);

export default router;