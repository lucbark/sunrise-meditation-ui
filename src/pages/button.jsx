import React from 'react';

export default class Button extends React.Component {
    render() {
  
      return (
          <button className = "meditation-btn " onClick={this.props.onClickHandler}>{this.props.label}</button>    
      );
    }
  }