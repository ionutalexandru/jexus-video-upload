import React, { useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";

const Body = styled.div`
  min-height: 100vh;
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
  flex-wrap: wrap;
`;

const JesusPhoto = styled.img`
  width: 25%;
  height: auto;
  display: flex;
  align-self: flex-end;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.25));

  @media (max-width: 575.98px) {
    width: 100%;
  }
`;

const Main = styled.div`
  margin: 0 5%;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const AnimatedTypewritterStyle = styled.div`
  font-weight: 400;
  font-size: 1.5em;
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

  @media (max-width: 575.98px) {
    width: 100%;
  }
`;

const FormControl = styled.div`
  width: 100%;
  margin: 1em 0;

  input,
  button[type="submit"] {
    color: black;
    padding: 0.5em;
    font-size: 15px;
    font-family: inherit;
    border: 1px solid white;
    border-radius: 5px;
    text-align: left;
    background-color: white;
  }

  input {
    width: 100%;
  }
`;

const Instructions = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  font-size: 15px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`;

function App() {
  const [animationHasEnded, setAnimationEnded] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    comment: ""
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
              {`Heeey! Ionut here ;). Jesús is getting old. To be exactly, he'll be 30 very soon... 
              
              Due to the importance of this event... I had an idea and I want you to be IN. 😎
              
              I'd like you to be part of the celebration 🎉, of the new chapter of his life. 
              
              What do you have to do? Submit your wish (a mini-clip) until next June 23rd.`}
            </AnimatedTypewritter>
          )}
          {formSent && (
            <AnimatedTypewritter setAnimationEnded={setAnimationEnded}>
              {`Thank you <3`}
            </AnimatedTypewritter>
          )}
          {animationHasEnded && !formSent && (
            <>
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
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="comment"
                    value={formData.comment}
                    placeholder="Enter a comment"
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
                <Instructions>
                  Submit a short video with a duration of 15-30s in common video
                  format. You can re-submit it, just let me know which version I
                  should use.
                </Instructions>
              </FormWrapper>
            </>
          )}
        </Main>
      </Container>
    </Body>
  );
}

export default App;
