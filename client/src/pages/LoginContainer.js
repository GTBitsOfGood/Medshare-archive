
import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";


//actions here
//import

const mapDispatchAsProps = dispatch => {
    return {

    }
}

class LoginContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
        }

    }


    render(){
        return (
            <form>
                <span>nothing here yet</span>
            </form>
        )
    }
}

export default withRouter(connect(null, mapDispatchAsProps)(LoginContainer));