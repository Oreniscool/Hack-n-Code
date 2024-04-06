import { useEffect } from "react";
import "../styles/WordChallenge.css";
import { languages } from "../assets/languages2";
import { useState } from "react";

const WordChallenge = ()=>{

    // const [lang1,setLang1] = useState('English');
    const [lang2, setLang2]= useState('English');

    const langs= languages.map((language)=> language.name);
    const codes = languages.map((language)=> language.code);
    
    /*PLAN FOR THIS
    
        TO HAVE TWO LANGUAGE CHOICES, SOURCE AND TARGET.
        PARTICIPANT HAS TO DECIDE SOURCE AND TARGET.
        ONCE BOTH ARE SET AND CONFIRMED A WORD WILL BE GENERATED IN THE SOURCE LANGUAGE 
        PARTICIPANT HAS TO GUESS THE TRANSLATION IN THE TARGET LANGUAGE 
    
    */

        const check = async(e)=>{
            var lang_code="";
            for(var i=0;i<languages.length;i++){
                if(languages.name === lang2){
                    lang_code = languages.code;
                }
            }
            const url = 'https://translate-plus.p.rapidapi.com/translate';
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': 'e4ea804d33msh4a421e24fe50878p18d071jsn07bf4c2002af',
                    'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
                },
                body: {
                    text: word.toUpperCase(),
                    source: 'en',
                    target: lang_code,
                }
            };
            try {
                const response = await fetch(url, options);
                const result = await response.text();
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }

        const [word, setWord] = useState('');
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState('');
      
        useEffect(() => {
          const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
              const response = await fetch('https://random-word-api.herokuapp.com/word');
              if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
              }
              const data = await response.json();
              setWord(data[0]); // Assuming the API returns an array with one element
            } catch (error) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
          };
      
          fetchData();
        }, []);


    return (<>
         <div className="outer-container">
            <div className="top-container">
                <div>
                    <label htmlFor="select-input1">SOURCE LANGUAGE</label>
                    <select name="source" id="select-input1" disabled >
                        {langs.map((lang)=>{
                            return <option key={lang}>{lang}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="select-input2">TARGET LANGUAGE</label>
                    <select name="target" id="select-input2" value={lang2} onChange={(e)=> {setLang2(e.target.value); e.target.disabled = true;}}>
                        {langs.map((lang)=>{
                            return <option key={lang}>{lang}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="mid-container">
                <h3>INSTRUCTIONS</h3>
                <p>1. Source Language is the language in which the word is generated</p>
                <p>2. Target Language is the language in which you have to guess the word</p>
                <p>3. As soon as you guess a new word will appear</p>
                <h1 className="question">{word.toUpperCase()}</h1>
            </div>
            <div className="bottom-container">
            <input onChange={check} type="text" className="answer" name="answer" placeholder="Enter your answer"/>
            </div>
        </div>
            
        </>);
}

export default WordChallenge;