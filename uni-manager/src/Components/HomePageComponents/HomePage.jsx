import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverURL, login, logout } from '../../App';


const [username, setUsername] = useState("");

function HomePage() {
    const navigate = useNavigate();

    //Handle logout
    function handleLogout(){
        logout;
        setUsername(""); // Reset username
        navigate('/home-page');
    }

    return(
    <div>


        







        <button onClick={handleLogout}>Log out</button>
    </div>
    );
}


export default HomePage;
export {setUsername}