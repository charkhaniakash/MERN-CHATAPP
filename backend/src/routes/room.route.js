import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addParticipant, createRoom, getRooms } from "../controllers/room.controllers.js";

const router = express.Router();

router.post("/create", protectRoute, createRoom);
router.get("/", protectRoute, getRooms);
router.post("/add-participant", protectRoute, addParticipant);

export default router;