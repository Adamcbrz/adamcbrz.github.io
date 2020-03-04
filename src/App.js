import { defaultCommandMapping, EmulatorState, CommandMapping, FileSystem, OutputFactory } from 'javascript-terminal';
import React, { Component } from 'react';
//import ReactTerminal from 'ReactTerminal';
//import { ReactTerminal, EmulatorState, FileSystem, ReactThemes } from 'react-terminal-component';
import { ReactTerminal, ReactThemes } from 'react-terminal-component';
import { readFile, isFile } from 'javascript-terminal';
//import { hasDirectory } from 'fs/operations/directory-operations';

class App extends Component {

  constructor() {
    super();
    const fileSystem = FileSystem.create({
      '/README': { content: 'Welcome to my website. I am Adam Brzozowski, and this is a fun experiement to\nshowcase my portfolio and stuff I have done.\n\nType "help" in the console for a list of commands\n\n' },
      '/skills': {
        content: 'I have listed out my most used skills and abilities along with my skill level\n\n' +
          'Unity:          █ █ █ █ █ █ █ █ █ █ █\n' +
          'C#:             █ █ █ █ █ █ █ █ █\n' +
          'Unreal:         █ █ █ █ █ █ █\n' +
          'C++:            █ █ █ █\n' +
          'Swift:          █ █ █ █ █\n' +
          'React:          █ █ █ █ █\n' +
          'Photoshop:      █ █ █ █ █ █\n' +
          '\n\n'
      },
      '/games': {},
      '/games/nyx': {},
      '/games/pants': {},
      '/games/deliver-it': { content: "Deliver It is a driving game similar to Smuggle Truck used as training game.\nThe game included humorous descriptions to assist in the training of users.\nThe game consist of a delivery truck that takes a load to the next stop.\nimage ref: <a href='http://adambrz.com/images/game_deliver_it.png'>image</a>" },
      '/games/rockpocalpse': {},
      '/games/luma-link': {},
      '/games/veggie-tales': {},
      '/interactive': {},
      '/interactive/ces2020': {},
      '/interactive/future-flight-controls': {},
      '/interactive/ces2019': {},
      '/interactive/motor-parts-of-america': {},
      '/links': {},
      '/links/twitter': { content: "https://twitter.com/Adamcbrz" },
      '/links/linkedin': { content: "https://www.linkedin.com/in/adamcbrz/" },
      '/links/medium': { content: "https://medium.com/@Adamcbrz" }
    });
    const commandMapping = CommandMapping.create({
      ...defaultCommandMapping,
      'help': {
        'function': (state, opts) => {
          return {
            output: OutputFactory.makeTextOutput('Commands\n==================================\n\n' +
              'cat:           Print file content\n\n' +
              'cd:            Change directory\n\n' +
              'help:          Display the list of commands\n\n' +
              'ls:            List directory\n\n' +
              'open [link]:   Opens link in browser\n\n' +
              "\n" +
              "Recommendation\n==================================\n\nTry changing directory to home and listing the directory \nto see the different options:\n\n" +
              "ls\n\n"

            )
          }
        },
        'optDef': {}
      },
      'open': {
        'function': (state, opts) => {
          console.log(isFile())
          console.log(state._immutable._root.entries[1][1]._root);
          console.log(opts);
          let path = state._immutable._root.entries[1][1]._root.entries[0][1];
          let filePath = path
          if (opts[0]) {
            if (opts[0].charAt(0) == '/') {
              filePath = opts[0]
            }
            else {
              filePath += '/' + opts[0];
            }
          }
          let files = state._immutable._root.entries[0][1]._root.entries;
          let url = null;
          console.log(files);
          for (var i = 0; i < files.length; i++) {
            console.log(files[i][0] + " : " + filePath);
            if (files[i][0] == filePath) {
              url = files[i][1]._root.entries[0][1];
              break;
            }
          }

          if (url != null) {
            window.open(url, "_blank");
            return {
              output: OutputFactory.makeTextOutput('Opening Website: ' + url)
            }
          }
          else {
            return {
              output: OutputFactory.makeTextOutput('Nothing to open')
            }
          }
        },
        'optDef': {}
      }
    });

    const customState = EmulatorState.create({
      'fs': fileSystem,
      'commandMapping': commandMapping
    });
    this.state = {
      emulatorState: customState,
      inputStr: 'cat README',
      promptSymbol: '>;'
    }


  }

  render() {


    return (
      <div>
        <ReactTerminal promptSymbol={this.promptSymbol} inputStr={this.inputStr}
          emulatorState={customState} theme={ReactThemes.hacker}
          onInputChange={(inputStr) => this.setState({ inputStr })}
          onStateChange={(emulatorState) => this.setState({ emulatorState })}
        />
      </div>
    );
  }
}

export default App;
