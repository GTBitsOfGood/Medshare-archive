
import React from "react";
import styled from "styled-components";


const Wrapper = styled.section`
        margin: 4em auto;
        padding-bottom: 1em;
        text-align: center;
        width: 500px;
        border: solid;
        border-color: #a8e1f7;
        border-radius: 60px;
    `;

const Title = styled.h1`
        color: #4287f5;
    `;

const Input = styled.input`
        display: block;
        margin: 7px auto;
        width: 60%;
        background-color: #bdd8f2;
        border: none;
        border-radius: 5px;
        color: black;
        padding: 2px 5px;
        text-decoration: none;
        &:focus {
            outline: none;
            box-shadow: 0px 0px 5px #0066ff;
        }
    `;

const Label = styled.label`
        display: block;
        color: #427bf5;
    `;

const Button = styled.button`
        display: inline-block;
        background-color: #4CAF50;
        border: none;
        border-radius: 5px;
        color: white;
        padding: 16px 32px;
        text-decoration: none;
        margin: 4px 2px;
        cursor: pointer;
    `;

class Signup extends React.Component{

    render(){
        return (
            <Wrapper>
                <Title>Sign Up</Title>
                <form autoComplete="off">
                        <Label>Email</Label>
                        <Input type="text" placeholder="Enter email address" name="email" onChange={this.props.handleInputChange} />
                        <Label>Username</Label>
                        <Input type="text" placeholder="Enter username" name="username" onChange={this.props.handleInputChange} />
                        <Label>Password</Label>
                        <Input type="password" placeholder="Enter password" name="password" onChange={this.props.handleInputChange}/>
                        <Label>Confirm Password</Label>
                        <Input id="confirmPassword" type="password" placeholder="Confirm your password" name="confirmPassword" onChange={this.props.handleInputChange}/>
                    <Button onClick={this.props.handleSubmit}>Sign Up</Button>
                    <Button onClick={_ => {
                        this.props.switchComponent("Login");
                    }}>Have an account already? Sign in here.</Button>
                </form>
            </Wrapper>
        )
    }
}

export default Signup;