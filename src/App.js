import React, { useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";

const Body = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  padding: 1.5em;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0px 7px 11px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
`;

const Logo = styled.h1`
  font-weight: 400;
  margin: 0;
  font-size: 1.5em;
  color: #000000;

  &::after {
    content: ".";
    font-weight: 800;
    letter-spacing: -2px;
  }
`;

const Container = styled.div`
  flex: 1;
  padding-top: 2em;
  display: flex;
  flex-direction: row;
`;

const JesusPhoto = styled.img`
  width: 25%;
  height: auto;
  display: flex;
  align-self: flex-end;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.25));
`;

const Main = styled.div`
  display: flex;
  flex: 1;
  padding: 0 1em;
  flex-direction: column;
`;

const AnimatedTypewritterStyle = styled.div`
  font-weight: 400;
  font-size: 2em;
  white-space: pre-line;
`;

const AnimatedTypewritter = ({ children, setAnimationEnded = undefined }) => {
  const [charEnd, setCharEnd] = useState(0);

  useEffect(() => {
    if (charEnd < children.length) {
      setTimeout(() => setCharEnd(current => ++current), 50);
    } else {
      setCharEnd(children.length);
      setAnimationEnded && setAnimationEnded(true);
    }
  }, [charEnd, children.length, setAnimationEnded]);

  return (
    <AnimatedTypewritterStyle>
      {children.slice(0, charEnd)}
    </AnimatedTypewritterStyle>
  );
};

const FormWrapper = styled.form`
  margin-top: 2em;
  width: 50%;
`;

const FormControl = styled.div`
  width: 100%;
  margin: 1em 0;

  input,
  button[type="submit"] {
    color: black;
    padding: 0.5em;
    font-size: 18px;
    font-family: inherit;
    border: 2px solid white;
    border-radius: 5px;
    text-align: left;
    background-color: white;
  }

  input {
    width: 100%;
  }
`;

function App() {
  const [animationHasEnded, setAnimationEnded] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: ""
  });

  const onSubmit = e => {
    e.preventDefault();
    console.log(e);
    setFormSent(true);
  };

  const handleInputChange = e => {
    const target = e.target;
    const { name, value } = target;
    setFormData(currentFormData => ({ ...currentFormData, [name]: value }));
  };

  return (
    <Body>
      <Header>
        <Logo>A wish for Jesús</Logo>
      </Header>
      <Container>
        <JesusPhoto src={`${process.env.PUBLIC_URL}/jesus.png`} alt="Jesus" />
        <Main>
          {!formSent && (
            <AnimatedTypewritter setAnimationEnded={setAnimationEnded}>
              {`Hey, there. It's my 30s birthday.

          Would you like to contribute to it?
          
          If yes, send me your wish in a mini-clip.`}
            </AnimatedTypewritter>
          )}
          {formSent && (
            <AnimatedTypewritter setAnimationEnded={setAnimationEnded}>
              {`Thank you <3`}
            </AnimatedTypewritter>
          )}
          {animationHasEnded && !formSent && (
            <FormWrapper onSubmit={onSubmit}>
              <FormControl>
                <input
                  onChange={handleInputChange}
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter your email"
                />
              </FormControl>
              <FormControl>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormControl>
                <input type="file" />
              </FormControl>
              <FormControl>
                <button className="" type="submit">
                  Send your wish
                </button>
              </FormControl>
            </FormWrapper>
          )}
        </Main>
      </Container>
    </Body>
  );
}

export default App;
