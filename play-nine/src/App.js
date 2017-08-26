import React, { Component } from 'react';
import _ from 'lodash';
import { Navbar, Jumbotron, Glyphicon  } from 'react-bootstrap';


const Stars = (props) => {
  return (
    <div className="col-md-5">
      {_.range(props.numberOfStars).map(i =>
        <i key={i} className="glyphicon glyphicon-star"></i>
      )}
    </div>
  );
}

const Button = (props) => {
  let button;

  switch(props.answerIsCorrect){
    case true:
       button =  <button className="btn btn-success" onClick={props.acceptAnswer}><i className="glyphicon glyphicon-ok"></i></button>;
      break;
    case false:
      button =  <button className="btn btn-danger" ><i className="glyphicon glyphicon-remove"></i></button>;
      break;
    default:
      button =  <button className="btn"
                  onClick={props.checkAnswer}
                  disabled={props.selectedNumbers.length === 0}>=</button>;
  }

  return (
    <div className="col-md-2">
      {button}
      <br /><br />
      <button className="btn btn-warning" disabled={props.redraws === 0} onClick={props.redraw}>
        <i className="glyphicon glyphicon-refresh"></i> {props.redraws}
      </button>
    </div>
  );
}

const Answer = (props) => {
  return (
    <div className="col-md-5">
      {props.selectedNumbers.map((number, i) =>
         <span key={i} onClick={() => props.unselectNumber(number)}>
          {number}
         </span>
      )}
    </div>
  );
}

const Numbers = (props) => {
  const numberClassName = (number) =>{
    if(props.usedNumbers.indexOf(number) >=0){
      return 'used';
    }
     if(props.selectedNumbers.indexOf(number) >=0){
      return 'selected';
    }
  };

  return (
    <div className="col-md-12" style={{marginTop:30}}>
      <div className="panel panel-info ">
        <div className="panel-heading">Numbers</div>
        <div className="panel-body">
          {Numbers.list.map((number, i)  =>
            <span onClick={() => props.selectNumber(number)} key={i} className={numberClassName(number)}>
              {number}
            </span>
          )}
        </div>
      </div>
    </div>

  );
}
Numbers.list = _.range(1,10);

const DoneFrame = (props) => {
  return (
    <div style={{textAlign:"center"}}>
      <br /> <br /><br /> <br /><br /> <br />
      <h2>{props.doneStatus}</h2>
    </div>
  );
};

class Game extends React.Component {
  static randomNumber = () => 1 + Math.floor(Math.random()*9);
  state = {
    selectedNumbers: [],
    randomNumberOfStars:Game.randomNumber(),
    usedNumbers: [],
    answerIsCorrect: null,
    redraws: 5,
    doneStatus: null
  };

  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >=0){
      return;
    }
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };

  unselectNumber = (clickedNumber) => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers
                                .filter(number => number !== clickedNumber)
    }));
  };

  checkAnswer = () => {
    this.setState(prevState =>({
      answerIsCorrect: prevState.randomNumberOfStars===prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }))
  };

  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      randomNumberOfStars:  Game.randomNumber()
    }));
  };

  redraw = () =>{
      if (this.state.redraws === 0) {return;}
      this.setState(prevState => ({
      selectedNumbers: [],
      answerIsCorrect: null,
      randomNumberOfStars:  Game.randomNumber(),
      redraws: prevState.redraws - 1
    }));
  };

  render(){
    const {
      selectedNumbers,
      randomNumberOfStars,
      answerIsCorrect,
      usedNumbers,
      redraws,
      doneStatus
    } = this.state
  	return (
    	<div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={randomNumberOfStars} />
          <Button selectedNumbers={selectedNumbers}
            redraws={redraws}
            checkAnswer={this.checkAnswer}
            answerIsCorrect={answerIsCorrect}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}/>
          <Answer unselectNumber={this.unselectNumber}
                  selectedNumbers={selectedNumbers}  />

          {doneStatus?
            <DoneFrame doneStatus={doneStatus}/> : <Numbers selectNumber={this.selectNumber}
                   selectedNumbers={selectedNumbers}
                   usedNumbers={usedNumbers}/>
          }



        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render(){
  	return (
    	<div>
        <Game />
      </div>
    );
  }
}

export default App;
