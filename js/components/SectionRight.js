import React, { useState, useEffect, useContext } from "react";

import { LevelContext } from '../contexts/LevelContext';
import { AnswerContext } from "../contexts/AnswerContext";
import { CheckContext } from "../contexts/CheckContext";


const SectionRight = ({story, description, task, instructions, example}) => {

    return (
        <section className="section-right">
            <div className="title">Welcome to Monster Village!</div>
            <Instructions story={story} description={description} task={task} instructions={instructions} example={example}/>
            <Console/>
            <div className="console-btn">
                <BtnNext/>
            </div>
        </section>
    )
}

const Instructions = ({story, description, example}) => {
    return (
        <div className="description">
            <div className="description-story"> {story} </div>
            <div className="description-task">
                <h4>Your task </h4>
                    {description.map(el => <span key={el.id} className={el.bold ? "bold" : ""}>{el.text}</span>
                )}
            </div>

            {/* <div className="description-bullets">
                <ul>
                    {instructions.map((el) => {
                        return <li key={el.id}>{el.bullet.map((el2) => {
                            return <span key={el2.id} className={el2.bold ? "" : ""}>{el2.text}</span>
                        })}</li>
                    })}
                </ul>
            </div> */}

            <div className="description-task">
                <h4>Example </h4>
                    {example.map(el => <span key={el.id} className={el.bold ? "bold" : ""}>{el.text}</span>
                )}
            </div>
        </div>
    )
}

const Console = () => {
    const {answerSubmit} = useContext(CheckContext);

    const numbers = [];
    for (let i = 1; i < 9; i++) {
        numbers.push(i);
    }

    return (
        <div className="console">
            <div className="console-numbers">
                {numbers.map((number, index) => <div key={index}>{number}</div>)}
            </div>
            <div className="console-task">
                <div> 
                    <InputCode/>
                </div>
                {
                    answerSubmit &&
                    <OutputCode/>
                }
            </div>
        </div>
    )
}

const InputCode = () => {
    const {handleCheck, handleUnCheck} = useContext(CheckContext);
    const {verifyAnswer, clearAnswer, isClicked, handleClick} = useContext(AnswerContext);

    const [answer, setAnswer] = useState("");
     
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleAnswerSubmit = () => {
        handleCheck();
        verifyAnswer(answer.trim());
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAnswerSubmit();
        }
    }

    useEffect(() => {
        if (isClicked && answer !== "") {
            // console.log("clicked", isClicked);
            setAnswer("");
            handleClick();
        }
    }, [isClicked]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="console-userinput">
                <label>const chosen = document. </label>
                <input type="text" spellCheck="false" placeholder="Type in your code" value={answer} onChange={(e) => setAnswer(e.target.value)} onClick={() => {handleUnCheck(); clearAnswer(answer);}} onBlur={handleAnswerSubmit} onKeyDown={handleKeyDown} />
            </div>

            {/* <input type="submit" className="btn check-btn" value="Check"></input> */}
        </form>
    );
}

const OutputCode = () => {
    const {isCorrect} = useContext(AnswerContext);

    return (
        <div className="console-output" style={{backgroundColor: isCorrect ? "#388e3c" : "#DB0049"}}>{isCorrect ? "Good job! The Monsters are safe now! You can move to the next level." : "Sorry, incorrect result. Correct your answer or try again."}</div>
    )
}

const BtnNext = () => {
    const {handleNextBtn} = useContext(LevelContext);
    const {handleUnCheck} = useContext(CheckContext);
    const {clearAnswer, handleClick} = useContext(AnswerContext);

    const pushNextBtn = () => {
        handleNextBtn();
        handleUnCheck();
        clearAnswer();
        handleClick();
    }

    return <div className="btn next-btn" onClick={pushNextBtn}>Next</div>
}

export default SectionRight;