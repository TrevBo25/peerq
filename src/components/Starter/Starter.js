import React, {Component} from 'react';
import './Starter.css';
import {connect} from 'react-redux';
import Student from '../Student/Student';
import Mentor from '../Mentor/Mentor';
import {updateView} from '../../ducks/reducer';

class Starter extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
        
    }

    componentDidMount(){

    }

    changeView(view){
        this.props.updateView(view);
    }

//     <div>
    //     {this.props.view === "middle" ? <div>
    //         <button onClick={() => this.changeView('student')}>Student</button>
    //         <button onClick={() => this.changeView('mentor')}>Mentor</button>
    //     </div> : (this.props.view === "student" ? <Student /> : <Mentor />)}
//     </div>


    render(){
        return(
                <div className="papa">
                    <div className="hero">
                        <h1 className="title">Welcome to the PeerQ</h1>
                    </div>
                </div>
        )
    }
}

function mapStateToProps(state){
    return {
        view: state.view
    }
}

export default connect(mapStateToProps, {updateView})(Starter)
