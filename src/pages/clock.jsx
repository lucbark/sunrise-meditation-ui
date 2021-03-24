import React from 'react';

export default class Clock extends React.Component {
  format(time) {
    let seconds = time % 60;
    //let minutes = Math.floor(time / 60);
    let reminder = Math.floor(time / 60);
    let hours= Math.floor(reminder / 60);
    let minutes = reminder % 60;
    hours =  hours.toString().length === 1 ? "0" +  hours :  hours;
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return `${hours} : ${minutes} : ${seconds}`;
  }
  render () {
    const {time} = this.props;
   
    return (
      <div className="meditation-timeContainer">
          <div  className ={this.props.animate}>{this.format(time)}</div>  
      </div>
    )
  }
}