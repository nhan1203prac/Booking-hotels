import mongoose from 'mongoose';
const { Schema } = mongoose;
const roomSchema = new Schema({
    title:{
        type:String,
        required:true,
        
    },
    price:{
        type:Number,
        required:true,
        
    },
    maxPeople:{
        type:Number,
        required:true,
        
    },
    desc:{
        type:String,
        required:true,
    },
    roomNumbers:[{number:Number,unavailableDates:{type:[Date]}}]
    

},{timestamps:true})

// [
//     {number:101,unavailableDates: ['01.05.2020','07.05.2020']},
//     {number:102,unavailableDates:['02.06.2020','09.06.2020']}
// ]
export default mongoose.model('Room',roomSchema)