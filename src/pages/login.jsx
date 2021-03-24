import React, { Component } from "react";
import axios from "axios";
import AuthenticationService from "../services/AuthenticationService.js";

class login extends Component {
  constructor() {
    super();

    this.state = {
      username: "username",
      password: "password"
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange = event => {
    
    this.setState(
        {
            [event.target.name]
                : event.target.value
        }
    )    
}

  handleFormSubmit = event => {
    event.preventDefault();

    const endpoint = "http://localhost:8080/authenticate";

    const username = this.state.username;
    const password = this.state.password;

    const user_object = {
      username: username,
      password: password
    };
    console.log("user_object : " , user_object);
    axios.post(endpoint, user_object).then(res => {
      AuthenticationService.registerSuccessfulLogin(this.state.username, res.data.token);
      console.log("res.data.token : ", res.data.token)
      return this.handleLoginSuccess();
    }).catch(() => {
      alert("Login failed:Invalid Credentials")
    });
  };

  handleLoginSuccess() {
    console.log("Inside LoginSuccess");
    const loggedUser = AuthenticationService.getLoggedInUserName();
    axios.get(`http://localhost:8080/loginSuccess/${loggedUser}`).then(res => {
      AuthenticationService.persistLoggedInUserId(res.data);
      this.props.history.push("/");
    });
  }

  render() {
    const style = {
      marginBottom: "20px",
      width: "22vw",
      height: "4vw",
      border: "1px solid #ccc",
      borderRadius: "5px",

    }
    return (
      <div>
        <div class="wrapper">
          <form class="form-signin" onSubmit={this.handleFormSubmit}>
            <h2 class="form-signin-heading">User Login</h2>
            <div className="form-group">
              <input style = {style} type="text"
                class="form-control"
                placeholder="User name"
                name="username"
                value={this.state.username.text} 
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input style = {style}   type="password"
                class="form-control"
                placeholder="Password"
                name="password"
                value={this.state.password.text}
                onChange={this.handleChange}
              />
            </div>
            <button style = {{width: "8vw", height: "3vw", border: "1px solid #ccc",
      borderRadius: "3px"}}  class="btn btn-lg btn-primary btn-block" type="submit">
              Login
            </button>
            <div class="wrapper">
            <a href="/forgotPassword" variant="body2"> Did you forget your password?</a>
            </div>
            <div class="wrapper">
            <a href="/register" variant="body2"> Don't have an account? Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default login;