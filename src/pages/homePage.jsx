  
import React from "react";
import AuthenticationService from "../services/AuthenticationService.js";

export default class HomePage extends React.Component {
    render() {

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const username = AuthenticationService.getLoggedInUserName();

        return (
            <div>
                <h1> Sunrise Meditation App </h1>
                {isUserLoggedIn && <h3>Welcome {username}!</h3>}
                    <p> 
                        Meditation works wonders by calming the mind, creating relaxation, promoting better sleep, and encouraging a healthy lifestyle.
                        <br></br>
                        Mediating at the apropriate time is key.
                    </p>
                        <img srcset="https://cdn.pixabay.com/photo/2018/04/28/22/03/dawn-3358468_960_720.jpg 1x, 
                        https://cdn.pixabay.com/photo/2018/04/28/22/03/dawn-3358468_1280.jpg 1.333x" 
                        src="https://cdn.pixabay.com/photo/2018/04/28/22/03/dawn-3358468_960_720.jpg" 
                        alt="Landing Page Image"></img>
            
            </div>
    );
    }
}