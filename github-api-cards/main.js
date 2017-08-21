const Card = (props) => {
	return(
  	<div style = {{margin: '1em'}}>
      <img width="75" src= {props.avatar_url}/>
      <div style={{display:'inline-block', marginLeft:10}}>
        <div style={{fontSize:'1.25em', fontWeight: 'bold'}}>
          {props.name}
        </div>
        <div> {props.company} </div>
      </div>
    </div>
  );
};

const CardList = (props) => {
	return(
  	<div>
      {props.cards.map(card => <Card {...card}/>)}
    </div>
  )
}

class Form extends React.Component{

	handleSubmit = (event) => {
  	event.preventDefault();
    console.log('event: Form submit');
  }

 	render(){
  	return (
    <form onSubmit={this.handleSubmit}>
      <input type="text" placeholder="Github username" />
      <button type="submit">Add card </button>
    </form>
    )
  }
}

class App extends React.Component{
	constructor(){
  	super();
    this.state = {
    cards: [
	{name:"a",
  avatar_url:"https://avatars.githubusercontent.com/u/8445?v=3",
  company:"c"},
  {name:"a",
  avatar_url:"https://avatars.githubusercontent.com/u/8445?v=3",
  company:"c"},
] };
	}

	render(){
  	return(
    	<div>
        <Form />
        <CardList cards ={this.state.cards}/>
      </div>
    )
  }
}

render(<App/>, document.getElementById("app"));
