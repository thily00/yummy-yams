import express from 'express';
const router = express.Router();
import { isAuthenticated, roleAuthorization } from '../middlewares/routeGuard';
import { createNewSession, getAllSessions, getActiveSession, updateSession, playGame, getSessionResult } from '../controllers/game.controller';

router.post('/game',           isAuthenticated, roleAuthorization(['admin']),          createNewSession);
router.patch('/game/:id',      isAuthenticated, roleAuthorization(['admin']),          updateSession);
router.post('/game/play',      isAuthenticated, roleAuthorization(['player','admin']), playGame);
router.get('/game/result/:id', isAuthenticated, roleAuthorization(['admin']),          getSessionResult);
router.get('/game',            isAuthenticated, roleAuthorization(['player','admin']), getAllSessions);
router.get('/game/active',     isAuthenticated, roleAuthorization(['player','admin']), getActiveSession);

export default router;