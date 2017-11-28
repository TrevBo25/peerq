import React, {Component} from 'react';
import './Starter.css';
import {connect} from 'react-redux';

class Starter extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
        
    }

    componentDidMount(){
    }

    render(){
        return(
                <div>
                    Starter Page
                </div>
        )
    }
}

function mapStateToProps(state){
    return {
        
    }
}

export default connect(mapStateToProps)(Starter)
