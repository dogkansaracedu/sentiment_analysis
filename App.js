//import logo from './logo.svg';
import React, {Component, useState, useEffect} from 'react';
import './App.css';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';

class App extends Component {
    state = {
        result: ''
    };


    PostData = (event) => {
        this.setState({ result: 'Loading...'})
        //alert('deneme')
        try {
            var axios = require('axios');
            var data = JSON.stringify({"language": this.inputNode.value});

            var config = {
                method: 'post',
                mode: 'no-cors',
                url: 'http://127.0.0.1:5000/',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)

                .then(response => this.setState({ result: response.data.result}))
                .catch(function (error) {
                    console.log(error);
                });


        } catch (e) {
            console.log(e)
        }
        return false;

    }

    render() {

        return (
            <div className="App">
                <header className="App-header">

                    <p>
                        Enter your text:
                    </p>

                    <label>
                        <TextareaAutosize  type="text" name={"txt"} placeholder={"Sample Text"} className={"textinput"} cols="50" minRows={5} maxRows={10}
                                  ref={node => (this.inputNode = node)}/>
                    </label>
                    <br/>
                    <button onClick={() => this.PostData()} className={"block"}>Submit</button>
                    <br/>
                    {this.state.result}
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    </a>

                </header>
            </div>
        );
    }
}

export default App;
