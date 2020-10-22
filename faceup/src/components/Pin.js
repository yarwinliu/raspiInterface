// Inside src/components/Button/Button.js

/*
import React from 'react';

const Button = ({ children, ...rest }) => {
  return (
    <button className="button" {...rest}>
      { children }
    </button>
  )
}

export default Button;
*/

import React from 'react';
//import PropTypes from 'prop-types';
import './pin.css';

const PinTag = (props) => 
{
  return props.children;
}
 
/**
 * Primary UI component for user interaction
 */
class BasePin extends React.Component {

  getPinState=()=>{
    alert("get pin state");
    return (
      <h2>get pin state</h2>
    )
  }

  setPinState=(pinState)=>{
    alert("set pin state" + pinState);
    return (
      <h2>set pin state {pinState}</h2>
    )
  }

  togglePinState=()=>{
    alert("toggle pin state, gpio: " + this.props.pinNumber);
    return (
      <h2>toggle pin state, gpio: {this.props.gpioNumber}</h2>
    )
  }

  render(){
    return (
      <h2>BasePin class</h2>
    )
  }
}

  //const LeftPin = ({ pinNumber, gpioNumber, pinType, gpioLevel, ...props }) => {
  //class LeftPin extends React.Component {
  class LeftPin extends BasePin {
  
    render(){
      const {pinNumber, gpioNumber, pinType, gpioLevel} = this.props;
      //const descID = "description"+`${gpioNumber}`;
      const descID = `description${gpioNumber}`;
      const functionID = `function${gpioNumber}`;
      const gpioID = `gpio${gpioNumber}`;

      //console.log("functionID:",descID);

      switch(pinType){
        case 'OUT':
        case 'IN':
        case 'GPIO':
          return (
          <PinTag>
            <td align="center">
                <button type="button" className="FunctionBasic" id={functionID} value={pinType}>{pinType}</button>
            </td>
            <td align="right">
                <div className="Description" id={descID}>GPIO {gpioNumber}</div>
            </td>
            <td align="center">
                <button type="button" className={gpioLevel} id={gpioID} onClick={this.togglePinState}>{pinNumber}</button>
            </td>
          </PinTag> 
          )
        case 'GROUND':
        case '--':
        case '3.3V':
        case '5.0V':  
          var pinLevel = "HIGH";
          if(pinType==="GROUND")
          {
            pinLevel = "LOW";
          }
          else if(pinType==="--")
          {
            pinLevel = "DNC";
          }
          else if(this.props.pinType==="5.0V")
          {
            pinLevel = "V50";
          }
          return (
            <PinTag>
              <td align="center"></td>
              <td align="right">
                  <div className="Description" id={descID}>{pinType}</div>
              </td>
              <td align="center">
                  <button type="button" className={pinLevel} id={gpioID}>{pinNumber}</button>
              </td>
            </PinTag> 
            )
        default:
          return null;
      }
    }
  }

  //const RightPin = ({pinNumber, gpioNumber, pinType, gpioLevel, ...props}) => {
  class RightPin extends React.Component {
    //const {pinNumber, gpioNumber, pinType, gpioLevel, ...props} = this.props;

    render(){
      const {pinNumber, gpioNumber, pinType, gpioLevel} = this.props;
      const descID = `description${this.props.gpioNumber}`;
      const functionID = `function${gpioNumber}`;
      const gpioID = `gpio${gpioNumber}`;
      
      switch(pinType){
        case 'OUT':
        case 'IN':  
        case 'GPIO':
          return (
            <PinTag>
                <td align="center">
                    <button type="button" className={gpioLevel} id={gpioID}>{pinNumber}</button>
                </td>
                <td align="left">
                    <div className="Description" id={descID}>GPIO {gpioNumber}</div>
                </td>
                <td align="center">
                    <button type="button" className="FunctionBasic" id={functionID} value={pinType}>{pinType}</button>
                </td>       
            </PinTag> 
            )
        case 'GROUND':
        case '--':
        case '3.3V':
        case '5.0V':  
          var pinLevel = "HIGH";
          if(pinType==="GROUND")
          {
            pinLevel = "LOW";
          }
          else if(pinType==="--")
          {
            pinLevel = "DNC";
          }
          else if(this.props.pinType==="5.0V")
          {
            pinLevel = "V50";
          }
          return (
            <PinTag>
              <td align="center">
                  <button type="button" className={pinLevel} id={gpioID}>{pinNumber}</button>
              </td>
              <td align="left">
                  <div className="Description" id={descID}>{pinType}</div>
              </td>
              <td align="center"></td>
            </PinTag> 
            )
        default:
          return null;
      }
    }
  }

class TestPin extends React.Component {
  render(){
    const descID = `description${this.props.gpioNumber}`;
    const functionID = `function${this.props.gpioNumber}`;
    const gpioID = `gpio${this.props.gpioNumber}`;
    
    switch(this.props.pinType){
      case 'OUT':
      case 'IN':
      case "GPIO":
        return (
          <PinTag>
              <td align="center">
                  <button type="button" className={this.props.gpioLevel} id={this.props.gpioID}>{this.props.pinNumber}</button>
              </td>
              <td align="left">
                  <div className="Description" id={this.props.descID}>GPIO {this.props.gpioNumber}</div>
              </td>
              <td align="center">
                  <button type="button" className="FunctionBasic" id={functionID} value={this.props.pinType}>{this.props.pinType}</button>
              </td>       
          </PinTag> 
          )
      case 'GROUND':
      case '--':
      case '3.3V':
      case '5.0V':  
        var pinLevel = "HIGH";
        if(this.props.pinType==="GROUND")
        {
          pinLevel = "LOW";
        }
        else if(this.props.pinType==="--")
        {
          pinLevel = "DNC";
        }
        else if(this.props.pinType==="5.0V")
        {
          pinLevel = "V50";
        }
        return (
          <PinTag>
            <td align="center">
                <button type="button" className={pinLevel} id={gpioID}>{this.props.pinNumber}</button>
            </td>
            <td align="left">
                <div className="Description" id={descID}>{this.props.pinType}</div>
            </td>
            <td align="center"></td>
          </PinTag> 
          )
      default:
        return null;
    }
  }
}

export class Pin extends React.Component {
  render() {
    return (
      <PinTag>   
        {this.props.location==="left"?<LeftPin  {...this.props}/>:
        this.props.location==="right"?<RightPin {...this.props}/>:
        this.props.location==="test"?<TestPin {...this.props}/>:
        "pin location not defined"}
      </PinTag>
    );
    
  }
}

/*****************************************************
 * Input parameters:
 * location:
 *    left
 *    right
 * pinNumber: 1 - 50?
 * gpioNumber: 1 - 30?
 * pinType:
 *    GPIO
 *    IN
 *    OUT
 *    GROUND
 *    3.3V
 *    5V
 *    UART TX
 *    UART RX
 * gpioLevel:
 *    HIGH
 *    LOW
*/
export class PinTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: {},
    }
    
  }
  
  componentDidMount() {
    const url = "http://192.168.0.25:8080/api_request/12/on";
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

  /*
        <ul>
          {items.map(item => (
            <li key={item.name}>
              {item.name} {item.state}
            </li>
          ))}
      </ul>
  */

 

  render() {
    //const { error, isLoaded, items } = this.state;
    //const { items } = this.state;
    return (
      <div id="content" align="center">
      <table id="RPiHeader">
      <tbody>
        <tr>
          <Pin location="left" pinNumber="25" gpioNumber="27" pinType="GPIO" gpioLevel="HIGH"/>
          <Pin location="right" pinNumber="12" gpioNumber="15" pinType="3.3V" gpioLevel="LOW"/>
        </tr>
        <tr>
        <Pin location="left" pinNumber="25" gpioNumber="27" pinType="GPIO" gpioLevel="HIGH"/>
          <Pin location="right" pinNumber="12" gpioNumber="15" pinType="3.3V" gpioLevel="LOW"/>
        </tr>
      </tbody>
      </table>
      </div>
    );
    
  }
}
  

  /*
export const Button = ({ primary, backgroundColor, size, label, ...props }) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
*/


export default Pin;