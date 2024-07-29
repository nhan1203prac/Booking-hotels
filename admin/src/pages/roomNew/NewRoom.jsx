import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import useFetch from "../../hooks/useFetch"
import axios from "axios";
const NewRoom = ({ inputs, title }) => {
  const [info, setInfo] = useState({})
  const [hotelId, setHotelId] = useState("")
  const {data,loading,error} = useFetch("/hotels")
  const [rooms,setRooms] = useState([])
  
  const handleChange = (e)=>{
    setInfo(pre=>({...pre,[e.target.id]:e.target.value}))
  }
  const handleClick = async(e)=>{
    e.preventDefault()
    const roomNumbers = rooms.split(",").map(room=>({number:room}))
    try {
      await axios.post(`/room/${hotelId}`,{...info,roomNumbers})
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
         
          <div className="right">
            <form>
             

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} id={input.id} onChange={handleChange} placeholder={input.placeholder} />
                </div>
              ))}
              <div className="formInput" >
                  <label>Choose a hotel</label>
                  <select name="" id="hotelId" onChange={e=>setHotelId(e.target.value)}>
                      {loading?"loading":data&&data.map(hotel=>(
                        <option value={hotel._id} key={hotel._id}>{hotel.name}</option>
                      ))}
                  </select>
                </div>
                <div className="formInput" >
                  <label>Rooms</label>
                  <textarea name="" id="" cols="30" rows="10" onChange={e=>setRooms(e.target.value)}></textarea>
                </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
