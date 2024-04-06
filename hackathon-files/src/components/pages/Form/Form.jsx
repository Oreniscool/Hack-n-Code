import React, { useReducer } from "react";
import './Form.css';
import { languages } from "../../../assets/languages";
import { Courses } from "../../../assets/Courses";

const initialState = {
    name:'',
    primarylanguage1:'',
    primarylanguage2:'',
    primarylanguage3:'',
    targetlanguage1:'',
    targetlanguage2:'',
    interestedPlan:'',
    submitted:'false'
};

function reducer(state, action){
    console.log(action.value);
    console.log(state);
    switch(action.type){
        case 'PLANG1_CHANGE' :{  return {...state , primarylanguage1: action.value}}
        case 'PLANG2_CHANGE' : return {...state , primarylanguage2: action.value};
        case 'PLANG3_CHANGE' : return {...state , primarylanguage3: action.value};
        case 'TLANG1_CHANGE' : return {...state , targetlanguage1: action.value};
        case 'TLANG2_CHANGE' : return {...state , targetlanguage1: action.value};
        case 'NAME_CHANGE' : return {...state , name: action.value};
        case 'COURSE_CHANGE' : return {...state , interestedPlan: action.value};
        case 'FORM_SUBMITTED' : return {...state , submitted : action.value};
    }
}

const Form = ()=>{
    const [state, dispatch] = useReducer(reducer,initialState);
    const onLang1Change = (e)=>{
        dispatch({type : 'PLANG1_CHANGE',  value: e.target.value} );
    }

    const onLang2Change = (e)=>{
        dispatch({type : 'PLANG2_CHANGE',  value: e.target.value} );
    }

    const onLang3Change = (e)=>{
        dispatch({type : 'PLANG3_CHANGE',  value: e.target.value} );
    }

    const onTLang1Change = (e)=>{
        dispatch({type : 'TLANG1_CHANGE',  value: e.target.value} );
    }

    const onTLang2Change = (e)=>{
        dispatch({type : 'TLANG2_CHANGE',  value: e.target.value} );
    }

    const onNameChange = (e)=>{
        dispatch({type:'NAME_CHANGE' , value: e.target.value})
    }

    const onCourseChange = (e) =>{
        dispatch({type:'COURSE_CHANGE' , value: e.target.value})
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        dispatch({type:'FORM_SUBMITTED' , value :e.target.value} )
     }

    return(
        <React.Fragment>
            <form className="form" onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <input onChange={onNameChange} type="text" className="input" name="name" value={state.name}/>

                <label htmlFor="primarylanguage1">Primary language 1</label>
                <select onChange={onLang1Change} type="text" id="primarylanguage1" className="input" name="primarylanguage1" list="langs">
                {languages.map((langauge)=>{
                    return (<option key={langauge}>{langauge}</option>);
                })}
                </select>
                <label htmlFor="primarylanguage2">Primary language 2</label>
                <select onChange={onLang2Change} type="text" id="primarylanguage2" className="input" name="primarylanguage2"  list="langs">
                {languages.map((langauge)=>{
                    return (<option key={langauge}>{langauge}</option>);
                })}
                </select>
                
                <label htmlFor="primarylanguage3">Primary langauge 3</label>
                <select onChange={onLang3Change} type="text" id="primarylanguage3" className="input" name="primarylanguage3"  list="langs">
                {languages.map((langauge)=>{
                    return (<option key={langauge}>{langauge}</option>);
                })}
                </select>
                
                <label htmlFor="targetlanguage1">Target language 1</label>
                <select onChange={onTLang1Change} type="text" id="targetlanguage1" className="input" name="targetlanguage1"  list="langs">
                {languages.map((langauge)=>{
                    return (<option key={langauge}>{langauge}</option>);
                })}
                </select>

                <label htmlFor="targetlanguage2">Target language 1</label>
                <select onChange={onTLang2Change} type="text" id="targetlanguage2" className="input" name="targetlanguage2"  list="langs">
                {languages.map((langauge)=>{
                    return (<option key={langauge}>{langauge}</option>);
                })}
                </select>

                <label htmlFor="course"> Select course</label>
                <select onChange={onCourseChange} type="text" id="course" className="input" name="course">
                {Courses.map((course) => {
                    return <option key={course}>{course}</option>
                })}
                </select>

                <button>SUBMIT</button>
            </form>
        </React.Fragment>
    );
}
export default Form