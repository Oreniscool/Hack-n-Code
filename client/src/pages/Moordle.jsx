import React, { useState, useEffect, useRef } from 'react';
import '../styles/Moordle.css';

const DEFAULT_LANGUAGE = "enGB";

const LITERALS = {
  se: {
    flag: "🇸🇪",
    keys: `qwertyuiopåasdfghjklöä⌫zxcvbnm⏎`,
    "word-not-found": "finns inte i ordlistan",
    won: "Bra jobbat! Klicka för att dela 📋",
    lost: "Bättre lycka imorn!",
    copied: "Kopierat och redo att dela! 📋",
    guess: "Gissning",
  },
  enGB: {
    flag: "🇬🇧",
    keys: `qwertyuiopasdfghjklzxcvbnm⌫⏎`,
    "word-not-found": "is not in the dictionary",
    won: "Good work! Click to share 📋",
    lost: "Better luck tomorrow!",
    copied: "Copied and ready to share! 📋",
    guess: "Guess",
  },
  enUS: {
    flag: "🇺🇸",
    keys: `qwertyuiopasdfghjklzxcvbnm⌫⏎`,
    "word-not-found": "is not in the dictionary",
    won: "Good work! Click to share 📋",
    lost: "Better luck tomorrow!",
    copied: "Copied and ready to share! 📋",
    guess: "Guess",
  },
  es: {
    flag: "🇪🇸",
    keys: `qwertyuiopasdfghjklñzxcvbnmáéíóú⌫⏎`,
    "word-not-found": "no está en el diccionario",
    won: "¡Buen trabajo! Haz click para compartir 📋",
    lost: "¡Mucha suerte para mañana!",
    copied: "¡Copiado y listo para compartir! 📋",
    guess: "Conjetura",
  },
};
function useWords(currentLanguage) {
    const [words, setWords] = useState({});
    useEffect(() => {
      import(`./words-${currentLanguage}.json`).then((m) =>
        setWords({
          [currentLanguage]: m.default,
        })
      );
    }, [currentLanguage]);

  const answerIndex = getAnswerIndex();

  return {
    answer: (words[currentLanguage] || [])[answerIndex] || "",
    answerIndex,
    isGuessValid: (guess) => (words[currentLanguage] || []).includes(guess),
  };
}

function useSavedGuesses(answer, currentLanguage) {
  const [guesses, setGuesses] = useState([""]);

  const setSavedGuesses = (f) => {
    setGuesses((oldGuesses) => {
      const newGuesses = f(oldGuesses);
      localStorage.setItem(
        `${currentLanguage}-${answer}`,
        JSON.stringify(newGuesses)
      );
      return newGuesses;
    });
  };

  useEffect(() => {
    const loadGuesses = () =>
      setGuesses(
        JSON.parse(localStorage.getItem(`${currentLanguage}-${answer}`)) || [""]
      );
    loadGuesses();
    window.addEventListener("storage", loadGuesses);
    window.addEventListener("visibilitychange", loadGuesses);
    return () => {
      window.removeEventListener("storage", loadGuesses);
      window.removeEventListener("visibilitychange", loadGuesses);
    };
  }, [answer]);

  return [guesses, setSavedGuesses];
}

function useSavedLanguage() {
  const [currentLang, setCurrentLang] = useState(DEFAULT_LANGUAGE);

  const setCurrentLanguage = (newLanguage) => {
    setCurrentLang(() => {
      localStorage.setItem("language", newLanguage);
      return newLanguage;
    });
  };

  useEffect(() => {
    const loadCurrentLanguage = () =>
      setCurrentLang(localStorage.getItem("language") || DEFAULT_LANGUAGE);
    loadCurrentLanguage();
    window.addEventListener("storage", loadCurrentLanguage);
    window.addEventListener("visibilitychange", loadCurrentLanguage);
    return () => {
      window.removeEventListener("storage", loadCurrentLanguage);
      window.removeEventListener("visibilitychange", loadCurrentLanguage);
    };
  });

  return [currentLang, setCurrentLanguage];
}

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const NUM_ANSWERS = 365;
const getAnswerIndex = () =>
  Math.floor(
    (Date.now() - new Date(2022, 0, 23, 0, 0, 0).getTime()) / 86400e3
  ) % NUM_ANSWERS;

function Moordle() {
  const inputRef = useRef();
  const [currentLanguage, setCurrentLanguage] = useSavedLanguage();
  const { answer, answerIndex, isGuessValid } = useWords(currentLanguage);
  const [guesses, setGuesses] = useSavedGuesses(answer, currentLanguage);
  const [message, setMessage] = useState("");
  const [help, setHelp] = useState(false);
  const isCorrect = guesses[guesses.length - 2] === answer;
  const isDone = isCorrect || guesses.length === MAX_GUESSES + 1;

  const validCharactersRegex = new RegExp(
    `[^${Array.from(LITERALS[currentLanguage].keys)
      .filter((key) => !"⌫⏎".includes(key))
      .join("")}]`,
    "gi"
  );

  const onInput = (event) =>
    !isDone &&
    setGuesses((oldGuesses) => [
      ...oldGuesses.slice(0, -1),
      event.target.value.replace(validCharactersRegex, "").toLowerCase(),
    ]);

  const onSubmit = (event) => {
    event?.preventDefault();
    const guess = guesses[guesses.length - 1];
    if (isDone || guess.length !== WORD_LENGTH) return;
    if (isGuessValid(guess)) {
      setGuesses((oldGuesses) => [...oldGuesses, ""]);
    } else
      setMessage(`"${guess}" ${LITERALS[currentLanguage]["word-not-found"]}`);
  };

  const onLanguageChange = (event) =>
    setCurrentLanguage(event.target.dataset.id);

  useEffect(() => {
    inputRef.current.selectionStart = WORD_LENGTH;

    setMessage(
      guesses[guesses.length - 2] === answer
        ? `${LITERALS[currentLanguage]["won"]}`
        : guesses.length === MAX_GUESSES + 1
        ? `${LITERALS[currentLanguage]["lost"]}`
        : ""
    );
  }, [answer, guesses]);

  const matrix = Array.from({ length: MAX_GUESSES }, (_, guessIndex) => {
    const guess = guesses[guessIndex];
    const isSubmitted = guessIndex < guesses.length - 1;
    const isActive = guessIndex === guesses.length - 1;
    const somewhereLetters = answer
      .split("")
      .filter((l, i) => l && l !== guess?.[i]);

    const states = Array.from({ length: WORD_LENGTH }, (_, letterIndex) => {
      const letter = guess?.[letterIndex];
      const isCorrect = letter && letter === answer[letterIndex];
      if (isCorrect) return "🟩";

      const somewhereLetterIndex = somewhereLetters.indexOf(letter);
      if (somewhereLetterIndex !== -1) {
        somewhereLetters.splice(somewhereLetterIndex, 1);
        return "🟨";
      }
      return "⬛";
    });

    return { guess, states, isSubmitted, isActive };
  });


  function Keyboard({
    onInput,
    onSubmit,
    guesses,
    isDone,
    matrix,
    currentLanguage,
  }) {
    const keys = `${LITERALS[currentLanguage]["keys"]}`.split("");
    const classByKey = matrix
      .slice(0, guesses.length - 1)
      .reduce((acc, { guess, states = [] }) => {
        states.forEach((state, index) => {
          const letter = guess?.[index];
          if (state === "🟩" || acc[letter] === "🟩") acc[letter] = "🟩";
          else if (state === "🟨" && acc[letter] !== "🟩") acc[letter] = "🟨";
          else if (state === "⬛" && acc[letter] !== "🟨") acc[letter] = "⬛";
        });
        return acc;
      }, {});
  
   }
  

  return (
    <label className="app" htmlFor="guess-input">
      <header>
        <svg viewBox="0 0 24 24" role="button" onClick={() => setHelp(true)}>
          <path
            fill="currentColor"
            d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
          />
        </svg>
        <span>
          Swordle {` `}
          {Object.keys(LITERALS).map((languageKey) => (
            <span
              className={`change-language ${
                languageKey === currentLanguage ? "active" : ""
              }`}
              data-id={`${languageKey}`}
              onClick={onLanguageChange}
            >{`${LITERALS[languageKey]["flag"]} `}</span>
          ))}
        </span>
        
      </header>
      <form onSubmit={onSubmit} className="guesses">
        {matrix.map(({ guess, states, isActive, isSubmitted }) =>
          states.map((state, letterIndex) => (
            <div
              className={`letter ${
                isSubmitted
                  ? `submitted ${state}`
                  : isActive && letterIndex === guess.length && !isDone
                  ? "active"
                  : ""
              }`}
            >
              {guess?.[letterIndex]}
            </div>
          ))
        )}
        <input
          id="guess-input"
          autoFocus
          inputMode="none"
          maxLength={WORD_LENGTH}
          onInput={onInput}
          autoComplete="off"
          autoCorrect="off"
          value={guesses[guesses.length - 1]}
          ref={inputRef}
          disabled={isDone}
          aria-label={`${LITERALS[currentLanguage]["guess"]}`}
        />
      </form>
      <div className="message" onClick={onMessageClick}>
        {message}
      </div>
      <Keyboard
        onSubmit={onSubmit}
        onInput={onInput}
        guesses={guesses}
        isDone={isDone}
        matrix={matrix}
        currentLanguage={currentLanguage}
      />
      <div className={`keyboard layout-${currentLanguage}`}>
        {keys.map((key) => (
          <button
            className={`key ${classByKey[key]}`}
            data-key={key}
            onClick={() => {
              if (key === "⏎") onSubmit();
              else {
                let value = guesses[guesses.length - 1] || "";
                if (key === "⌫") value = value.slice(0, -1);
                else value = (value + key).slice(0, WORD_LENGTH);
                onInput({ target: { value } });
              }
              navigator?.vibrate(10);
            }}
            disabled={isDone}
          >
            {key}
          </button>
        ))}
      </div>
      
    </label>
    
  );
}


export default Moordle;
