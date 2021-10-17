import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import QuestionBox from "./QuestionBox";
import Database from "../db/fakeDb";
import QuesTionButton from "./QuesTionButton";





function DashBoard() {
	let [questions, setQuestions] = useState([]);
	const [incCount, setIncCount] = useState(0);
	const [userChoosingOption, setUserChoosingOption] = useState(null);
	const [allSavedData, setallSavedData] = useState([]);


	useEffect(() => {

		questions = Database.map((question) => {
			return {
				...question,
				answers: [
					question.correct_answer,
					...question.incorrect_answer
				].sort(() => Math.random() * - 0.5)
			}
		}).sort(() => Math.random() - 0.5);

		console.log(questions)

		setQuestions(questions);


	}, []);



	const NextQs = (e) => {
		let nextCount = incCount + 1;
		if (nextCount === questions.length) {

			setallSavedData({
				...allSavedData,
				...userChoosingOption,

			});
			setIncCount(questions.length - 1);
			setUserChoosingOption(null)


		} else {

			setallSavedData({
				...allSavedData,
				...userChoosingOption,
			});
			setIncCount(incCount + 1);
			setUserChoosingOption(null)


		}
	};

	const skip = () => {
		if (incCount === questions.length - 1) {
			setIncCount(questions.length - 1)
		} else {

			setIncCount(incCount + 1)
		}
	}

	const PrevQs = (e) => {
		if (incCount === 0) {
			setIncCount(0);
		} else {
			setIncCount(incCount - 1);
		}
	};

	const quesTionTab = (qno) => {

		let index = questions.findIndex((elm) => {
			return elm.qno === qno;
		});
		setIncCount(index)

		// if (+qno === questions.length-1) {
		// 	setIncCount();
		// } else {
		// 	setIncCount(+qno);
		// }
	};

	const sellectOption = (Qno, e) => {
		setUserChoosingOption({
			[Qno]: e.target.value,
		});
	};

	const submitData = (e) => {
		e.preventDefault();
		const map = new Map();
		for (let i = 0; i < questions.length; i++) {

			map.set(questions[i].qno, questions[i].correct_answer)
		}

		let score = 0;

		for (const [key, value] of map.entries()) {
			// console.log(key + ' ' + value);
			let originalqno = +key;
			let originalans = +value;
			for (const [key1, value1] of Object.entries(allSavedData)) {
				let userqno = key1;
				let userans = value1;
				if (originalqno === +userqno && originalans === +userans) {
					score = score + 5;
					console.log("successss")

				}
			}
		}
		console.log(score)



	};

	const clearRadioBtn = (qno) => {
		delete allSavedData[+qno];
		console.log(allSavedData, 'before')
		console.log(qno, 'cleR', allSavedData);

	}

	return questions.length > 0 ? (

		<div className="container-fluid ">
			<div className="header">
				<div className="left">
					<img src="https://i.ibb.co/s6NCmyM/REPL.png" alt="logo" />
				</div>
				<div className="right">
					<p className="timer">01: 30: 00</p>
				</div>
			</div>

			<div className="wrapper row">
				{/* <!-- Starting of left-side  --> */}
				<div className="right-side  col-12 col-sm-4">
					<div className="profile">
						<div className="info">
							<h4 className="name">Suman Ojha</h4>
							<p className="class">CSE-3rd</p>
						</div>
						<div className="image">
							<img
								src="https://avatars.dicebear.com/api/initials/suman.svg"
								alt="suman ojha"
							/>
						</div>
					</div>
					<div className="questions">
						{questions.map((data, idx) => {
							return (
								<QuesTionButton
									quesTionTab={quesTionTab}
									qno={data.qno}
									idx={idx + 1}
									allSavedData={allSavedData} />
							);
						})}
					</div>
					<div className="view">
						<div className=" fl">
							<h5>Completed :</h5>
							<p className="number">00</p>
						</div>
						<div className=" fl">
							<h5>Left :</h5>
							<p className="number">00</p>
						</div>
					</div>
				</div>

				{/* <!-- ------right side starts here --> */}
				<div className="left-side col-12 col-sm-8">
					{
						<QuestionBox
							sellectOption={sellectOption}
							data={questions[incCount]}
							skip={skip}
							clearRadioBtn={clearRadioBtn}
						/>
					}

					<div className="button">
						<button onClick={PrevQs} className="btn">
							Prev
						</button>
						<button onClick={NextQs} className="btn">
							Saved & Next
						</button>
						{questions.length === incCount + 1 ? (
							<button onClick={submitData} className="btn submit">
								submit
							</button>
						) : null}
					</div>
				</div>
				{/* <!-- end of left side  --> */}

				{/* <!-- Starting of right-side  --> */}
			</div>
		</div>


	)

		:

		<h1>LocalDining....</h1>




}

export default DashBoard;
