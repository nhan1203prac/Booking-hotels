import axios from "axios"
import {useState,useEffect} from 'react'
const useFetch = (url)=>{
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)

    useEffect(()=>{
        const fetchDate = async()=>{
            setLoading(true)
            try {
                const res = await axios.get(url)
                setData(res.data)
                setLoading(false)
            } catch (error) {
                setError(error)
            }
            
        }
        
        fetchDate()
    },[url])

    const reFetch = async()=>{
        setLoading(true)
        try {
            const res = await axios.get(url)
            setData(res.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }
    return {data,loading,error,reFetch}
}
export default useFetch