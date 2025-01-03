import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Handle redirection to login if logged out
function HandleLoggedOut(){
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/login");
    }, [navigate]);

  };

  export default HandleLoggedOut;