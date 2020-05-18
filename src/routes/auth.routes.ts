/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:25:03
 * @modify date 2020-05-17 18:25:03
 * @desc [description]
 */
import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//Login route
router.post("/medicos/login", AuthController.login);
router.post("/medicos/registrar", AuthController.newUser);

//Change my password
router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;