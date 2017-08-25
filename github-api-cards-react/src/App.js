import React, { Component } from 'react';
import axios from 'axios';


const Card = (props) => {
  return (

    <div style={{ margin: '1em'}}>
      <img width="75" src={props.avatar_url} />
      <div style={{display:'inline-block', marginLeft: 5}}>
        <div style={{fontSize:'1.25em', fontWeight: 'bold'}}> <mark>{props.name} </mark> </div>
        <div style={{background: 'rgba(255, 230, 0, 0.5)', display:'inline-block'}}> {props.company} </div>
      </div>
    </div>

  );
};

const CardList = (props) => {
  return (
    <div class="media-list">
      {props.cards.map(card => <Card {...card} />)}
    </div>
  );

};



class Form extends React.Component{

  state = { userName: ''};

  handleSubmit = (event) => {
      event.preventDefault();
      console.log("Event form submit ", this.state.userName);
      axios.get(`https://api.github.com/users/${this.state.userName}`)
           .then( resp => {
              this.props.onSubmit(resp.data);
      });
  };

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.userName}
          onChange={ (event) => this.setState({userName: event.target.value })}
          placeholder="Add Github Username"
          required />

        <button type="submit"> Add Card </button>
      </form>
    );
  }
}

class App extends React.Component{

  state = {
            cards: [
	{name:"Tien Pham",
  avatar_url:"https://avatars1.githubusercontent.com/u/25751050?v=4&s=400"}
]
         };


 addNewCard = (cardInfo) => {
   this.setState(prevState => ({
       cards: prevState.cards.concat(cardInfo)
   }));
 };

  render(){

    return(
      <div>
        <Form onSubmit={this.addNewCard}/>
        <CardList cards={this.state.cards} />
      </div>
    );

  }

}

export default App;
