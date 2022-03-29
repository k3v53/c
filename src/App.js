import { useEffect, useRef, useState } from 'react';
import './App.css';
import commands from './misc/commands';
import ReactGA from 'react-ga';
function App() {
	ReactGA.initialize("G-GSSHP6JJDD");
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
			const commandResponse = finalCommand ||
				"Command not found, check the list from the bottom to know wich commands are available";
			let el = <p>{'> ' + (commands[text] !== undefined? text : closest_similar || text) }</p>;
			let res = <p>{'' + (commandResponse)}</p>;
			ReactGA.event({
				category: "web_cli",
				action: "web_cli_command",
				label: `${closest_similar || text}`,
				command_exist: `${closest_similar !== undefined}`,
				command_response: `${commandResponse}`
			})
			setHistory([...history, el, res])
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
				// TODO: History on up
			break;
			case "ArrowDown":
				// TODO: History on down
			break;
			default:
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
					{`> `} <input
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
