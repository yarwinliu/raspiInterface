// Inside src/components/rpiHeader.js

import React from 'react';
import './pin.css';
import Pin,{PinParameters}  from "./Pin";
  
class RpiHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: {},
    }

    /* define pins: */
    /* pinNumber, functionNumber, pinType, pinMOde, pinLevel */
    this.pinData = [
      [["7","4","GPIO","IN","HIGH"],["8","5","GPIO","OUT","LOW"]],
    ];
    //[["9","6","IN","HIGH"],["10","7","OUT","LOW"]],

    /* define url */
    this.url = "http://192.168.0.25:8080/api_request/12/on";

    this.isRendered = false;
    this.pins = [];
  }
  
  componentDidMount() {
    const url = this.url;
    //console.log("componentDidMount,the url is " + url);
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log("print out the result");
          //console.log(result["0"]);
          //console.log(result[0]);
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("error fetch");
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleClick(parameters,clickButton) {
    if(clickButton==="direction"){
      alert("click button: pin number["+ parameters.pinNumber + "],dirction[" + parameters.pinType + "]");
    }
    else if(clickButton==="pin"){
      alert("click button: pin number["+ parameters.pinNumber + "]" );
    }
    else{
      alert("click button: un-supported button type");
    }
  }

  render() {
    if(this.isRendered===false){
      for (var i = 0; i < this.pinData.length; i++) {
        //console.log(this.pinData[i][0]);
        let pl = this.pinData[i][0];
        let pr = this.pinData[i][1];
        let pinLeft = new PinParameters(this.handleClick,"left",pl[0],pl[1],pl[2],pl[3],pl[4]);
        let pinRight = new PinParameters(this.handleClick,"right",pr[0],pr[1],pr[2],pr[3],pr[4]);
        let pinPair = [pinLeft,pinRight];
        this.pins.push(pinPair);
        this.isRendered = true;
      }
    }

    if(this.state.isLoaded===true){
      const { items } = this.state;
      //<div>Inside the pin testing: {Object.keys(items).length}</div>
      console.log("data loaded, received data length: " + Object.keys(items).length);
      console.log("pin data length: " + this.pins.length);
      for(i=0;i<Object.keys(items).length;++i){
        //console.log(items[i].name);
        for(var j=0;j<this.pins.length;++j)
        {
          let pinLeft = this.pins[j][0];
          let pinRight = this.pins[j][1];
          //console.log(pinLeft.pinNumber);
          if(parseInt(pinLeft.pinNumber)===i){
            console.log("left pin match",i,items[i].state);
            if(items[i].state===0){
              pinLeft.pinLevel="LOW";
            }
            else if(items[i].state===1){
              pinLeft.pinLevel="HIGH";
            }
          }
          if(parseInt(pinRight.pinNumber)===i){
            console.log("right pin match",i,items[i].state);
            if(items[i].state===0){
              pinRight.pinLevel="LOW";
            }
            else if(items[i].state===1){
              pinRight.pinLevel="HIGH";
            }
          }
        }
      }
      
      //update pins array with loaded data in items 

    }

    const pinArray = this.pins.map((pinPair,index) => {
        const pinLeft = pinPair[0];
        const pinRight = pinPair[1];
        return (
          <tr key={index}>
            <Pin parameters={pinLeft}/>
            <Pin parameters={pinRight}/>
          </tr>
        );
    });

    return (
      <table>
      <tbody>
        {pinArray}
      </tbody>
      </table>
    );
  }
}

export default RpiHeader;