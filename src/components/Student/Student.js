import React, {Component} from 'react';
import {connect} from 'react-redux';
import StudentForm from '../StudentForm/StudentForm';
import StudentWaiting from '../StudentWaiting/StudentWaiting';

class Student extends Component{
    constructor(props){
        super(props)
        this.state = {
           view: "form",
           name: ""
        }

        this.changeView = this.changeView.bind(this);
    
    }

    componentDidMount(){

    }

    changeView(newView){
        this.setState({
            view: newView
        });
    }

    

    render(){
        return(
                <div className="bigboy">
                    {this.state.view === "form" ? <StudentForm changeView={this.changeView} /> : <StudentWaiting changeView={this.changeView} />}
                </div>
        )
    }
}

function mapStateToProps(state){
    return {
    }
}

export default connect(mapStateToProps)(Student)
