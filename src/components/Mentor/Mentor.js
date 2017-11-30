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

    helpQ(id, name){
        axios.post('/api/help', {id: id})
        .then(response => {
            socket.emit('question');
            socket.emit('helper', name);
        }).catch( err => console.log(err))
    }

    removeQ(id, name){
        axios.post('/api/remove', {id:id})
        .then( response => {
            socket.emit('question');
            socket.emit('donezo', name);
        }).catch( err => console.log(err))
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
                                    <button onClick={() => this.helpQ(e.id, e.name)}>Help</button>
                                    <button onClick={() => this.removeQ(e.id, e.name)}>Remove</button>
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
