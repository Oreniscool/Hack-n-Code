import { useEffect } from "react";
import "../styles/WordChallenge.css";
import { languages } from "../assets/languages2";
import { useState } from "react";
import { Link } from "react-router-dom";

const WordChallenge = ()=>{

    const [word, setWord] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [ans, setAns] = useState('');
    const [score, setScore] = useState(0);
    

    const [lang2, setLang2]= useState('English');

    const langs= languages.map((language)=> language.name);
    const codes = languages.map((language)=> language.code);
    
    /*PLAN FOR THIS
    
        TO HAVE TWO LANGUAGE CHOICES, SOURCE AND TARGET.
        PARTICIPANT HAS TO DECIDE SOURCE AND TARGET.
        ONCE BOTH ARE SET AND CONFIRMED A WORD WILL BE GENERATED IN THE SOURCE LANGUAGE 
        PARTICIPANT HAS TO GUESS THE TRANSLATION IN THE TARGET LANGUAGE 
    
    */

        const check = async()=>{
            // console.log(lang2, languages);
            var lang_code="";
            for(var i=0;i<languages.length;i++){
                if(languages[i].name.toUpperCase() === lang2.toUpperCase()){
                    lang_code = languages[i].code;
                }
            }
            console.log(lang_code);
            var externalData=[];
            try{
                const resp = await fetch(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyDsczIcr3Xfe-aDoTop6sMu9F-ITlh0aD0&q=${word}&target=${lang_code}`);
                const data = await resp.json();
                console.log(data);
                externalData = data;
            } catch(e){
                throw new Error();
            }
            if(ans === externalData.data.translations[0].translatedText){
                setScore((prev) => {
                    const newState = prev+1;
                    return newState;
                })
                console.log(score);             
            }
            
        }

        
      
        useEffect(() => {

            if(score >=5 ){
                window.location.href = "/dashboard";
            }

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
        }, [score]);


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
                <p>3. As soon as you guess a new word will appear </p>
                <p>4. This process will continue till you are able to translate 5 words</p>
                <h1 className="question">{word.toUpperCase()}</h1>
            </div>
            <div className="bottom-container">
                <input type="text" className="answer" name="answer" placeholder="Enter your answer" onChange={(e)=>setAns(e.target.value)}/>
                <button onClick={check} className="submit">SUBMIT</button>
                <h3>SCORE: {score}/5</h3>
            </div>
        </div>
            
        </>);
}

export default WordChallenge;