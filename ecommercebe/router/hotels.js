import express from 'express'
import { createHotel,updateHotel,deleteHotel,getHotel,getHotelFeatured,countByCity,countByType ,getHotels,getHotelByCity, getHotelRoom} from '../Controller/hotel.js';
import { verifyAdmin } from '../until/verifyToken.js';
const router = express.Router();

router.post('/',verifyAdmin,createHotel)

router.put('/:id',verifyAdmin,updateHotel)
router.delete('/:id',verifyAdmin,deleteHotel)
router.get('/find/:id',getHotel)
router.get('/other',getHotelByCity)
router.get('/featuredProperties',getHotelFeatured)
router.get('/countByCity',countByCity)
router.get('/countByType',countByType)
router.get('/room/:id',getHotelRoom)
router.get('/',getHotels)



export default router