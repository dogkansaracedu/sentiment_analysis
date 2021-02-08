//import logo from './logo.svg';
import React, {Component, useState, useEffect} from 'react';
import './App.css';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import ReactLoading from "react-loading";
import Select from 'react-select'

const options = [
    {value: 'EN', label: 'English'},
    {value: 'TR', label: 'Turkish'}
];

class App extends Component {
    state = {
        result: '',
        done: true,
        value: ""
    };

    handleChange = (event) =>
        this.setState({value: event});

    PostData = (event) => {
        this.setState({done: false});

        try {
            var axios = require('axios');
            var data = JSON.stringify({'text': this.inputNode.value,
                'language': this.state.value});

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

                .then(response => this.setState({result: response.data.result}))
                .then(json => this.setState({done: true}))
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
                    <Select value={this.state.value} onChange={this.handleChange} className='selectW' placeholder = 'Language' options={options}>  </Select>
                    <br/>
                    <label>
                        <TextareaAutosize  type="text" name={"txt"} placeholder={"Sample Text"} className={"textinput"}
                                           cols="50" minRows={5} maxRows={10} maxLength={200}
                                           ref={node => (this.inputNode = node)}/>
                    </label>
                    <br/>
                    <button onClick={() => this.PostData()} className={"block"}>Submit</button>
                    <br/>
                    {!this.state.done ?( <ReactLoading type={"bars"} color={"white"} />)
                        :(this.state.result)
                    }
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
