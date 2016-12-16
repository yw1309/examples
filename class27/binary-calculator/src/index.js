import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class BinaryCalculator extends React.Component {
  constructor(props) {
    super();
    this.state = {bits: Array(+props.bits).fill(0)};   
  }
  
  handleClick(i) {
    const bits = this.state.bits.slice();
    bits[i] = bits[i] == 0 ? 1 : 0;
    this.setState({bits:bits});
  }
  render() {
    const clickers = [];
    for(let i = 0; i < +this.state.bits.length; i++) {
      clickers.push(
        <Bit onClick={() => {this.handleClick(i)}} value={this.state.bits[i]} />
      );
   
    }
    const result = parseInt(this.state.bits.reduce((acc, ele) => {return acc + ele}, ""), 2);
    return <div className="binaryCalculator">{ clickers }<Result value={result}/></div>;
  }
}

class Bit extends React.Component {
  constructor() {
    super();
    this.state = {count: 0};
  }
  
  render() {
    return <div onClick={() => {this.props.onClick()}}><h2>{this.props.value}</h2></div>;
  }
  
  handleClick() {
    this.setState({count: this.state.count + 1});
  }
}

class Result extends React.Component {
  render() {
    return <div><h1>=&nbsp;&nbsp;&nbsp;{this.props.value}</h1></div>;
  }
}

ReactDOM.render(
  <BinaryCalculator bits="8" />,
  document.getElementById('root')
);

