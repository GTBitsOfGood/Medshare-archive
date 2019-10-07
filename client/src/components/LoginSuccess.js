import React from 'react';
import styled from 'styled-components';

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

const LoginSuccess = () => {
  return (
    <Wrapper>
      <Title> Login Success! </Title>
    </Wrapper>
  );
};

export default LoginSuccess;
