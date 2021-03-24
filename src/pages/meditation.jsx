import React from "react";
import MeditationServices from "../services/MeditationServices";
import AuthenticationService from "../services/AuthenticationService.js";
import Button from "./button";
import Clock from "./clock";
import Input from "./input";



export default class Meditaion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      running: false,
      startCount:0,
      endCount:0,
      time_log: 0,
      created_timestamp: null,
      end_timestamp:null,
      userId: null
    }

    
  }

  
  componentDidUpdate(prevProps, prevState) {   
    if(this.state.running !== prevState.running){
      switch(this.state.running) {
        case true:
          this.handleStart();    
      }
    }

    
  }

  createDateStamp(){
   
    const date = new Date();
    const mySqldateformat = date.toISOString().split('T')[0] + ' '  
    + date.toTimeString().split(' ')[0];
    return mySqldateformat;
  }

// logic for update total time pull the  total time according to the userid, pass the value in total time state,
// do the calculate in the stop state. totalmie from start state + timelog in stop state. 
 
  handleStart() {
    const userId = AuthenticationService.getLoggedInUserId() ;
    const mySqldateformat = this.createDateStamp();
   
    const startTimeLog = this.state.count;

    this.timer = setInterval(() => {

      const newCount = this.state.count - 1;
    
      this.setState(
        {count: newCount >=0 ? newCount : 0,
        startCount:startTimeLog,
        endCount:this.state.count-1,
        time_log: this.state.startCount - this.state.endCount,
        created_timestamp: mySqldateformat,
        userId: userId
        }
      );
      
      //console.log("state from starthandler: " , this.state.time_log);

  
      newCount ===0 && this.handleStop();
      
    }, 1000);
  }
  

 

  handleStop() {

  
    const mySqldateformat = this.createDateStamp();
  
    if(this.timer) {
      clearInterval(this.timer);
     this.setState(
        {running:false,
          count: 0
        }
        
      ); 
  
    }
    // console.log(this.state.startCount, this.state.endCount);
    // console.log("from stop handler: " ,this.state);
    let timeLogIntoMinutes=((this.state.time_log + 1)/60).toFixed(2);

   
    let meditation = {
      userId: this.state.userId,
      created_timestamp: this.state.created_timestamp,
      time_log:timeLogIntoMinutes,
      end_timestamp: mySqldateformat
    }
    console.log('MEDIATATION PAYLOAD', meditation);
    MeditationServices.saveMeditation(meditation);


  }
  
  handleAnimation(){
   
    let animation = (this.state.running && this.state.count !==0) ? "meditation-bubble-container" : "meditation-displayTime ";
    return animation;
  }
 
 
  handleReset() {
    this.setState(
      {count: 0, 
      }
    );
  }
  
  handleCountdown(seconds) {
    this.setState({
      count: seconds,
      running: true
    })
  }
  
  render() {
    
    const style = {
      
        margin: 0,
        fontSize: '2em'
      
    }
    const {count} = this.state;
    const username = AuthenticationService.getLoggedInUserName();

    const jwtToken = AuthenticationService.getJwtTokenFromSession();
    AuthenticationService.setupAxiosInterceptors(AuthenticationService.createJWTToken(jwtToken));

    return (
      <div className="meditation-container" style = {style}>
        <h2 className = "meditation-message">Welcome, {username? username : 'Guest'}</h2>
        <Clock time={count} animate = {this.handleAnimation()}/>
        <div>
        <Input onSetCountdown={this.handleCountdown.bind(this)}/>
        <Button label="stop" onClickHandler={this.handleStop.bind(this)}/>
        <Button label="reset" onClickHandler={this.handleReset.bind(this)}/>

        </div>
       
      </div>
    )
  }
}



  

