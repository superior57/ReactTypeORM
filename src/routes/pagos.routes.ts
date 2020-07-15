/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:25:40
 * @modify date 2020-05-17 18:25:40
 * @desc [description]
 */

import { Router } from 'express';
// import { checkJwt } from '../middlewares/checkJwt';
import PagosController from '../controllers/PagosController';

const router = Router();

//Obtiene las recetas por cliente y doctor
router.get('/create',PagosController.GuardarTarjeta );

export default router;