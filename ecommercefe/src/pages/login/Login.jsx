import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import './login.css'
import { useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = ()=>{
    const [creadential, setCreadential] = useState({
        username: '',
        password: ''
    });
    
    const {user,loading,dispatch,error} = useContext(AuthContext)
    const handleChange = (e) => {
        setCreadential((pre) => ({ ...pre, [e.target.id]: e.target.value }));
    };
    
    // console.log(creadential)
    const handleClick = async (e) => {
    e.preventDefault();
    // console.log(creadential);
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post("/auth/login", creadential);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.detail });
        navigate("/")
    } catch (error) {
        dispatch({ 
            type: "LOGIN_FAILURE", 
            payload: error.response ? error.response.data : "Something went wrong",
        });
    }
    
};
// console.log({user,dispatch,error})
const navigate = useNavigate()
    return(
        <div className='login'>
            <div className="lcontainer">
                <input type="text"placeholder='username' id='username' onChange={handleChange} className='LInput' />
                <input type="password"placeholder='password' id='password' onChange={handleChange} className='LInput' />
                <button disabled={loading} onClick={handleClick} className='LButton' >Login</button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    )
}
export default Login