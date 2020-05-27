import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import OficinaController from '../controllers/OficinaController';

const router = Router();
//Routas para oficinas id=doctor
router.get('/:id([0-9]+)', [checkJwt], OficinaController.getOficinasByDoctor);
router.put('/:id([0-9]+)', [checkJwt], OficinaController.setOficinasByDoctor);
// id = oficinaid
router.delete('/:id([0-9]+)', [checkJwt], OficinaController.deleteOficinasByDoctor);

//Rutas para oficina-horarios
router.get(
  '/horario-reserva/:id([0-9]+)',
  [checkJwt],
  OficinaController.getOficinasHorariosByDoctor
);

//Routas para horarios
router.get('/horarios/:id([0-9]+)', [checkJwt], OficinaController.getHorariosByDoctor);

//Crear --- id=oficina ,const { data = [], doctor_id = '' } = req.body
router.post('/horarios/:id([0-9]+)', [checkJwt], OficinaController.setHorariosByOficina);

router.patch('/horario/:id([0-9]+)', [checkJwt], OficinaController.updateHorario);
router.delete('/horario/:id([0-9]+)', [checkJwt], OficinaController.deleteHorario);

export default router;
