import React, {Component} from 'react'
import {render} from 'react-dom'

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
      <Card name="Paul"
            avatar_url="https://avatars.githubusercontent.com/u/8445?v=3"
            company="Facebook"
      />
    </div>
  )
}

render(<CardList />, document.getElementById("app"));
