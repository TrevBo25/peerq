import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateView, getQuestions, getScores, getUserScore} from '../../ducks/reducer';
import socket from '../../socket';
import axios from 'axios';

class Mentor extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
        this.runOnRender = this.runOnRender.bind(this)
        
    }

    componentDidMount(){
        this.props.getQuestions();
        this.props.getScores();
        this.props.getUserScore(this.props.name);

        socket.on('render', this.runOnRender);
    }

    changeView(view){
        this.props.updateView(view);
    }

    runOnRender(){
        this.props.getQuestions();
        this.props.getScores();
        this.props.getUserScore(this.props.name);
    }

    helpQ(id, name){
        axios.post('/api/help', {id: id, mname: this.props.name})
        .then(response => {
            socket.emit('question');
            socket.emit('helper', name);
            console.log(name);
        }).catch( err => console.log(err, 'help q'))
        // this.props.updateScore(this.props.score + 1)
        this.updateScore(this.props.name)
    }

    removeQ(id, name){
        axios.post('/api/remove', {id:id})
        .then( response => {
            socket.emit('question');
            socket.emit('donezo', name);
            console.log(name);
        }).catch( err => console.log(err, 'remove q'))
    }

    updateScore(name){
        axios.post('/api/updatescore', {name:name})
        .then(response => {
            console.log(response);
            socket.emit('question');
        }).catch(err => console.log(err, 'update score'))
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
                                    {e.mentor !== null ? <div className="mnameholder"><h1 className="mname">{e.mentor}</h1></div> : null}
                                    <div className="bqholder">
                                    {e.status === "waiting" ? <button className="helpbutton" onClick={() => this.helpQ(e.id, e.name)}>Help</button> : null}
                                        <button className="removebutton" onClick={() => this.removeQ(e.id, e.name)}>Remove</button>
                                    </div>
                                </div>)
                        })}
                    </div>
                    <div className="rightsideholder">
                        <div className="hstopholder">
                            <div className="hsnameholder">
                                <h1 className="hstitle">NAME</h1>
                                <h1 className="hsword">{this.props.name.toUpperCase()}</h1>
                            </div>
                            <div className="hsnameholder">
                                <h1 className="hstitle">SCORE</h1>
                                <h1 className="hsword">{this.props.score !== 0 ? `${this.props.score}000` : "0"}</h1>
                            </div>
                        </div>
                        <div className="hslistholder">
                            <h1 className="highscore">HIGHSCORES</h1>
                            <div className="highscorelist">
                                <div className="hstitles">
                                    <h1 className="hstitle">RANK</h1>
                                    <h1 className="hstitle">NAME</h1>
                                    <h1 className="hstitle">SCORE</h1>
                                </div>
                                {this.props.highscores.map((e,i) => {
                                return  (<div key={i} className="actualhighscore">
                                            <h1 className={i === 0 ? "hsword1":"hsword"}>{i + 1}</h1>
                                            <h1 className={i === 0 ? "hsword1":"hsword"}>{e.name}</h1>
                                            <h1 className={i === 0 ? "hsword1s":"hswords"}>{e.score}000</h1>
                                        </div>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

function mapStateToProps(state){
    return {
        questions: state.questions,
        name: state.name,
        score: state.score,
        highscores: state.highscores
    }
}

export default connect(mapStateToProps, {updateView, getQuestions, getScores, getUserScore})(Mentor)
