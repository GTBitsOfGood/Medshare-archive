
import React from "react";


class Signup extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        return (
            <div>
                <h1>Sign Up</h1>
                <form>
                        <label>Email</label>
                        <input type="text" placeholder="Enter email addres" name="email" onChange={null} />
                        <label>Username</label>
                        <input type="text" placeholder="Enter username" name="userName" onChange={null} />
                        <label>Password</label>
                        <input type="password" placeholder="Enter password" name="password" onChange={this.handleInputs}/>
                        <label>Confirm Password</label>
                        <input id="confirmPassword" type="password" placeholder="Confirm your password" name="confirmPassword" onChange={null}/>
                    <button onClick={null}>Sign Up</button>
                    <button onClick={null}>Have an account already? Sign in here.</button>
                </form>
            </div>
        )
    }
}

export default Signup;