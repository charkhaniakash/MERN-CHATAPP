import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { 
  getMessages, 
  getUsersForSidebar, 
  sendMessages, 
  getRoomMessages,
  sendRoomMessage 
} from '../controllers/message.controllers.js';

const router = express.Router();

// Direct message routes
router.get('/users', protectRoute, getUsersForSidebar)
router.get('/:id', protectRoute, getMessages)
router.post('/send/:id', protectRoute, sendMessages)

// Room message routes
router.get('/room/:roomId', protectRoute, getRoomMessages)
router.post('/room', protectRoute, sendRoomMessage)

export default router;