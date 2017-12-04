import React, {Component} from 'react';
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
                <div className="papam">
                    <button className="back" onClick={() => this.changeView('middle')}>{"<-- Back"}</button>
                    <div className="questionsholder">
                    <h1 className="qtitle">Question Q</h1>
                        {this.props.questions.map((e, i)=>{
                        return (<div key={i} className="questionitself">
                                    <div className="nameholder"><h1 className="name">{e.name}</h1></div>
                                    <div className="qholder"><h1 className="q">{e.question}</h1></div>
                                    {e.mentor == null ? <div className="mnameholder"><h1 className="mname">Trevor</h1></div> : null}
                                    <div className="bqholder">
                                    {e.status === "waiting" ? <button className="helpbutton" onClick={() => this.helpQ(e.id, e.name)}>Help</button> : null}
                                        <button className="removebutton" onClick={() => this.removeQ(e.id, e.name)}>Remove</button>
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
