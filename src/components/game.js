import React, { Component } from 'react';

import './game.css';
import CardList from './cardList';

import Instructions from '../components/instructions'

class Game extends Component {
    constructor(props) {
        super(props);
        // this.onCardClicked = this.onCardClicked.bind(this);
        // this.onPlayAgain = this.onPlayAgain.bind(this);
        this.state = {
            deckID: '',
            deckOfCards:[],
            gameLoading:true,
            newGame: false,
            matches: 0
            
        }

        this.onChangeMatches = this.onChangeMatches.bind(this);
        this.newGame = this.newGame.bind(this);
      }


    componentDidMount() {
        this.startGame();
     }


     generateDeck(){
         console.log('generateDeck')
         console.log(this.state.deckID)
         fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=52`)
            .then(response=>response.json())
            .then(card=>{
                this.setState({deckOfCards:card})
                this.setState({gameLoading: false})
            }).catch(err=>console.log(err));

        
     }

    startGame(){
        //create a new deck
        //get deck ID

        if(this.state.newGame){
            this.setState({
                deckOfCards:[],
                newGame:false
            })
        }
      
          
       fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(response => response.json())
            .then(data =>{          
                this.setState({
                    deckID: data.deck_id,
                   
                })
              
                this.generateDeck();
             }).catch(err=>console.log(err))
        
        //with the deck ID, we can get a new set of cards.
    
    }

    
    onCardSelect= (event) => {
        this.setState({cardsFlipped: event.target.value})

    }

    newGame(){
        this.setState({
            newGame:true,
            deckOfCards:[],
            gameLoading:true
        })
        
        this.startGame();
    }

    onChangeMatches(matched){
        console.log('on Change matches');
        console.log(matched);
        this.setState({
            matches:matched
        })
        
        
    }


    render(){

        
        
        return (this.state.gameLoading) ? 
        <h1 className="text-center"> Game is Loading </h1> : 
        (
            <div>
                
                <div className="text-center buttonContainer">
                <div className="matches">Current Score: {this.state.matches} </div>
                    <button className="text-center newGameButton" onClick={this.newGame} > New Game </button>
                   
                </div>
                <CardList onChangeMatches={this.onChangeMatches}  deckOfCards={this.state.deckOfCards} />
            </div>
            
        );
    }
}


export default Game;