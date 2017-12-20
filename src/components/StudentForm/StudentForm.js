import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateView, updateName} from '../../ducks/reducer';
import axios from 'axios';
import socket from '../../socket'

class StudentForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            question: ""
        }
        this.handleName = this.handleName.bind(this);
        this.handleQuestion = this.handleQuestion.bind(this);
        
    }

    componentDidMount(){

    }

    changeView(view){
        socket.emit('leavestudent')
        this.props.updateView(view);
    }

    handleName(str){
        this.props.updateName(str)
    }

    handleQuestion(str){
        this.setState({
            question: str
        })
    }

    submit(){
        console.log('hit')
        axios.post('/api/addQuestion',{ name: this.props.name, question: this.state.question})
        .then(response => {
            console.log('successfully added question');
            this.props.changeView("waiting")
            socket.emit('question');
            this.props.updateName(this.state.name)
        })
    }

    render(){
        return(
                <div className='papasf'>
                    <button className="back" onClick={() => this.changeView('middle')}>Back</button>
                    <div className="inputsholder">
                        <h1 className="inputtitle">Who are you?</h1>
                        <input className="theinput" placeholder="enter your name" onChange={(e) => this.handleName(e.target.value)} value={this.props.name}/>
                        <h1 className="texttitle">What's the issue?</h1>
                        <textarea className="thetextarea" rows="4" cols="50" placeholder="enter your question" onChange={(e) => this.handleQuestion(e.target.value)}/>
                        <button className="thebutton" onClick={() => this.submit()} >Submit</button>
                    </div>
                </div>
        )
    }
}

function mapStateToProps(state){
    return {
        name: state.name
    }
}

export default connect(mapStateToProps, {updateView, updateName})(StudentForm)
