import logo from '/home/dogkansarac/IdeaProjects/untitled1/src/logo.svg';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import Select from 'react-select'
import React, {Component} from 'react';
import '/home/dogkansarac/IdeaProjects/untitled1/src/App.css';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom'


const options = [
    {value: 'EN', label: 'English'},
    {value: 'TR', label: 'Turkish'}
];

class MainPage extends Component {

    state = {
        result : '',
        done: true,
        value: ""
    };

    handleChange = (event) =>
        this.setState({value: event});

    PostData = (event) => {
        //alert('deneme')event.preventDefault()
        try {
            this.setState({done: false});
            let axios = require('axios');
            let data = JSON.stringify({'text': this.inputNode.value,
                'language': this.state.value});
            let config = {
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
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>Enter your text below:</p>
                    <Select value={this.state.value} onChange={this.handleChange} className='selectW' placeholder = 'Language' options={options}>  </Select>
                    <br/>
                    <label><TextareaAutosize maxLength={10000} cols={50} minRows={3} maxRows={7} type="text"
                                             name={"txt"} placeholder={"Text"} ref={node => (this.inputNode = node)}/>
                    </label>

                    <button className='buttonW' onClick={() => this.PostData()}>Submit</button>

                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    </a>
                    <br/>
                    {!this.state.done ? (<ReactLoading type={"bars"} color={"white"}/>)
                        : (this.state.result)
                    }
                    <Link to = "/secondpage"> Show Last 10 Data </Link>
                </header>
            </div>
        );
    }
}

export default MainPage;