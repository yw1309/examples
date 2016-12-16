import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Parent extends React.Component {
    constructor() {
        super(); 
        this.state = {
            counts: Array(8).fill(0)
        };
    }

    handleClick(i) {
        // object literal ...{}
        // in es6 you can have dynamic properties (variables)
        // by using bracket notation
        const newCounts = this.state.counts.slice();
        newCounts[i] = newCounts[i] == 0 ? 1 : 0;
        this.setState({counts: newCounts});
    }

    render() {
        const result = parseInt(this.state.counts.reduce((acc, cur) => { return acc + cur}, ''), 2);
        const children = []; 
        for(let i = 0; i < this.state.counts.length; i++) {
            children.push(<Child onClick={() => {this.handleClick(i)}} val={this.state.counts[i]} />) 
        } 
        return (
            <div>
                {children}
                <Result result={result} />
            </div>
        ); 
    }
}

class Child extends React.Component {
    render() {
        return (
                <div onClick={this.props.onClick} >{this.props.val}</div>
        );
    }
}

class Result extends React.Component {
    render() {
       return <div>{this.props.result}</div>
    }
}

ReactDOM.render(
  <Parent />,
  document.getElementById('root')
);
