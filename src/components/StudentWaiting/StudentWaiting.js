import React, {Component} from 'react';
import './StudentWaiting.css';
import {connect} from 'react-redux';
import {updateView} from '../../ducks/reducer';
import socket from '../../socket';

class StudentWaiting extends Component{
    constructor(props){
        super(props)
        this.state = {
            sName: 't'
        }

        
    }

    componentDidMount(){
        socket.on('helped', (name) => {
            this.helping(name)
        })
        socket.on('doneyo', (name) => {
            this.changeView2('form', name)
        })
    }

    changeView(view){
        this.props.updateView(view);
    }

    changeView2(view, name){
        if(this.props.studentName === name){
            this.props.changeView(view);
        }
    }

    askAnother(newView){
        this.props.changeView(newView);
    }

    helping(name){
        this.setState({
            sName: name
        })
    }

    render(){
        return(
                <div>
                    <button onClick={() => this.changeView('middle')}>Back</button>
                    <p>StudentWaiting</p>
                    {this.props.studentName === this.state.sName ? <p>Mentor on the way</p> : <p>Please wait</p>}
                    <button onClick={() => {this.askAnother("form")}}>Ask another question</button>
                </div>
        )
    }
}

function mapStateToProps(state){
    return {
        studentName: state.studentName
    }
}

export default connect(mapStateToProps, {updateView})(StudentWaiting)
