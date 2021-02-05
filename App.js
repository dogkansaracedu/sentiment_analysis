//import logo from './logo.svg';
import React, {Component, useState, useEffect} from 'react';
import './App.css';


class App extends Component {
    state = {
        result: ''
    };


    PostData = (event) => {
        this.setState({ result: 'Loading...'})
        //alert('deneme')event.preventDefault()
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

    /*
    getData(){
        var axios = require('axios');
        axios.get("http://127.0.0.1:5000/")
            .then( (response) => {
                this.setState({response: response})
            })
            .catch( (error) => {
                console.log(error);
            })
        if(!this.state.response) return null;  //added this line
        return this.state.response
    }*/

    render() {


        return (
            <div className="App">
                <header className="App-header">

                    <p>
                        Enter your text:
                    </p>

                    <label>
                        <input type="text" name={"txt"} placeholder={"Sample Text"}
                               ref={node => (this.inputNode = node)}/>
                    </label>
                    <br/>
                    <button onClick={() => this.PostData()}>Submit</button>
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

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">

        <p>
          Enter your text:
        </p>

        <form>
          <label>
            <input type="text" placeholder={"Sample Text"}/>
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
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
    ///////////////
      returnedVal() {
      // eslint-disable-next-line react-hooks/rules-of-hooks
        const [currentData, setCurrentdata] = useState(0);
      // eslint-disable-next-line react-hooks/rules-of-hooks
        const [loading, setLoading] = useState(true)

      // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true)
            fetch('http://localhost:5000/').then(res => res.json()).then(data => {
                setCurrentdata(data.language);
            });
            setLoading(false)
        }, []);

        if (loading) return <h1>Loading data...</h1>
        return (
            <p> {currentData}.</p>
        );
    }
 */