import { login, register } from '../controllers/auth.controller';

const authRoutes = (router: any) => {
    router.post('/login', login);
    router.post('/register', register);
};

export default authRoutes;