import { serverURL } from '../../../App';
import axios from "axios";


//Get the note data for the given user
const GetTodoListData = async(setTodoData, username) =>{
    
    try{
        //Get user note data and their largest note key
        const response = await axios.get(serverURL + "/requestTodoListData", { params: {username} });
        
        //Set data up
        setTodoData(response.data);
        return response.data;

    }
    catch(err){
        console.error(err);
    }
};

export default GetTodoListData;