import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './reserve.css'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import { useContext, useState } from 'react'
import { SearchContext } from '../../context/SearchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Reserve({setOpen, hotelId}){
const navigate = useNavigate()

    const {data,loading,error} =useFetch(`/hotels/room/${hotelId}`)
    const [selectedRoom, setSelectedRoom] = useState([])
    const {date} = useContext(SearchContext)
    // console.log(data)
    const handleSlect = (e)=>{
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRoom(checked?[...selectedRoom,value]: selectedRoom.filter(item=>item!==value))
    }
    console.log(selectedRoom)
    const getDateInRange = (startDate, endDate)=>{
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())
        const dates = []
        while(date <= end){
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }
        return dates
    }
    const allDates = getDateInRange(date[0].startDate, date[0].endDate)
    console.log(allDates)
    const isAvailable = (roomNumbers)=>{
        const isFound = roomNumbers.unavailableDates.some(date=>{
            return allDates.includes(new Date(date).getTime())
        })
        // console.log(isFound)
        return isFound
    }
    // console.log(isAvailable(data[0]?.roomNumbers[0]))
    const handleClick = async()=>{
        try {
            await Promise.all(
                selectedRoom.map((roomId)=>{
                    const res = axios.put(`/room/availability/${roomId}`,{dates:allDates})
                    return res.data
                }

            )
        )
        setOpen(false)
        navigate("/")
    } catch (error) {
            
        }
    }
    return(
        <div className='reserve'>
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={()=>setOpen(false)}/>
                <span>Select your room</span>
                {data.map(item=>(
                    <div className="rItem">
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">Max people: <b>{item.maxPeople}</b></div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        <div className='rSelectRoom'>
                        {item.roomNumbers.map(item=>(
                            <div className="room">
                                <label>{item.number}</label>
                                <input type='checkbox' value={item._id} onChange={(e)=>handleSlect(e)}  disabled={isAvailable(item)} />

                            </div>
                        ))}
                       
                        </div>
                    </div>
                ))}
                 <button className='rButton' onClick={handleClick}>Reserve Now!</button>
            </div>
        </div>
    )
}
export default Reserve