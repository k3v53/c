import { useEffect, useRef, useState } from 'react';
import './App.css';
import commands from './misc/commands'
function App() {
	const [text, setText] = useState("Hello World")
	const [history, setHistory] = useState([<p>{commands.welcome}</p>])
	const searchInput = useRef(null);
	const scrollToInput = () => searchInput.current.scrollIntoView();
	function handleText(e) {
		setText(e.target.value.toLowerCase())
	}
	function handleSubmit(e){
		e.preventDefault()
		const closest_similar = Object.keys(commands).filter(e => e.includes(text))[0];
		let fnReturn;
		if(typeof commands[text] === "function"){
			fnReturn = commands[text]()
		}else if(typeof commands[closest_similar] === "function"){
			fnReturn = commands[closest_similar]()
		}
		let el = <p>{'> ' + (commands[text] !== undefined? text : closest_similar || text) }</p>;
		let res = <p>{'' + (
			fnReturn || commands[text] || commands[closest_similar] ||
			"Command not found, check the list from the bottom to know wich commands are available"
		)}</p>;
		setHistory([...history, el, res])
		if(text === "clear"){
			setHistory([]);
		}
		setText("");
		scrollToInput();
	}
	useEffect(()=>{
		searchInput.current.focus();
		searchInput.current.scrollIntoView();
	},[text, history])

	return (
		<div className="App" onFocus={handleText}>
			<div className='inputSection'>
				{history}
				<form onSubmit={handleSubmit}>
					{'> '} <input className='inputTerminal' onInput={handleText} value={text}
					ref={searchInput}
					></input>
				</form>
				<p>{"Comandos Disponibles: " + Object.keys(commands).filter(e => e.includes(text)).join(", ")}</p>
			</div>
		</div>
	);
}

export default App;
