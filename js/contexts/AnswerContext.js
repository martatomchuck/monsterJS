import React, { createContext, Component } from 'react';
import ReactDOM from "react-dom";

export const AnswerContext = createContext();

class AnswerContextProvider extends Component {
    state = {
        userAnswer: "",
        isCorrect: false
    }
    render () {
        return (
            <AnswerContext.Provider value={{...this.state}}>
                {this.props.children}
            </AnswerContext.Provider>
        )
    }
}

export default AnswerContextProvider;