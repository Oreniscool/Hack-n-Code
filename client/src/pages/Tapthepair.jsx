import React, { useState, useEffect } from 'react';
import "../styles/tapthepair.css";

const TapThePair = () => {
  const [words, setWords] = useState([]);
  const [translatedWords, setTranslatedWords] = useState([]);
  const [shuffledOriginals, setShuffledOriginals] = useState([]);
  const [shuffledTranslations, setShuffledTranslations] = useState([]);
  const [score, setScore] = useState(0);
  const [matched, setMatched] = useState([]);
  const [selectedOriginal, setSelectedOriginal] = useState(null);
  const [selectedTranslation, setSelectedTranslation] = useState(null);
  const [correctMatchMessage, setCorrectMatchMessage] = useState(null);
  const [wrongMatchMessage, setWrongMatchMessage] = useState(null);

  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch('https://random-word-api.vercel.app/api?words=10');
      const data = await response.json();
      const translations = await Promise.all(
        data.map(async (word) => {
          const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyDsczIcr3Xfe-aDoTop6sMu9F-ITlh0aD0&q=${word}&target=es`);
          const translationData = await response.json();
          return translationData.data.translations[0].translatedText;
        })
      );
      setWords(data);
      setTranslatedWords(translations);
    };

    fetchWords();
  }, []);

  useEffect(() => {
    if (words.length > 0 && translatedWords.length > 0) {
      const shuffledPairs = words.map((word, index) => ({ original: word, translated: translatedWords[index] }));
      setShuffledOriginals(shuffleArray(words));
      setShuffledTranslations(shuffleArray(translatedWords));
    }
  }, [words, translatedWords]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleClick = (isOriginal, word) => {
    if (isOriginal) {
      if (selectedOriginal === null) {
        setSelectedOriginal(word);
      } else {
        checkMatch(word);
      }
    } else {
      if (selectedTranslation === null) {
        setSelectedTranslation(word);
      } else {
        checkMatch(word);
      }
    }
  };

  const checkMatch = (clickedWord) => {
    setCorrectMatchMessage(null);
    setWrongMatchMessage(null);

    if (selectedOriginal && selectedTranslation) {
        const originalIndex = words.indexOf(selectedOriginal);
        const translationIndex = translatedWords.indexOf(selectedTranslation);

        if (originalIndex !== -1 && translationIndex !== -1 && originalIndex === translationIndex) {
            if (!matched.includes(`${selectedOriginal}-${selectedTranslation}`)) {
                setScore(score + 1);
                setMatched([...matched, `${selectedOriginal}-${selectedTranslation}`]);
                setCorrectMatchMessage('Correct match!');
            } else {
                setCorrectMatchMessage('You have already matched this pair!');
            }
        } else {
            setWrongMatchMessage('Wrong match!');
        }

        setSelectedOriginal(null);
        setSelectedTranslation(null);
    } else if (selectedOriginal === null) {
        setSelectedOriginal(clickedWord);
    } else {
        setSelectedTranslation(clickedWord);
        const originalIndex = words.indexOf(selectedOriginal);
        const translationIndex = translatedWords.indexOf(clickedWord);

        if (originalIndex !== -1 && translationIndex !== -1 && originalIndex === translationIndex) {
            if (!matched.includes(`${selectedOriginal}-${clickedWord}`)) {
                setScore(score + 1);
                setMatched([...matched, `${selectedOriginal}-${clickedWord}`]);
                setCorrectMatchMessage('Correct match!');
            } else {
                setCorrectMatchMessage('You have already matched this pair!');
            }
        } else {
            setWrongMatchMessage('Wrong match!');
        }

        setSelectedOriginal(null);
        setSelectedTranslation(null);
    }
};


  return (
    <div className="container">
      <div className="word-section">
        <h3>Original Words</h3>
        {shuffledOriginals.map((word, index) => (
          <div
            key={index}
            className={`word ${selectedOriginal === word ? 'selected' : ''} ${matched.includes(`${word}-${translatedWords[index]}`) ? 'matched' : ''}`}
            onClick={() => !matched.includes(`${word}-${translatedWords[index]}`) && handleClick(true, word)}
          >
            {word}
          </div>
        ))}
      </div>
      <div className="word-section">
        <h3>Translated Words</h3>
        {shuffledTranslations.map((word, index) => (
          <div
            key={index}
            className={`word ${selectedTranslation === word ? 'selected' : ''} ${matched.includes(`${words[index]}-${word}`) ? 'matched' : ''}`}
            onClick={() => !matched.includes(`${words[index]}-${word}`) && handleClick(false, word)}
          >
            {word}
          </div>
        ))}
      </div>
      <div className="score-section">
        <h3>Score: {score}</h3>
        {correctMatchMessage && <p>{correctMatchMessage}</p>}
        {wrongMatchMessage && <p>{wrongMatchMessage}</p>}
      </div>
    </div>
  );
};

export default TapThePair;


