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
  display: flex;
  justify-content: space-between;
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

const Language = styled.div`
  font-weight: 400;
  margin: 0;
  font-size: 1.5em;
  color: #000000;
  text-transform: uppercase;
  cursor: pointer;
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
  margin-bottom: 5%;
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

const getTranslatedText = (text, language) => {
  if (typeof text === "object") {
    return text[language];
  }
  return text;
};

const AnimatedConversationWrapper = styled.div`
  width: 100%;
  padding: 0 0.5em;
`;

const AnimatedConversation = ({
  conversation,
  setAnimationEnded,
  language
}) => {
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
          <span>{getTranslatedText(text, language)}</span>
        </Message>
      ))}
    </AnimatedConversationWrapper>
  );
};

const LANGUAGES = ["en", "es"];

function App() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const browserLanguage = window.navigator.language.slice(0, 2);
    if (LANGUAGES.includes(browserLanguage)) {
      setLanguage(browserLanguage);
    }
  }, []);

  const [animationHasEnded, setAnimationEnded] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
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
        <Logo>
          {getTranslatedText(
            { en: "A wish for Jesús", es: "Un deseo para Jesús" },
            language
          )}
        </Logo>
        <Language
          onClick={() =>
            language === "en" ? setLanguage("es") : setLanguage("en")
          }
        >
          {language}
        </Language>
      </Header>
      <Container>
        <JesusPhoto src={`${process.env.PUBLIC_URL}/jesus.png`} alt="Jesus" />
        <Main>
          {!formSent && (
            <AnimatedConversation
              language={language}
              conversation={[
                {
                  id: 1,
                  type: "RECEIVED",
                  text: {
                    en: "Guess who's here",
                    es: "Adivina quién está aquí"
                  }
                },
                {
                  id: 2,
                  type: "SENT",
                  text: { en: "Who?? 🤔", es: "Quién?? 🤔" }
                },
                {
                  id: 3,
                  type: "RECEIVED",
                  text: { en: "Ionut is here 😎", es: "Ionut está aquí 😎" }
                },
                {
                  id: 4,
                  type: "SENT",
                  text: {
                    en: "What do you want from me? 😏",
                    es: "Qué quieres de mí? 😏"
                  }
                },
                {
                  id: 5,
                  type: "RECEIVED",
                  text: {
                    en: "As you may know, Jesús is getting...",
                    es: "Como sabrás, Jesús está..."
                  }
                },
                {
                  id: 6,
                  type: "RECEIVED",
                  text: { en: "Really old...", es: "Envejeciendo mucho..." }
                },
                {
                  id: 7,
                  type: "RECEIVED",
                  text: {
                    en: "He'll be 30 yo very soon",
                    es: "Tendrá 30 muy pronto"
                  }
                },
                { id: 8, type: "SENT", text: "🙀" },
                {
                  id: 9,
                  type: "RECEIVED",
                  text: { en: "HAHAHAH 😂", es: "JAJAJAJA 😂" }
                },
                {
                  id: 10,
                  type: "RECEIVED",
                  text: {
                    en:
                      "I want to prepare for him a big surprise. Are you curious? 😏",
                    es:
                      "Quiero prepararle una gran sorpresa. Tienes curiosidad? 😏"
                  }
                },
                {
                  id: 11,
                  type: "SENT",
                  text: { en: "YESSS!!! 😎", es: "SÍÍÍÍ!!! 😎" }
                },
                {
                  id: 12,
                  type: "RECEIVED",
                  text: {
                    en:
                      "Coool! I want you to record a short video wishing him something",
                    es:
                      "Genial! Quiero que grabes un pequeño vídeo deseándole algo"
                  }
                },
                {
                  id: 13,
                  type: "RECEIVED",
                  text: {
                    en:
                      'Maybe... "I loveee you!! You\'re the best and I wish you for the 30s to be more quiet" 😂',
                    es:
                      'Quizás... "Te quierooo!! Eres el mejor y deseo que para los 30 seas más calladito" 😂'
                  }
                },
                {
                  id: 14,
                  type: "RECEIVED",
                  text: {
                    en:
                      "Whatever you want. 15-30s duration is enough. You can do it until June 23rd",
                    es:
                      "Lo que quieras. 15-30s de duración es suficiente. Puedes hacerlo antes del 23 de junio"
                  }
                },
                {
                  id: 15,
                  type: "RECEIVED",
                  text: {
                    en: "So take your phone, press REC and fill the next form.",
                    es:
                      "Por lo que, coge tu móvil, pulsa REC y rellena el siguiente formulario."
                  }
                },
                {
                  id: 16,
                  type: "RECEIVED",
                  text: { en: "Thank you <3", es: "Muchas gracias <3" }
                }
              ]}
              setAnimationEnded={setAnimationEnded}
            />
          )}
          {formSent && (
            <AnimatedConversation
              language={language}
              conversation={[
                {
                  type: "RECEIVED",
                  text: { en: "Thank you <3", es: "Muchas gracias <3" }
                },
                {
                  type: "RECEIVED",
                  text: {
                    en: "You are the best!!! ",
                    es: "Eres el/la mejor!!!"
                  }
                }
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
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder={getTranslatedText(
                      {
                        en: "Name",
                        es: "Nombre"
                      },
                      language
                    )}
                  />
                </FormControl>
                <FormControl>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="comment"
                    value={formData.comment}
                    placeholder={getTranslatedText(
                      {
                        en: "Comment",
                        es: "Commentario"
                      },
                      language
                    )}
                  />
                </FormControl>
                <FormControl>
                  <input type="file" />
                </FormControl>
                <FormControl>
                  <button className="" type="submit">
                    {getTranslatedText(
                      {
                        en: "Send your wish",
                        es: "Envíale tu deseo"
                      },
                      language
                    )}
                  </button>
                </FormControl>
                <Instructions>
                  {getTranslatedText(
                    {
                      en:
                        "Submit a short video with a duration of 15-30s in common video format. You can re-submit it, just let me know which version I should use.",
                      es:
                        "Envía tu pequeño vídeo de 15-30s en un formato común de vídeo. Puedes volver a subirlo cuando quieras, sólo dime cuál usar."
                    },
                    language
                  )}
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
