import Router from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    // this is a middleware upload just injected before our method register user
    upload.fields([{name:"avatar",
        maxCount:1
    },{
        name:"coverImage",
        maxCount:1
    }]),
    registerUser
);

export default router;
