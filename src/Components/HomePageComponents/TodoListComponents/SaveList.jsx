import axios from "axios";
import { serverURL } from '../../../App';

const SaveList = async (props)=> { //Simple universal list saving component

    const updatedList = props.todoData.items;
    const nextKeyValue = props.todoData.key_number;
    const response = await axios.put(serverURL + "/requestUpdateList", {newData: updatedList, username: props.username, nextKeyValue: nextKeyValue })

}


export default SaveList