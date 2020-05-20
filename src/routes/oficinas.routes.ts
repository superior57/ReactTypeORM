import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import OficinaController from '../controllers/OficinaController';

const router = Router();
//Routas para oficinas
router.get('/:id([0-9]+)', [checkJwt], OficinaController.getOficinasByDoctor);
router.put('/:id([0-9]+)', [checkJwt], OficinaController.setOficinasByDoctor);

//Rutas para oficina-horarios
router.get('/horario-reserva/:id([0-9]+)', [checkJwt], OficinaController.getOficinasHorariosByDoctor);

//Routas para horarios
router.get('/horarios/:id([0-9]+)', [checkJwt], OficinaController.getHorariosByDoctor);
router.put('/horarios/:id([0-9]+)', [checkJwt], OficinaController.setHorariosByDoctor);

export default router;
