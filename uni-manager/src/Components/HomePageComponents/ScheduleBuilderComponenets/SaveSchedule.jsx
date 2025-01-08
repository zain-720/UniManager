import axios from "axios";
import { serverURL } from '../../../App';

const SaveSchedule = async (props)=> { //Simple universal list saving component

    const updatedSchedule = props.scheduleData.schedule;
    //console.log(updatedSchedule);
    const nextKeyValue = props.scheduleData.key_number;
    const response = await axios.put(serverURL + "/requestUpdateSchedule", {newData: updatedSchedule, username: props.username, nextKeyValue: nextKeyValue })

}


export default SaveSchedule