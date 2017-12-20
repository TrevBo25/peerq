import React, {Component} from 'react';				
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
            console.log('object');	
            console.log(name);
            this.helping(name)		
        })		
        socket.on('doneyo', (name) => {	
            console.log(name);	
            this.changeView2('form', name)		
        })		
    }		
		
    changeView(view){	
        socket.emit('leavestudent')	
        this.props.updateView(view);		
    }		
		
    changeView2(view, name){		
        if(this.state.name === name){		
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
                <div className='papasw'>		
                    <button className="back" onClick={() => this.changeView('middle')}>Back</button>			
                    {this.props.name === this.state.sName ? <p className="swwords" >Mentor on the way</p> : <p className="swwords linear-wipe" >Please wait for the next available mentor</p>}		
                    <button className="swbutton" onClick={() => {this.askAnother("form")}}>Got another question?</button>		
                </div>		
        )		
    }		
}		
		
function mapStateToProps(state){		
    return {		
        name: state.name		
    }		
}		
		
export default connect(mapStateToProps, {updateView})(StudentWaiting)