import React, {Component} from 'react';
import './Mentor.css';
import {connect} from 'react-redux';
import {updateView, getQuestions} from '../../ducks/reducer';
import io from 'socket.io-client';

class Mentor extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
        
    }

    componentDidMount(){
        this.props.getQuestions()
    }

    changeView(view){
        this.props.updateView(view);
    }

    render(){
        return(
                <div>
                    <button onClick={() => this.changeView('middle')}>Back</button>
                    Mentor
                    <div>
                        {this.props.questions.map((e, i)=>{
                            return (<div key={i}>{e.name}<br />{e.question}</div>)
                        })}
                    </div>
                </div>
        )
    }
}

function mapStateToProps(state){
    return {
        questions: state.questions
    }
}

export default connect(mapStateToProps, {updateView, getQuestions})(Mentor)
