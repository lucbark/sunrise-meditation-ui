import React from 'react';
import { Grid, } from '@material-ui/core';
import axios from "axios";
import AuthenticationService from "../services/AuthenticationService.js";
import moment from "moment";
import DonutChart from 'react-donut-chart';

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          input: '',
          errors: {},
          userId: 0,
          userName : null,
          emailId : null,
          weeklyGoal : 0,
          totalGoalAchieved : 0,
          memberSince : null
          };                
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount () {
        const loggedInUserId = AuthenticationService.getLoggedInUserId();
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const jwtToken = AuthenticationService.getJwtTokenFromSession();
        console.log("isUserLoggedIn ? ", isUserLoggedIn);
        console.log("jwtToken : ", jwtToken);
        AuthenticationService.setupAxiosInterceptors(AuthenticationService.createJWTToken(jwtToken));
        axios.get(`http://localhost:8080/userProfile/${loggedInUserId}`)
            .then(response => {
                console.log("response data : ", response.data);
                this.setState({
                userId: response.data.userId,
                userName : response.data.userName,
                emailId : response.data.emailId,
                weeklyGoal : response.data.weeklyGoal,
                totalGoalAchieved : response.data.totalGoalAchieved,
                memberSince: response.data.memberSince                
            })}
        );
    }
    correctDateForm() {
       const date = this.state.memberSince;
       const dateForm=moment(date).format("MMMM Do YYYY");
       return dateForm;
    }
   graphNotMeditatedValue(){
        let notMeditated=0;
        let meditated =this.state.totalGoalAchieved
        if(this.state.totalGoalAchieved < this.state.weeklyGoal)
        {
        notMeditated=this.state.weeklyGoal- this.state.totalGoalAchieved;
        console.log(notMeditated);
        console.log(meditated);
        }
        return notMeditated;
    }
   
    handleChange(event) {
        let weeklyGoal = parseInt(event.target.value);
        let input = {};
        this.setState({input:weeklyGoal});
    }
    handleClick = (event)=> {
        event.preventDefault();
        const loggedInUserId = AuthenticationService.getLoggedInUserId();
        const jwtToken = AuthenticationService.getJwtTokenFromSession();
        AuthenticationService.setupAxiosInterceptors(AuthenticationService.createJWTToken(jwtToken));
        console.log("handleClick : ", this.validate());
        //if(this.validate()) {
            const post = {
                weeklyGoal : this.state.input
                        }
            console.log("POST :" , post);
            axios.put(`http://localhost:8080/updateProfile/${loggedInUserId}`, post)
            .then(res => {
                alert(res.data);
            })
        //}
    }
 
    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;
        if (!input["weeklyGoal"]) {
            isValid = false;
            errors["weeklyGoals"] = "Please enter your goals to update.";
        }
        this.setState({
            errors: errors
        });
        return isValid;
    }
    render() {
      const username = AuthenticationService.getLoggedInUserName();
    return(        
            <div>
                <h1> User Profile </h1>
                    <form>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
    <h2> Welcome {username}</h2>
    <h3>Member Since:{this.correctDateForm()}</h3>
    <br></br><br></br>
    <input type="text" name="weeklyGoal"
                value={this.state.weeklyGoal.text}  onChange={this.handleChange} />
      <button onClick={this.handleClick}>Update Goals</button>
  <br></br>
  <hr></hr>
  <DonutChart
    data={[{
        label: 'Meditated',
        value:this.state.totalGoalAchieved
    },
    {
        label: 'Not Meditated',
        value: this.graphNotMeditatedValue()

    }]}
    
    height ='200'
    align ='left'
    width= '300'
    text='previous week'
    
        /> 
    

       </Grid>
      </Grid>
      </form>
      </div>
        );
    }
}