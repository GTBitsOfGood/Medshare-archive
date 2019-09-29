
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
        color: white;
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

class Login extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        return (
            <Wrapper>
                <Title>Login</Title>
                <form autocomplete="off">
                    <Label>Email</Label>
                    <Input type="text" placeholder="Enter email addres" name="email" onChange={null} />
                    <Label>Password</Label>
                    <Input type="password" placeholder="Enter password" name="password" onChange={null}/>
                    <Button onClick={null}>Login</Button>
                    <Button onClick={null}>Don't have an account? Sign up here.</Button>
                </form>
            </Wrapper>
        )
    }
}

export default Login;