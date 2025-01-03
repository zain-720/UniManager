import { serverURL } from '../../../App';
import axios from "axios";

//Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// acquiring note lock from server for current user
const AcquireNoteLock = async (props) => {

    while(true){
        try{
            //console.log("user being locked", props.username);
            const response = await axios.post(serverURL + "/acquireNoteLock", {
                username: props.username
            });
            if (response.status === 200) {
                return true; //Lock was set we can continue now
            }
            else{
                await sleep(100); //Put code to sleep for 100ms while it waits for lock to be free
            }
        }
        catch(error){
            console.error(error);
            await axios.post(serverURL + "/releaseNoteLock", { username: props.username });
        }
    }
}

export default AcquireNoteLock;