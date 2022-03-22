import { useEffect, useRef, useState } from 'react';
import './App.css';
import commands from './misc/commands'
function App() {
	const [text, setText] = useState("hello world")
	const [history, setHistory] = useState([<p>{commands.welcome}</p>])
	const [textHistory, setTextHistory] = useState([])
	const [historyPosition, setHistoryPosition] = useState(0)
	const searchInput = useRef(null);
	const scrollToInput = () => searchInput.current.scrollIntoView();
	function handleText(e) {
		setText(e.target.value.toLowerCase())
	}
	function handleSubmit(e){
		e.preventDefault()
		if(text){
			const closest_similar = Object.keys(commands).filter(e => e.includes(text))[0];
			let fnReturn;
			if(typeof commands[text] === "function"){
				fnReturn = commands[text]()
			}else if(typeof commands[closest_similar] === "function"){
				fnReturn = commands[closest_similar]()
			}
			let finalCommand = fnReturn || commands[text] || commands[closest_similar];
			let el = <p>{'> ' + (commands[text] !== undefined? text : closest_similar || text) }</p>;
			let res = <p>{'' + (
				finalCommand ||
				"Command not found, check the list from the bottom to know wich commands are available"
			)}</p>;
			setHistory([...history, el, res])
			setTextHistory([...textHistory, closest_similar || text])
			setHistoryPosition(textHistory.length + 1);
			if(text === "clear"){
				setHistory([]);
			}
			setText("");
			scrollToInput();
		}else{
			setHistory([...history, <p>{">"}</p>])
		}
	}
	function handleKeyDown(e){
		switch (e.key) {
			case "Tab":
				e.preventDefault();
				const closest_similar = Object.keys(commands).filter(e => e.includes(text))[0];
				setText(closest_similar)
			break;
			case "ArrowUp":
				console.log(historyPosition, textHistory.length)
				if(historyPosition > 0){
					setHistoryPosition(historyPosition - 1)
					setText(textHistory[historyPosition])
				}
			break;
			case "ArrowDown":
				console.log(historyPosition, textHistory.length)
				if(historyPosition < textHistory.length){
					setHistoryPosition(historyPosition + 1)
					setText(textHistory[historyPosition])
				}
			break;
			default:
				console.log(e.key)
				break;
		}
	}
	useEffect(()=>{
		searchInput.current.focus();
		searchInput.current.scrollIntoView();
	},[text, history])

	return (
		<div className="App" >
			<div className='inputSection'>
				{history}
				<form onSubmit={handleSubmit}>
					{`${historyPosition}/${textHistory.length}> `} <input
					className='inputTerminal'
					onKeyDown={handleKeyDown}
					onInput={handleText}
					value={text}
					ref={searchInput}
					></input>
				</form>
				<p>{"Comandos Disponibles: " + Object.keys(commands).filter(e => e.includes(text)).join(", ")}</p>
			</div>
		</div>
	);
}

export default App;
