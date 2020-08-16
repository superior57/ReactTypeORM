import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import Cliente from '../controllers/ClienteController';

const router = Router();

router.get('/:id([0-9]+)/doctor/:doctor([0-9]+)', [checkJwt], Cliente.getOneById);

// app
router.put('/', Cliente.editCliente);
// router.patch("/:id([0-9]+)", [checkJwt], DoctorController.editMedico);

export default router;
