import React, { useState, useEffect, Scro } from "react";
import './App.css';
// import { config } from "dotenv";
import { OpenAI } from "openai";
import './index.css';

import Header from "./components/header/Header";
import Arrow from "./components/questionBox/Arrow";


// config()

function App() {

	const ai = new OpenAI({ apiKey: process.env.REACT_APP_API_KEY, dangerouslyAllowBrowser: true })
	const [answers, setAnswers] = useState([])

	const handleQuestion = async (e) => {
		e.preventDefault()
		console.log(e.target[0].value)
		await ai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: e.target[0].value }],
		})
			.then(res => {
				try {

					let tempAnswers = answers
					// console.log(answers)
					// console.log(tempAnswers)
					if (answers.length > 0) {
						tempAnswers.push(res.choices[0])
						setAnswers(tempAnswers)

					} else {
						setAnswers([res.choices[0]])
					}
					console.log(answers)

				} catch (error) {
					console.error("Error:", error);
				}
			})
	}

	const renderAnswers = () => {
		if (answers.length > 0) {
			return (
				<div>
					{answers.map((answer, i) => {
						return (
							<div className="p-[50px] bg-[#1E293B] w-[80%] rounded-lg m-[50px]">
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

	}, [answers]);


	return (
		<div className="App h-screen">

			<Header />
			
			
			<div className="scrollable-box">
				{renderAnswers()}
			</div>
			
			<div className="absolute bottom-[20px] bg-[#1E293B]">
				<form onSubmit={handleQuestion} className="flex">
					<input name="question" defaultValue="Hello" className="w-screen bg-transparent h-[150px] text-[24px]" />
					<button type="submit" className=" p-[20px] absolute bottom-[40px] right-[20px] rounded-lg">
						<Arrow />
					</button>
				</form>
			</div>
		</div>
	);

}

export default App;
