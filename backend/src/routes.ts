import {Router} from 'express'
import UserController from './controllers/userController'
import ClassesControler from './controllers/ConnectionsController';

const router = Router();

const User = new UserController
const Connection = new ClassesControler

router.post("/profy", User.createUser)
router.get("/profy", User.FindProfy)
router.get("/profy/:id", User.FindProfyUnique)

router.get('/connection', Connection.index)
router.post('/connection', Connection.create)

export default router;
