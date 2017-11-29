import React, {Component} from 'react';
import './StudentWaiting.css';
import {connect} from 'react-redux';
import {updateView} from '../../ducks/reducer';

class StudentWaiting extends Component{
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

    askAnother(newView){
        this.props.changeView(newView);
    }

    render(){
        return(
                <div>
                    <button onClick={() => this.changeView('middle')}>Back</button>
                    StudentWaiting
                    <button onClick={() => {this.askAnother("form")}}>Ask another question</button>
                </div>
        )
    }
}

function mapStateToProps(state){
    return {
    }
}

export default connect(mapStateToProps, {updateView})(StudentWaiting)
