import React, { Component } from 'react';
import  './cardList.css';
import Card from './card'



class CardList extends Component{

        constructor(props){
            super(props)
            this.onCardFlip = this.onCardFlip.bind(this);
            
            this.state = {
                matches:0,
                matched:false,
                cards: [],
                checkCards: null,
                cardSelected: false
               
            }
        }

        onCardFlip = (value,index) =>{

            if (this.state.cardSelected) {
                return;
              }

            let cards = this.state.cards;
            cards[index].facedown=false;
            this.setState({
                cards:cards,
                cardSelected:true
            })
            if(this.state.checkCards){
                if(value === this.state.checkCards.value){
                    setTimeout(()=>{
                        var matches = this.state.matches
                        cards[index].matched=true;
                        cards[this.state.checkCards.index].matched =true;
                    
                        this.setState({
                            cards,
                            checkCards: null,
                            matches:matches+1,
                            cardSelected:false
                        }, ()=>this.props.onChangeMatches(this.state.matches))
                    },500)
                }else {
                    setTimeout(()=>{
                        cards[index].facedown = true;
                        cards[this.state.checkCards.index].facedown=true;
                        this.setState({
                            cards,
                            checkCards:null,
                            cardSelected:false
                        })
                    }, 800)
                }

            } else {
                this.setState({
                    checkCards: {value,index},
                    cardSelected:false
                })
            }


        }

        checkResults(){

            if(this.state.count ===2 ){
                
                if(this.state.firstGuess === this.state.secondGuess){

                    this.setState({
                            
                            firstGuess:0,
                            secondGuess:0,
                            matched:true
                        
                    }, () => this.printState())
                }
                else{
                 
                    this.setState({
                        count:0,
                        firstGuess:0,
                        secondGuess:0,
                       
                        putFaceDown:true
                    }, () =>{
                        
                    })

                }
            }


        }




        printState(){
            console.log('firstGuess: '+this.state.firstGuess);
            console.log('1st Index: ' +this.state.firstIndex) 
            console.log('secondGuess: '+this.state.secondGuess);
            console.log('2nd Index: ' +this.state.secondIndex) 
            console.log('count '+this.state.count);
            console.log('this.state.matched: '+this.state.matched);
         
            
        }


        

        componentDidMount(){
            let newCards = this.props.deckOfCards.cards.map( x => {
                return {
                    ...x,
                    facedown:true,
                    matched:false
                }

            }) 

            this.setState({
                cards: newCards
            })
            
        }
        

        render(){

            let deckMap = []

            
            deckMap = this.state.cards.map( (data,index)=>{
              
                return (
                    <Card 
                        id = {index}
                        image= {data.image}
                        value ={data.value}
                        suit ={data.suit}
                        code = {data.code}
                        onCardFlip = {this.onCardFlip}
                        match = {data.matched}
                        //facedown = {this.state.putFaceDown}
                        faceDown = {data.facedown}
                        
                        
                    />
                )
            })  

            
            return(
                <div className="">
                    <div className="cardContainer">
                         {deckMap} 
                    </div>
                </div>      
            )
        }

}
export default CardList;

