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
//import ReactTerminal from 'ReactTerminal';
//import { ReactTerminal, EmulatorState, FileSystem, ReactThemes } from 'react-terminal-component';
import { ReactTerminalStateless, ReactThemes } from 'react-terminal-component';
//import { hasDirectory } from 'fs/operations/directory-operations';

figlet.parseFont('ANSI_Shadow', ANSI_Shadow);

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
					'Welcome to my website. This is a fun experiement to\n' +
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
			'/games/nyx': {},
			'/games/pants': {},
			'/games/deliver-it': {
				content:
					'Deliver It is a driving game similar to Smuggle Truck used as training game.\nThe game included humorous descriptions to assist in the training of users.\n' +
					"The game consist of a delivery truck that takes a load to the next stop.\nimage ref: <a href='http://adambrz.com/images/game_deliver_it.png'>image</a>",
				htmlContent: {
					title: 'Deliver-It',
					body: '/game_deliver_it.png'
				}
			},
			'/games/rockpocalpse': {},
			'/games/luma-link': {},
			'/games/veggie-tales': {},
			'/interactive': {},
			'/interactive/ces2020': {},
			'/interactive/future-flight-controls': {},
			'/interactive/ces2019': {},
			'/interactive/motor-parts-of-america': {},
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
					let { content, htmlContent } = state
						.getFileSystem()
						.get(filePath)
						.toJS();

					if (htmlContent) {
						console.log(htmlContent);
						let title = figlet.textSync(htmlContent.title, {
							font: 'ANSI_Shadow'
						});

						console.log(title);
						return {
							output: ['test', 'test2'] //OutputFactory.makeTextOutput(title) // createPaperRecord(title, htmlContent.body)
						};

						// return {
						// 	output: createPaperRecord(title, htmlContent.body)
						// };
					} else if (content) {
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
