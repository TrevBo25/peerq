import React, {Component} from 'react';
import './Mentor.css';
import {connect} from 'react-redux';
import {updateView, getQuestions} from '../../ducks/reducer';
import io from 'socket.io-client';
import socket from '../../socket';
import axios from 'axios';

class Mentor extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
        
    }

    componentDidMount(){
        this.props.getQuestions()
        socket.on('render', this.props.getQuestions)
    }

    changeView(view){
        this.props.updateView(view);
    }

    helpQ(id){
        axios.post('/api/help', {id: id})
        .then(response => {
            socket.emit('question');
        }).catch( err => console.log(err))
        console.log('hi');
    }

    removeQ(id){
        axios.post('/api/remove', {id:id})
        .then( response => {
            socket.emit('question');
        }).catch( err => console.log(err))
        console.log('hihi');
    }

    render(){
        return(
                <div>
                    <button onClick={() => this.changeView('middle')}>Back</button>
                    Mentor
                    <div>
                        {this.props.questions.map((e, i)=>{
                            return (<div key={i}>
                                <br/><br/><br/><br/>{e.name}<br/><br/>{e.question}<br/><br/>{e.status}<br/><br/>
                                <div>
                                    <button onClick={() => this.helpQ(e.id)}>Help</button>
                                    <button onClick={() => this.removeQ(e.id)}>Remove</button>
                                </div>
                            </div>)
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
