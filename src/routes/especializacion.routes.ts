import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';

import EspecializacionController from '../controllers/EspecializacionController';

const router = Router();

//Obtener todas las especializaciones
router.get('/', [checkJwt], EspecializacionController.getAll);

export default router;
