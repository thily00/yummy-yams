import express from 'express';
const router = express.Router();
import { isAuthenticated, roleAuthorization } from '../middlewares/routeGuard';
import { me } from '../controllers/user.controller';

router.get('/user/me', isAuthenticated, roleAuthorization(['player','admin']), me);
export default router;