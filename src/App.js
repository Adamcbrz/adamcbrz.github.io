//import asciifyImage from "asciify-image";
import figlet from 'figlet';
import ANSI_Shadow from 'figlet/importable-fonts/ANSI Shadow';
import {
	CommandMapping,
	defaultCommandMapping,
	EmulatorState,
	FileSystem,
	OutputFactory
} from 'javascript-terminal';
import React, { Component } from 'react';
//import AsciiImage from './AsciiImage';
//import ReactTerminal from 'ReactTerminal';
//import { ReactTerminal, EmulatorState, FileSystem, ReactThemes } from 'react-terminal-component';
import { ReactOutputRenderers, ReactTerminalStateless, ReactThemes } from 'react-terminal-component';
//import { hasDirectory } from 'fs/operations/directory-operations';

figlet.parseFont('ANSI_Shadow', ANSI_Shadow);


//const PAPER_TYPE = 'paper';

// const paperStyles = {
//   backgroundColor: 'white',
//   color: 'black',
//   fontFamily: 'sans-serif',
//   padding: '1em',
//   margin: '1em 0',
//   borderRadius: '0.2em'
// };
/*
const PaperOutput = ({ content }) => (
	<>
	{content.title}
  <AsciiImage url='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' animated='false'	 />
  </>
);

const createPaperRecord = (title, body) => {
  return new OutputFactory.OutputRecord({
    type: PAPER_TYPE,
    content: {
      title,
      body
    }
  });
};*/

class App extends Component {
	constructor() {
		super();

		const fileSystem = FileSystem.create({
			'/README': {
				content:
					' █████╗ ██████╗  █████╗ ███╗   ███╗    ██████╗ ██████╗ ███████╗ ██████╗ ███████╗ ██████╗ ██╗    ██╗███████╗██╗  ██╗██╗\n' +
					'██╔══██╗██╔══██╗██╔══██╗████╗ ████║    ██╔══██╗██╔══██╗╚══███╔╝██╔═══██╗╚══███╔╝██╔═══██╗██║    ██║██╔════╝██║ ██╔╝██║\n' +
					'███████║██║  ██║███████║██╔████╔██║    ██████╔╝██████╔╝  ███╔╝ ██║   ██║  ███╔╝ ██║   ██║██║ █╗ ██║███████╗█████╔╝ ██║\n' +
					'██╔══██║██║  ██║██╔══██║██║╚██╔╝██║    ██╔══██╗██╔══██╗ ███╔╝  ██║   ██║ ███╔╝  ██║   ██║██║███╗██║╚════██║██╔═██╗ ██║\n' +
					'██║  ██║██████╔╝██║  ██║██║ ╚═╝ ██║    ██████╔╝██║  ██║███████╗╚██████╔╝███████╗╚██████╔╝╚███╔███╔╝███████║██║  ██╗██║\n' +
					'╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝ ╚═════╝  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝╚═╝\n' +
					'Welcome to my website. This is a fun experiment to\n' +
					"showcase my portfolio and stuff I have done.\n\nType 'help' in the console for a list of commands\nType 'ls' to list the directory\n\n"
			},
			'/skills': {
				content:
					'I have listed out my most used skills and abilities along with my skill level\n\n' +
					'Unity:          **********\n' +
					'C#:             **********\n' +
					'Unreal:         *******---\n' +
					'C++:            ****------\n' +
					'Swift:          *****-----\n' +
					'React:          ******----\n' +
					'Photoshop:      ********--\n' +
					'\n\n'
			},
			'/games': {},
			'/games/nyx': {
				content:
					' ███▄    █▓██   ██▓▒██   ██▒\n' +
					' ██ ▀█   █ ▒██  ██▒▒▒ █ █ ▒░\n' +
					'▓██  ▀█ ██▒ ▒██ ██░░░  █   ░\n' +
					'▓██▒  ▐▌██▒ ░ ▐██▓░ ░ █ █ ▒ \n' +
					'▒██░   ▓██░ ░ ██▒▓░▒██▒ ▒██▒\n' +
					'░ ▒░   ▒ ▒   ██▒▒▒ ▒▒ ░ ░▓ ░\n' +
					'░ ░░   ░ ▒░▓██ ░▒░ ░░   ░▒ ░\n' +
					'   ░   ░ ░ ▒ ▒ ░░   ░    ░  \n' +
					'         ░ ░ ░      ░    ░  \n' +
					'           ░ ░              \n\n' +
					'"Nyx" was a game I worked on to be launched with the GearVR. It was a space shooter\n' +
					'on rails. Working with the design to produce a level build and gameplay.\n'
			},
			'/games/pants': {
				content:
					' ________  ________  ________   _________  ________      \n' +
					'|\\   __  \\|\\   __  \\|\\   ___  \\|\\___   ___\\\\   ____\\     \n' +
					'\\ \\  \\|\\  \\ \\  \\|\\  \\ \\  \\\\ \\  \\|___ \\  \\_\\ \\  \\___|_    \n' +
					' \\ \\   ____\\ \\   __  \\ \\  \\\\ \\  \\   \\ \\  \\ \\ \\_____  \\   \n' +
					'  \\ \\  \\___|\\ \\  \\ \\  \\ \\  \\\\ \\  \\   \\ \\  \\ \\|____|\\  \\  \n' +
					'   \\ \\__\\    \\ \\__\\ \\__\\ \\__\\\\ \\__\\   \\ \\__\\  ____\\_\\  \\ \n' +
					'    \\|__|     \\|__|\\|__|\\|__| \\|__|    \\|__| |\\_________\\\n' +
					'                                             \\|_________|\n' +
					'                                                         \n' +
					'"Pants!: Don\'t Die Naked" was a game I did all of the programming on. It was a \n' +
					'simple game in the vein of flappy birds. This a fun project that allowed us to\n' +
					'published on three different platforms.\n'

			},
			'/games/deliver-it': {
				content:
					'  ________     __________                        ____________ \n' +
					'  ___  __ \\_______  /__(_)__   ______________    ____  _/_  /_\n' +
					'  __  / / /  _ \\_  /__  /__ | / /  _ \\_  ___/     __  / _  __/\n' +
					'  _  /_/ //  __/  / _  / __ |/ //  __/  /        __/ /  / /_  \n' +
					'  /_____/ \\___//_/  /_/  _____/ \\___//_/         /___/  \\__/  \n' +
					'                                                              \n' +
					'"Deliver It" is a driving game similar to Smuggle Truck used as training game.\n' +
					'The game included humorous descriptions to assist in the training of users.\n' +
					"The game consist of a delivery truck that takes a load to the next stop.\n",
			},
			'/games/rockpocalpse': {
				content:
					'                                                     \n' +
					' _____         _                   _                 \n' +
					'| __  |___ ___| |_ ___ ___ ___ ___| |_ _ ___ ___ ___ \n' +
					'|    -| . |  _| \'_| . | . | _ | .\'| | | | . |_ -| -_|\n' +
					'|__|__|___|___|_,_|  _|___|___|__,|_|_  |  _|___|___|\n' +
					'                  |_|               |___|_|          \n' +
					'\n' +
					'"Rockpocolypse" was a game we teamed up with Dwayne "The Rock" Johnson to create a fighting game.\n' +
					'It was focused on mechanim animation system along with doing some custom UI controls and transitions.'
			},
			'/games/luma-link': {
				content:
					' ___      __   __  __   __  _______    ___      ___   __    _  ___   _ \n' +
					'|   |    |  | |  ||  |_|  ||   _   |  |   |    |   | |  |  | ||   | | |\n' +
					'|   |    |  | |  ||       ||  |_|  |  |   |    |   | |   |_| ||   |_| |\n' +
					'|   |    |  |_|  ||       ||       |  |   |    |   | |       ||      _|\n' +
					'|   |___ |       ||       ||       |  |   |___ |   | |  _    ||     |_ \n' +
					'|       ||       || ||_|| ||   _   |  |       ||   | | | |   ||    _  |\n' +
					'|_______||_______||_|   |_||__| |__|  |_______||___| |_|  |__||___| |_|\n' +
					'\n' +
					'"Luma Link" was a puzzle game where you slide futuristic tiles to get the ball to the end.\n' +
					'I setup a content managment system that allowed for daily levels to be setup.\n\n'
			},
			'/games/veggie-tales': {
				content:
					' __ __    ___   ____   ____  ____    ___      ______   ____  _        ___  _____\n' +
					'|  |  |  /  _] /    | /    ||    |  /  _]    |      | /    || |      /  _]/ ___/\n' +
					'|  |  | /  [_ |   __||   __| |  |  /  [_     |      ||  o  || |     /  [_(   \_ \n' +
					'|  |  ||    _]|  |  ||  |  | |  | |    _]    |_|  |_||     || |___ |    _]\__  |\n' +
					'|  :  ||   [_ |  |_ ||  |_ | |  | |   [_       |  |  |  _  ||     ||   [_ /  \ |\n' +
					' \   / |     ||     ||     | |  | |     |      |  |  |  |  ||     ||     |\    |\n' +
					'  \_/  |_____||___,_||___,_||____||_____|      |__|  |__|__||_____||_____| \___|\n' +
					'\n' +
					'"Veggie Tales: League Of Incredible Vegetables" was a combat strategy game were you controlled\n' +
					'the veggie tales characters. I handled on the development for combat and UI.\n\n'
			},
			'/games/its-fred': {
				content:
					' _______ __  __             _______                __ \n' +
					'|_     _|  ||  |.-----.    |    ___|.----.-----.--|  |\n' +
					' _|   |_|   _|_||__ --|    |    ___||   _|  -__|  _  |\n' +
					'|_______|____|  |_____|    |___|    |__| |_____|_____|\n' +
					'                                                      \n' +
					'"It\'s Fred" was a game based from Fred Figglehorn, a Youtube Personality. You can throw the\n' +
					'character around as a ragdoll and collect different items.\n\n'
			},
			'/interactive': {},
			'/interactive/ces2020': {
				content:
					':\'######::\'########::\'######::::::\'#######::::\'#####::::\'#######::::\'#####:::\n' +
					'\'##... ##: ##.....::\'##... ##::::\'##.... ##::\'##.. ##::\'##.... ##::\'##.. ##::\n' +
					' ##:::..:: ##::::::: ##:::..:::::..::::: ##:\'##:::: ##:..::::: ##:\'##:::: ##:\n' +
					' ##::::::: ######:::. ######::::::\'#######:: ##:::: ##::\'#######:: ##:::: ##:\n' +
					' ##::::::: ##...:::::..... ##::::\'##:::::::: ##:::: ##:\'##:::::::: ##:::: ##:\n' +
					' ##::: ##: ##:::::::\'##::: ##:::: ##::::::::. ##:: ##:: ##::::::::. ##:: ##::\n' +
					'. ######:: ########:. ######::::: #########::. #####::: #########::. #####:::\n' +
					':......:::........:::......::::::.........::::.....::::.........::::.....::::\n' +
					'\n' +
					'"CES 2020" I worked with Bell to create a virtual city with 1000 AI characters and vehicles traveling in the city.\n' +
					'Scripted events would trigger at different times of day to showcase emergency situation with on demand mobility. \n\n'
			},
			'/interactive/future-flight-controls': {
				content:
					'                               \n' +
					' _|_|_|_|  _|_|_|_|    _|_|_|  \n' +
					' _|        _|        _|        \n' +
					' _|_|_|    _|_|_|    _|        \n' +
					' _|        _|        _|        \n' +
					' _|        _|          _|_|_| \n' +
					'                              \n' +
					'"Future Flight Controls" was a project where we create a simulation that allowed non-pilots to try new approchable\n' +
					'control schemes.\n\n'
			},
			'/interactive/ces2019': {
				content:
					'  /$$$$$$  /$$$$$$$$  /$$$$$$         /$$$$$$   /$$$$$$    /$$    /$$$$$$ \n' +
					' /$$__  $$| $$_____/ /$$__  $$       /$$__  $$ /$$$_  $$ /$$$$   /$$__  $$\n' +
					'| $$  \\__/| $$      | $$  \\__/      |__/  \\ $$| $$$$\\ $$|_  $$  | $$  \\ $$\n' +
					'| $$      | $$$$$   |  $$$$$$         /$$$$$$/| $$ $$ $$  | $$  |  $$$$$$$\n' +
					'| $$      | $$__/    \\____  $$       /$$____/ | $$\\ $$$$  | $$   \\____  $$\n' +
					'| $$    $$| $$       /$$  \\ $$      | $$      | $$ \\ $$$  | $$   /$$  \\ $$\n' +
					'|  $$$$$$/| $$$$$$$$|  $$$$$$/      | $$$$$$$$|  $$$$$$/ /$$$$$$|  $$$$$$/\n' +
					' \\______/ |________/ \\______/       |________/ \\______/ |______/ \\______/ \n' +
					'\n' +
					'"CES 2019" Setup a 3D Presentation showcasing the new solutions for urban mobility.\n\n'
			},
			'/interactive/motor-parts-of-america': {
				content:
					' _____ ______   ________  ________     \n' +
					'|\\   _ \\  _   \\|\\   __  \\|\\   __  \\    \n' +
					'\\ \\  \\\\\\__\\ \\  \\ \\  \\|\\  \\ \\  \\|\\  \\   \n' +
					' \\ \\  \\\\|__| \\  \\ \\   ____\\ \\   __  \\  \n' +
					'  \\ \\  \\    \\ \\  \\ \\  \\___|\\ \\  \\ \\  \\ \n' +
					'   \\ \\__\\    \\ \\__\\ \\__\\    \\ \\__\\ \\__\\\n' +
					'    \\|__|     \\|__|\\|__|     \\|__|\\|__|\n' +
					'                                       \n' +
					'"Motor Parts of America" worked with team to refine and improve the look and feel of the MPA mobile application.\n\n'
			},
			'/links': {},
			'/links/twitter': {
				content:
					"Twitter profile: https://twitter.com/Adamcbrz\n\ncall 'open twitter' to open the link in a new window\n\n",
				link: 'https://twitter.com/Adamcbrz'
			},
			'/links/linkedin': {
				content:
					"LinkedIn profile: https://www.linkedin.com/in/adamcbrz/\n\ncall 'open linkedin' to open the link in a new window\n\n",
				link: 'https://www.linkedin.com/in/adamcbrz/'
			},
			'/links/medium': {
				content:
					"Medium profile: https://medium.com/@Adamcbrz\n\ncall 'open medium' to open the link in a new window\n\n",
				link: 'https://medium.com/@Adamcbrz'
			}
		});
		const commandMapping = CommandMapping.create({
			...defaultCommandMapping,
			help: {
				function: (state, opts) => {
					return {
						output: OutputFactory.makeTextOutput(
							'Commands\n==================================\n\n' +
							'cat:           Print file content\n\n' +
							'cd:            Change directory\n\n' +
							'help:          Display the list of commands\n\n' +
							'ls:            List directory\n\n' +
							'open [link]:   Opens link in browser\n\n' +
							'\n' +
							'Recommendation\n==================================\n\nTry changing directory to home and listing the directory \nto see the different options:\n\n' +
							'ls\n\n'
						)
					};
				},
				optDef: {}
			},
			list: {
				function: (state, opts) => {
					console.log(state);
					console.log('history');
					console.log(state.GetHistory());

					return { output: OutputFactory.makeTextOutput('done') };
				},
				optDef: {}
			},
			print: {
				function: (state, opts) => {
					let path = state.getEnvVariables().get('cwd');
					let filePath = path;
					//console.log(filePath);
					if (opts[0]) {
						if (opts[0].charAt(0) === '/') {
							filePath = opts[0];
						} else {
							if (filePath === '/') {
								filePath = '/' + opts[0];
							} else {
								filePath += '/' + opts[0];
							}
						}
					}
					let fs = state.getFileSystem();
					let file = fs.get(filePath);
					let js = file.toJS() || {};

					let { content, htmlContent } = js;

					if (htmlContent) {
						console.log(htmlContent);
						let title = figlet.textSync(htmlContent.title, {
							font: 'ANSI_Shadow'
						});


						console.log(title);
						//  return {
						//  	output: createPaperRecord(title, htmlContent.body)
						// };
					} else if (content) {
						console.log(content);
						return {
							output: OutputFactory.makeTextOutput(content)
						};
					} else {
						return {
							output: OutputFactory.makeErrorOutput(
								'No Content Found!'
							)
						};
					}
				},
				optDef: {}
			},
			README: {
				function: (state, opts) => {
					return {
						output: OutputFactory.makeTextOutput(
							'Command not found!\n\nSuggestion: print README\n\n'
						)
					};
				},
				optDef: {}
			},
			skills: {
				function: (state, opts) => {
					return {
						output: OutputFactory.makeTextOutput(
							'Command not found!\n\nSuggestion: print skills\n\n'
						)
					};
				},
				optDef: {}
			},
			open: {
				function: (state, opts) => {
					let path = state.getEnvVariables().get('cwd');
					let filePath = path;
					console.log(filePath);
					if (opts[0]) {
						if (opts[0].charAt(0) === '/') {
							filePath = opts[0];
						} else {
							if (filePath === '/') {
								filePath = '/' + opts[0];
							} else {
								filePath += '/' + opts[0];
							}
						}
					}
					console.log(filePath);
					let { link } = state
						.getFileSystem()
						.get(filePath)
						.toJS();

					// let files =
					// 	state._immutable._root.entries[0][1]._root.entries;
					// let url = null;
					// console.log(files);
					// for (var i = 0; i < files.length; i++) {
					// 	console.log(files[i][0] + ' : ' + filePath);
					// 	if (files[i][0] === filePath) {
					// 		url = files[i][1]._root.entries[0][1];
					// 		break;
					// 	}
					// }

					if (link != null) {
						window.open(link, '_blank');
						return {
							output: OutputFactory.makeTextOutput(
								'Opening Website: ' + link + '\n\n'
							)
						};
					} else {
						return {
							output: OutputFactory.makeTextOutput(
								'Nothing to open \n\n'
							)
						};
					}
				},
				optDef: {}
			}
		});

		const customState = EmulatorState.create({
			fs: fileSystem,
			commandMapping: commandMapping
		});

		this.state = {
			emulatorState: customState,
			inputStr: 'print README',
			promptSymbol: 'website->'
		};
	}

	render() {
		// Font.create('Test', (err, results) => {
		// 	console.log(err);
		// 	console.log(results);
		// });


		return (
			<div>
				<ReactTerminalStateless
					promptSymbol={this.state.promptSymbol}
					inputStr={this.state.inputStr}
					emulatorState={this.state.emulatorState}
					theme={ReactThemes.hacker}
					// outputRenderers={{
					// 	...ReactOutputRenderers,
					// 	[PAPER_TYPE]: PaperOutput
					//   }}
					onInputChange={inputStr => this.setState({ inputStr })}
					onStateChange={emulatorState => {
						this.setState({
							emulatorState,
							inputStr: ''
						});
					}}
				/>
			</div>
		);
	}
}

export default App;
