import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import Cliente  from '../controllers/ClienteController'

const router = Router();
//Login route
router.get("/:id([0-9]+)", [checkJwt], Cliente.getOneById);
// router.patch("/:id([0-9]+)", [checkJwt], DoctorController.editMedico);

export default router;