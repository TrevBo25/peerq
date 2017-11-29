import React, {Component} from 'react';
import './StudentForm.css';
import {connect} from 'react-redux';
import {updateView} from '../../ducks/reducer';
import axios from 'axios';

class StudentForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            question: ""
        }
        this.handleName = this.handleName.bind(this);
        this.handleQuestion = this.handleQuestion.bind(this);
        
    }

    componentDidMount(){

    }

    changeView(view){
        this.props.updateView(view);
    }

    handleName(e){
        this.setState({
            name: e
        })
    }

    handleQuestion(e){
        this.setState({
            question: e
        })
    }

    submit(){
        console.log('hit')
        axios.post('/api/addQuestion',{ name: this.state.name, question: this.state.question})
        .then(response => {
            console.log('successfully added question');
            this.props.changeView("waiting")
        })
    }

    render(){
        return(
                <div>
                    <button onClick={() => this.changeView('middle')}>Back</button>
                    StudentForm
                    <br />
                    {this.state.name}
                    <br />
                    {this.state.question}
                    <br />
                    <div>
                        <div>
                            <input placeholder="enter your name" onChange={(e) => this.handleName(e.target.value)}/>
                            <input placeholder="enter your question" onChange={(e) => this.handleQuestion(e.target.value)}/>
                            <button onClick={() => this.submit()} >Submit</button>
                        </div>
                    </div>
                </div>
        )
    }
}

function mapStateToProps(state){
    return {
    }
}

export default connect(mapStateToProps, {updateView})(StudentForm)
