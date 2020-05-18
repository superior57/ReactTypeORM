/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:25:40
 * @modify date 2020-05-17 18:25:40
 * @desc [description]
 */

import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import DoctorController from '../controllers/DoctorController';

const router = Router();
//Login route
router.get('/:id([0-9]+)', [checkJwt], DoctorController.getOneById);
router.patch('/:id([0-9]+)', [checkJwt], DoctorController.editMedico);

export default router;
