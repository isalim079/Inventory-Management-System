import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const WatchDemo = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const newTab = window.open("https://www.youtube.com/watch?v=wfMmFjAkD7w&ab_channel=BusinessInspectionBD", "_blank")
        if(newTab){
            newTab.focus()
        }
        else{
            navigate("/")
        }
    }, [navigate])

    return null
};

export default WatchDemo;