import React, { useState, useEffect, useRef } from "react";
import './App.css';
// import { config } from "dotenv";
import { OpenAI } from "openai";
import './index.css';

import Header from "./components/header/Header";
import Arrow from "./components/questionBox/Arrow";
import Loading from "./components/global/Loading";


// config()

function App() {

    const ai = new OpenAI({ apiKey: process.env.REACT_APP_API_KEY, dangerouslyAllowBrowser: true })
    const [answers, setAnswers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const scrollViewRef = useRef(null);

    const handleQuestion = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        console.log(e.target[0].value)
        await ai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: e.target[0].value }],
        })
            .then(res => {
                try {
                    if (answers.length > 0) {
                        let tempAnswers = [...answers]
                        tempAnswers.push(res.choices[0])
                        setAnswers(tempAnswers)
                        setIsLoading(false)
                    } else {
                        setAnswers([res.choices[0]])
                        setIsLoading(false)
                    }
                    console.log(answers)

                } catch (error) {
                    console.error("Error:", error);
                    setIsLoading(false)
                }
            })
    }

    const renderAnswers = () => {
        if (answers.length > 0) {
            window.scrollTo(document.body.scrollHeight, 0);
            return (
                <div className="mb-[85px]" >
                    {answers.map((answer, i) => {
                        return (
                            <div className="p-[25px] bg-[#1E293B] w-[80%] rounded-[20px] m-[25px]">
                                <h1 key={i} className="text-[#DFD9FF] text-left ">{answer.message.content}</h1>
                            </div>
                        )
                    }
                    )}
                </div>
            );
        } else {
            return null;
        }
    };

    useEffect(() => {
        renderAnswers()
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
        }
    }, [answers])


    return (
        <div className="App h-screen">

            <Header />

            <div ref={scrollViewRef} className="scrollable-box">
                {renderAnswers()}
            </div>

            {
                isLoading && <Loading />
            }

            <div className="absolute bottom-[0px] bg-[#1E293B] rounded-[20px]">
                <form onSubmit={(e) => handleQuestion(e)} className="w-screen flex pl-[25px]">
                    <input name="question" defaultValue="Hello" className="w-[90%] text-[#DFD9FF] bg-transparent h-[150px] text-[24px]" />
                    <button type="submit" className=" p-[20px] absolute bottom-[40px] right-[20px] rounded-lg">
                        <Arrow />
                    </button>
                </form>
            </div>
        </div>
    );

}

export default App;
