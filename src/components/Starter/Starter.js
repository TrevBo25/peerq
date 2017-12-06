import React, {Component} from 'react';
import {connect} from 'react-redux';
import Student from '../Student/Student';
import Mentor from '../Mentor/Mentor';
import {updateView, updateName} from '../../ducks/reducer';
import { setTimeout } from 'core-js/library/web/timers';

class Starter extends Component{
    constructor(props){
        super(props)
        this.state = {
            alert: false
        }
        this.changeView = this.changeView.bind(this);
    }

    componentDidMount(){

    }

    changeView(view){
        if(this.props.name){
            this.props.updateView(view);
        } else {
            this.setState({
                alert: true
            })
            setTimeout(() => {
                this.setState({
                    alert: false
                })
            }, 400)
        }
    }

    handleInput(str){
        this.props.updateName(str)
    }



    render(){
        return(
                <div className="papa">
                {this.props.view === "middle" ?
                    <div className="hero">
                        <h1 className="title">Welcome to the PeerQ</h1>
                        <div className="buttonholder">
                            <button className="leftbutton" onClick={() => this.changeView('student')} >Student</button>
                            {this.state.alert ? <input className="nameinputa" placeholder="Enter your name" onChange={(e) => this.handleInput(e.target.value)} value={this.props.name}/> : <input className="nameinput" placeholder="Enter your name" onChange={(e) => this.handleInput(e.target.value)} value={this.props.name}/>}
                            <button className="rightbutton" onClick={() => this.changeView('mentor')} >Mentor</button>
                        </div>
                    </div>
                    
                : (this.props.view === "student" ? <Student /> : <Mentor />)
                }
                </div>
        )
    }
}

function mapStateToProps(state){
    return {
        view: state.view,
        name: state.name
    }
}

export default connect(mapStateToProps, {updateView, updateName})(Starter)
