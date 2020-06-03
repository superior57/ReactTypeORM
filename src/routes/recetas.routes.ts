/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:25:40
 * @modify date 2020-05-17 18:25:40
 * @desc [description]
 */

import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import RecetaController from '../controllers/RecetaController';

const router = Router();

//Obtiene las recetas por cliente y doctor
router.get('/:cliente([0-9]+)/:doctor([0-9]+)', [checkJwt], RecetaController.getRecetaClienteDoctor);

//Agrega una receta al cliente y doctor
router.put('/:cliente([0-9]+)/:doctor([0-9]+)', [checkJwt], RecetaController.setRecetaClienteDoctor);

export default router;
