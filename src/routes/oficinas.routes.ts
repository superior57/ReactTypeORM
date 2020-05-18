import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import OficinaController from '../controllers/OficinaController';

const router = Router();

router.get('/:id([0-9]+)', [checkJwt], OficinaController.getOficinasByDoctor);
router.get('/horarios/:id([0-9]+)', [checkJwt], OficinaController.getHorariosByDoctor);

export default router;
