import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';

import VademecumController from '../controllers/VademecumController';

const router = Router();

//Buscar
router.get('/:search', [checkJwt], VademecumController.getValuesSearched);
router.get('/', [checkJwt], VademecumController.getAll);
router.get('/doctor/:id([0-9]+)', [checkJwt], VademecumController.getVadecumByDoctor);

//Agregar o editar
router.put('/:id([0-9]+)?', [checkJwt], VademecumController.setMedicinaById);

export default router;
