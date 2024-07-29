import express from 'express'
import { createRoom,updateRoom,deleteRoom,getRoom,getRooms ,updateRoomAvailability} from '../Controller/room.js';
import { verifyAdmin } from '../until/verifyToken.js';
const router = express.Router();
router.put('/availability/:id',updateRoomAvailability)

router.post('/:hotelid',verifyAdmin,createRoom)

router.put('/:id/:hotelid',verifyAdmin,updateRoom)
router.delete('/:id',verifyAdmin,deleteRoom)
router.get('/:id',getRoom)
router.get('/',getRooms)
export default router