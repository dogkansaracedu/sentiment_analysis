import logo from './logo.svg';
import axios from 'axios';
import React, { Component } from 'react';
import './App.css';


class App extends Component{
    state = {
        result: ''
    };

    PostData= (event) => {
        //alert('deneme')event.preventDefault()
        try {
            let axios = require('axios');
            let data = this.inputNode.value;

            let config = {
                method: 'post',
                mode: 'no-cors',
                url: 'http://127.0.0.1:5000/',
                headers: {
                    'Content-Type': 'application/json'
                },
                data : data
            };

            axios(config)
                .then(response => this.setState({ result: response.data}))
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
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Enter your text:
                    </p>

                    <label>
                        <input type="text" name={"txt"} placeholder={"Text"} ref={node => (this.inputNode = node)}/>
                    </label>
                    <br/>
                    <button onClick={ () => this.PostData() }>Submit </button>

                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    </a>
                    {this.state.result}

                </header>
            </div>
        );
    }
}

export default App;
