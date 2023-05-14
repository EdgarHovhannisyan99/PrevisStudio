import express from 'express'
import users from "./users";
import templates from "./templates";
const router = express.Router();

/* GET home page. */
router.use("/users", users);
router.use("/templates", templates);


export default router
