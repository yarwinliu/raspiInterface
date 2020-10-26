// Inside src/components/rpiHeader.js

// TODO: 
//     1. auto refresh
//     2. move pin data to a json file

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
      [["11","17","GPIO","IN","HIGH"],["12","18","GPIO","OUT","LOW"]],
      [["31","6","GPIO","IN","HIGH"],["32","12","GPIO","OUT","LOW"]],
    ];
    //[["9","6","IN","HIGH"],["10","7","OUT","LOW"]],

    /* define url */
    this.urlPre = "http://192.168.0.25:8080/api_request/";

    this.isRendered = false;
    this.pins = [];
  }
  
  pin2bcm = (pinNumber) =>{
    const { items } = this.state;

    for(var i=0;i<Object.keys(items).length;++i){
      //console.log(items[i].name);
      if(("pin"+pinNumber)===items[i].name){  
        return i;
      }
    }
    return -1;
  }

  sendData = (url) =>{
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

  componentDidMount() {
    const url = this.urlPre+"0/null";
    this.sendData(url);
  }

  handleClick(parameters,clickButton) {
    if(clickButton==="direction"){
      console.log("click button: pin number["+ parameters.pinNumber + "],dirction[" + parameters.pinMode + "]");
      let bcm = this.pin2bcm(parameters.pinNumber);
      let url = this.urlPre+`${bcm}/cmode`;
      console.log(url);
      this.sendData(url);
    }
    else if(clickButton==="pin"){
      console.log("click button: pin number["+ parameters.pinNumber + "]" );
      let bcm = this.pin2bcm(parameters.pinNumber);
      let url = this.urlPre+`${bcm}/toggle`;
      console.log(url);
      this.sendData(url);
    }
    else{
      alert("click button: un-supported button type");
    }
  }

  render() {
    if(this.state.isLoaded===true){
      const { items } = this.state;

      if(this.isRendered===false){
        for (var i = 0; i < this.pinData.length; i++) {
          //console.log(this.pinData[i][0]);
          let pl = this.pinData[i][0];
          let pr = this.pinData[i][1];
          // node: have to add the function as below, or it will not be able to access
          //       this property. and match the parameters as well
          let func = (parameters,clickButton)=>this.handleClick(parameters,clickButton);
          let pinLeft = new PinParameters(func,"left",pl[0],pl[1],pl[2],pl[3],pl[4]);
          let pinRight = new PinParameters(func,"right",pr[0],pr[1],pr[2],pr[3],pr[4]);
          let pinPair = [pinLeft,pinRight];
          this.pins.push(pinPair);
          this.isRendered = true;
        }
      }

      //update pins array with loaded data in items 
      console.log("data loaded, received data length: " + Object.keys(items).length);
      //console.log("pin data length: " + this.pins.length);
      for(i=0;i<Object.keys(items).length;++i){
        //console.log(items[i].name);
        for(var j=0;j<this.pins.length;++j)
        {
          let pinLeft = this.pins[j][0];
          let pinRight = this.pins[j][1];
          //console.log(pinLeft.pinNumber);
          if(pinLeft.pinType==="GPIO"){
            if(("pin"+pinLeft.pinNumber)===items[i].name){          
              //console.log("left pin match",i,items[i].state);
              if(items[i].state===0){
                pinLeft.pinLevel="LOW";
              }
              else if(items[i].state===1){
                pinLeft.pinLevel="HIGH";
              }
              if(items[i].mode===0){      // mode: OUT
                pinLeft.pinMode="OUT";
              }
              else if(items[i].mode===1){
                pinLeft.pinMode="IN";
              }
            }
          }

          if(pinRight.pinType==="GPIO"){
            if(("pin"+pinRight.pinNumber)===items[i].name){ 
              //console.log("right pin match",i,items[i].state);
              if(items[i].state===0){
                pinRight.pinLevel="LOW";
              }
              else if(items[i].state===1){
                pinRight.pinLevel="HIGH";
              }
              if(items[i].mode===0){      // mode: OUT
                pinRight.pinMode="OUT";
              }
              else if(items[i].mode===1){
                pinRight.pinMode="IN";
              }
            }
          }
        }
      }
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