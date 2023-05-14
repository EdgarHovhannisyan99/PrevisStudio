import express from "express";
import {TemplatesController} from "../controllers/TemplatesController";

const router = express.Router();

router.get("/all", TemplatesController.getAllTemplate);

export default router;
