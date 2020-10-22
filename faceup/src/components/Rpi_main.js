// Inside src/components/Rpi_main.js


import React from 'react';
import './rpi_main.css';
import Pin from "./Pin";

export class RpiMain extends React.Component {
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

  render() {
    //const { error, isLoaded, items } = this.state;
    //const { items } = this.state;
    //<div>Inside the pin testing: {Object.keys(items).length}</div>
    //
    return (
      <table>
      <tbody>
        <tr>
          <Pin location="left" pinNumber="1"  pinType="3.3V"/>
          <Pin location="right" pinNumber="2" pinType="5.0V"/>
        </tr>
        <tr>
          <Pin location="left" pinNumber="3" gpioNumber="2" pinType="OUT" gpioLevel="HIGH"/>
          <Pin location="right" pinNumber="4" pinType="5.0V"/>
        </tr>
        <tr>
          <Pin location="left" pinNumber="5" gpioNumber="3" pinType="OUT" gpioLevel="HIGH"/>
          <Pin location="right" pinNumber="6" pinType="GROUND"/>
        </tr>
        <tr>
          <Pin location="left" pinNumber="7" gpioNumber="4" pinType="OUT" gpioLevel="LOW"/>
          <Pin location="right" pinNumber="8" gpioNumber="5" pinType="OUT" gpioLevel="LOW"/>
        </tr>
      </tbody>
      </table>
    );
    
  }
}

export default RpiMain;