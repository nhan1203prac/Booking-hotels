import Hotel from '../models/hotel.js';
import Room from '../models/room.js';

export const createHotel = async(req,res,next)=>{
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)    
    } catch (error) {
        next(error)
    }
}

export const updateHotel = async(req,res,next)=>{
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(err)
    }
}
export const deleteHotel = async(req,res,next)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted.")
    } catch (error) {
        next(error)
    }
}
export const getHotel = async(req,res,next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
}
export const getHotelFeatured = async(req,res,next)=>{
    const {min,max,featured} = req.query
  

    try {
        const hotels = await Hotel.find({featured,cheapestPrice:{$gt:min ||1 ,$lt:max ||999 }}).limit(req.query.limit)
        res.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}
export const getHotels = async(req,res,next)=>{
    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}
export const getHotelByCity = async(req,res,next)=>{
    const {min,max,city} = req.query
    try {
        const hotels = await Hotel.find({city,cheapestPrice:{$gt:min || 1, $lt:max||999}})
        res.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}
export const countByCity = async(req,res,next)=>{
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}
export const countByType = async(req,res,next)=>{
    try {
        const hotelCount = await Hotel.countDocuments({type:"Hotel"})
        const apartmentCount = await Hotel.countDocuments({type:"Apartment"})
        const resortCount = await Hotel.countDocuments({type:"Resort"})
        const villaCount = await Hotel.countDocuments({type:"Villa"})
        const cabinCount = await Hotel.countDocuments({type:"Cabin"})


        res.status(200).json([
            {type:"Hotel", count:hotelCount},
            {type:"Apartment", count:apartmentCount},
            {type:"Resort", count:resortCount},
            {type:"Villa", count:villaCount},
            {type:"Cabin", count:cabinCount}
        ])
    } catch (error) {
        next(error)
    }
}
export const getHotelRoom = async(req,res,next)=>{
    try {
        const hotelId =await Hotel.findById(req.params.id)
        const list = await Promise.all(
                hotelId.rooms.map(room=>{
                return Room.findById(room)
            })
        )
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}