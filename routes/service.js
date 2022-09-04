import express from "express";
import {getService, postService, getServiceById} from "../controllers/ServiceController.js";

const router = express.Router();

router.get('/', getService);
router.post('/', postService);
router.get('/:id', getServiceById);

export default router;