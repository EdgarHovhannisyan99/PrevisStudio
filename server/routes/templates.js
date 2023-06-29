import express from "express";
import {TemplatesController} from "../controllers/TemplatesController";

const router = express.Router();

router.get("/all", TemplatesController.getAllTemplate);
router.get("/single/:id", TemplatesController.getSingleTemplate);
router.post("/render", TemplatesController.videoRender);
router.post("/shot", TemplatesController.videoShot);


export default router;
