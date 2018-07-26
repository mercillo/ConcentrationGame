import React, { Component } from 'react';
import  './card.css';

class Card extends Component {

    constructor(props){
        super(props)
        this.onClickFlip = this.onClickFlip.bind(this);
        
        this.state = {
   
            faceDown: true,
            match: false
        }

    }



    onClickFlip = (event) =>{
        this.setState({
            faceDown: !this.props.faceDown,
          }, ()=> this.props.onCardFlip(this.props.value,this.props.id))


    }


    render(){
    
        return(
            <div className="cardTile">
                {this.props.match ? 
                    (<div className="back"><img className="cardImage img-responsive" id={this.props.id} value={this.props.value} src="../assets/matched2.png" /></div>) 
                    :
                   (this.props.faceDown ? 
                    (<div className="back" onClick={this.onClickFlip} ><img className="cardImage  img-responsive" id={this.props.id} value={this.props.value} src="../assets/playing-card-back.png" /></div>)
                    :
                    (<div className="front"><img className="cardImage  img-responsive" value={this.props.value}  src={this.props.image} /></div>)) 
                }

                

            </div>
        )
    }
}

export default Card