import React, {Component} from 'react';
import './Mentor.css';
import {connect} from 'react-redux';
import {updateView} from '../../ducks/reducer';

class Mentor extends Component{
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

    render(){
        return(
                <div>
                    <button onClick={() => this.changeView('middle')}>Back</button>
                    Mentor
                </div>
        )
    }
}

function mapStateToProps(state){
    return {
    }
}

export default connect(mapStateToProps, {updateView})(Mentor)
