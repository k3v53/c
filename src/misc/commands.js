function answerFromTime(){
	const hour = new Date().getHours()
	return hour >= 8 && hour <= 12 ? "No, es hora de trabajar" :
	hour >= 23 && hour <= 6 ? "Deberías, ya es demasiado internet por hoy" :
	"La verdad ni idea, espero haberte ayudado"
}
const getTimeString = () => {
	const d = new Date();
	return `son las ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}hs`
}
const commands = {
	"welcome": `Stupid terminal v0.0.3; type 'help' to be helped lol`,
	"hello world": "Bienvenido!",
	"cd kev.ar": () => document.location = "https://kev.ar",
	"cd wp.kev.ar": () => document.location = "https://wp.kev.ar",
	"hola": "Hola internauta!",
	"quien es el creador":"yo quien más, ok ya en serio, Kevin, mucho gusto",
	"quien sos": "Soy una terminal, como estas? o quisiste decir 'quien es el creador'??",
	"help": "No hay mucho que hacer aquí, soy una terminal que responde a comandos, los comandos se muestran debajo de la linea de input, si no hay nada en el input se muestran todos los comandos",
	"ayuda": "No hay mucho que hacer aquí, soy una terminal que responde a comandos, los comandos se muestran debajo de la linea de input, si no hay nada en el input se muestran todos los comandos",
	"toolbox": "Todavía no está disponible, te espero pronto en toolbox.kev.ar!!",
	"info": "This is a simple website that simulates a command line, almost every command is in spanish but if somebody really find this site useful I can make the english versions of the same commands",
	"r34": "No sé de que estás hablando",
	"contacto": "contact@kev.ar",
	"email": "contact@kev.ar",
	"como puedo contactarte?": "Pronto estaré lanzando un subdominio con mi contacto, espero verte pronto en contacto.kev.ar!!",
	"puedes volar": "no",
	"me gusta la pagina": "Muchas gracias!!! valoro tu opinión :D",
	// Preguntas del tipo "necesito"
	"necesito comprar algo": "felicidades, estás en el sitio incorrecto",
	"necesito dormir?": answerFromTime,
	"deberia dormir?": answerFromTime,
	// Preguntas de "que x"
	"que hora es?": getTimeString,
	"que productos vendes?": "Pronto estaré lanzando una página que tendrá todo eso, probablemente será en portfolio.kev.ar",
	"que puedes hacer": "No sé, experimenta :D",
	"para que sirve esto": "realmente no para mucho, simplemente devuelve valores y ya, piensa de esto como una especie de diccionario ;)",
	// Never gonna give you up
	"were no strangers to love" : "You know the rules and so do I",
	"a full commitments what im thinking of": "You wouldn't get this from any other guy",
	"iiiiiiiiiiiii just wanna tell you how im feeling": "Gotta make you understand",
	"never gonna give you up": "Never gonna let you down",
	"never gonna run around and desert you":"Never gonna make you cry",
	"never gonna say goodbye": "Never gonna tell a lie and hurt you",
	"rick": () => {
		window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", '_blank')
		return "xd"
	},
	// Humor
	"deja de llorar": "deja de sufrir",
	"sentado en la esquina": "pensando en como fui tan ***",
	"kash": "Hey! ese es el próximo nombre de mi lenguaje esotérico inspirado en bash",
}

export default commands