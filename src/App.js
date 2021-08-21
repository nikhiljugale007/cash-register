import React from "react";
import "./App.css";

function App() {
	const [noOfNotes, setNoOfNotes] = React.useState([0, 0, 0, 0, 0, 0, 0]);
	const [billAmount, setBillAmount] = React.useState();
	const [cashAmount, setCashAmount] = React.useState();
	const [returnAmount, setReturnAmount] = React.useState(0);
	const [gotoCheck, setGoToCheck] = React.useState(false);
	const [gotoNext, setGoToNext] = React.useState(false);

	var noteArr = [2000, 500, 100, 20, 10, 5, 1];

	const countNotes = () => {
		if (billAmount < 1) {
			alert("Enter valid bill amount");
		} else {
			console.log(cashAmount + " = " + billAmount);
			var change = cashAmount - billAmount;
			if (change < 0) {
				alert("Cash given should be greater than bill amount");
				setNoOfNotes([0, 0, 0, 0, 0, 0, 0]);
				return;
			}
			setReturnAmount(change);
			setGoToCheck(true);
			var ptr = 0;
			while (change > 0) {
				console.log("change = " + change);
				if (change >= noteArr[ptr]) {
					// console.log(change);
					var tempCount = (change - (change % noteArr[ptr])) / noteArr[ptr];
					console.log("tempCount = " + tempCount);
					change = change - noteArr[ptr] * tempCount;
					var tempArr = noOfNotes;
					tempArr[ptr] = tempCount;
					// console.log(tempArr + tempCount + tempArr[ptr]);
					setNoOfNotes((pre) => tempArr);
				}
				ptr++;
				if (change === 0) {
					break;
				}
			}
		}
	};

	const validateBillAmount = () => {
		if (billAmount > 0) {
			setGoToNext(true);
		} else {
			alert("Enter a valid bill amount");
		}
	};

	return (
		<div className="App">
			<div style={{ marginTop: "5px" }}>
				<h1>Cash Register</h1>
				<p>
					Enter the bill amount and cash given by customer and know minimum
					numbercls of notes to return.
				</p>
			</div>
			<div>
				<label>Bill Amount </label>
				<input
					type="number"
					placeholder="Please enter bill amount"
					value={billAmount}
					label="Enter bill"
					onChange={(e) => setBillAmount(e.target.value)}
				/>
			</div>
			<button onClick={validateBillAmount}>Next</button>
			{gotoNext && (
				<div>
					<label>Cash Given </label>
					<input
						type="number"
						placeholder="Please enter the cash given"
						value={cashAmount}
						onChange={(e) => setCashAmount(e.target.value)}
					/>
				</div>
			)}
			{gotoNext && <button onClick={countNotes}>check</button>}
			{gotoCheck && (
				<div
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<div style={{ paddingBottom: "10px" }}>
						Amount to return = {returnAmount}
					</div>

					<table style={{ width: "50%" }}>
						<tr>
							<th>Note</th>
							<th>No of Notes</th>
						</tr>

						{noOfNotes.map((item, index) => (
							<tr>
								<td>{noteArr[index]}</td>
								<th>{item}</th>
							</tr>
						))}
					</table>
				</div>
			)}
		</div>
	);
}

export default App;
