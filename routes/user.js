import express from "express";
import {getUser, findUser, postUser, updateUser, deleteUser} from "../controllers/UserController.js";

const router = express.Router();

router.get('/', getUser);
router.get('/:id', findUser);
router.post('/', postUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;