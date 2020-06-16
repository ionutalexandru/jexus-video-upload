import React, { useState, useEffect } from "react";
import "./App.css";
import styled, { keyframes } from "styled-components";

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
  position: sticky;
  bottom: 0;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.25));

  @media (max-width: 575.98px) {
    display: none;
  }
`;

const Main = styled.div`
  margin: 0 5%;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

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

const slideTop = keyframes`
  0% {
    transform: translateY(25px);
  }
  100% {
    transform: none;
  }
`;

const Message = styled.div`
  display: flex;
  justify-content: ${props =>
    props.type === "SENT" ? "flex-end" : "flex-start"};
  width: 100%;
  margin: 0.5em 0;

  span {
    max-width: 50%;
    animation: ${slideTop} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    border-radius: 5px;
    padding: 0.5em;
    font-size: 1.25em;
    color: black;
    background-color: ${props =>
      props.type === "SENT" ? "rgb(225, 255, 199)" : "white"};
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);

    @media (max-width: 575.98px) {
      max-width: 90%;
    }
  }
`;

const AnimatedConversationWrapper = styled.div`
  width: 100%;
  padding: 0 0.5em;
`;

const AnimatedConversation = ({ conversation, setAnimationEnded }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < conversation.length) {
      setTimeout(() => {
        setCurrentIndex(current => ++current);
        window.scrollTo(0, document.body.scrollHeight);
      }, 1500);
    } else {
      setCurrentIndex(conversation.length);
      setTimeout(() => {
        setAnimationEnded && setAnimationEnded(true);
        window.scrollTo(0, document.body.scrollHeight);
      }, 1500);
    }
  }, [currentIndex, conversation.length, setAnimationEnded]);

  return (
    <AnimatedConversationWrapper>
      {conversation.slice(0, currentIndex).map(({ type, text, id }) => (
        <Message key={`message-${id}`} type={type}>
          <span>{text}</span>
        </Message>
      ))}
    </AnimatedConversationWrapper>
  );
};

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
            <AnimatedConversation
              conversation={[
                { id: 1, type: "RECEIVED", text: "Guess who's here?" },
                { id: 2, type: "SENT", text: "Who?? 🤔" },
                { id: 3, type: "RECEIVED", text: "Ionut is here 😎" },
                { id: 4, type: "SENT", text: "What do you want from me? 😏" },
                {
                  id: 5,
                  type: "RECEIVED",
                  text: "As you may know, Jesús is getting..."
                },
                {
                  id: 6,
                  type: "RECEIVED",
                  text: "Really old..."
                },
                { id: 7, type: "RECEIVED", text: "He'll be 30 yo very soon" },
                { id: 8, type: "SENT", text: "🙀" },
                { id: 9, type: "RECEIVED", text: "HAHAHAH 😂" },
                {
                  id: 10,
                  type: "RECEIVED",
                  text:
                    "I want to prepare for him a big surprise. Are you curious? 😏"
                },
                { id: 11, type: "SENT", text: "YESSS!!! 😎" },
                {
                  id: 12,
                  type: "RECEIVED",
                  text:
                    "Coool! I want you to record a short video wishing him something"
                },
                {
                  id: 13,
                  type: "RECEIVED",
                  text:
                    'Maybe... "I loveee you!! Your the best and I wish you for the 30s to be more quiet" 😂'
                },
                {
                  id: 14,
                  type: "RECEIVED",
                  text:
                    "Whatever you want. 15-30s duration is enough. You can do it until June 23rd"
                },
                {
                  id: 15,
                  type: "RECEIVED",
                  text: "So take your phone, press REC and fill the next form."
                },
                { id: 16, type: "RECEIVED", text: "Thank you <3" }
              ]}
              setAnimationEnded={setAnimationEnded}
            />
          )}
          {formSent && (
            <AnimatedConversation
              conversation={[
                { type: "RECEIVED", text: "Thank youuuu! <3" },
                { type: "RECEIVED", text: "You're the best!!" }
              ]}
              setAnimationEnded={setAnimationEnded}
            />
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
