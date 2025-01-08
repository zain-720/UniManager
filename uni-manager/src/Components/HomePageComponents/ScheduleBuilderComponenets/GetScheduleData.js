import { serverURL } from '../../../App';
import axios from "axios";


//Get the note data for the given user
const GetScheduleData = async(setScheduleData, username) =>{
    
    try{
        //Get user note data and their largest note key
        const response = await axios.get(serverURL + "/requestScheduleData", { params: {username} });
        
        //Set data up
        setScheduleData(response.data);
        //console.log("data back",response.data);
        return response.data;

    }
    catch(err){
        console.error(err);
    }
};

export default GetScheduleData;