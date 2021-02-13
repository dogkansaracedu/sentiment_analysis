import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

class HistoryPage extends Component {

    state = {
        history: "1234567890"
    };

    componentDidMount = (event) => {
        axios.get(`http://127.0.0.1:5000/`)
            .then(response => this.setState({history: response.data.history}
            ));
        return false;
    }



    render() {

        return (
            <div className="App">
                <header className="App-header">
                  <p>Here is the last 10 data:</p>
                  1)  ID: {this.state.history[9][0]}  LANGUAGE: {this.state.history[9][1]} TEXT: {this.state.history[9][2]} RESULT: {this.state.history[9][3]}<br/>
                  2)  ID: {this.state.history[8][0]}  LANGUAGE: {this.state.history[8][1]} TEXT: {this.state.history[8][2]} RESULT: {this.state.history[8][3]}<br/>
                  3)  ID: {this.state.history[7][0]}  LANGUAGE: {this.state.history[7][1]} TEXT: {this.state.history[7][2]} RESULT: {this.state.history[7][3]}<br/>
                  4)  ID: {this.state.history[6][0]}  LANGUAGE: {this.state.history[6][1]} TEXT: {this.state.history[6][2]} RESULT: {this.state.history[6][3]}<br/>
                  5)  ID: {this.state.history[5][0]}  LANGUAGE: {this.state.history[5][1]} TEXT: {this.state.history[5][2]} RESULT: {this.state.history[5][3]}<br/>
                  6)  ID: {this.state.history[4][0]}  LANGUAGE: {this.state.history[4][1]} TEXT: {this.state.history[4][2]} RESULT: {this.state.history[4][3]}<br/>
                  7)  ID: {this.state.history[3][0]}  LANGUAGE: {this.state.history[3][1]} TEXT: {this.state.history[3][2]} RESULT: {this.state.history[3][3]}<br/>
                  8)  ID: {this.state.history[2][0]}  LANGUAGE: {this.state.history[2][1]} TEXT: {this.state.history[2][2]} RESULT: {this.state.history[2][3]}<br/>
                  9)  ID: {this.state.history[1][0]}  LANGUAGE: {this.state.history[1][1]} TEXT: {this.state.history[1][2]} RESULT: {this.state.history[1][3]}<br/>
                  10) ID: {this.state.history[0][0]}  LANGUAGE: {this.state.history[0][1]} TEXT: {this.state.history[0][2]} RESULT: {this.state.history[0][3]}<br/>

                  <Link to = "/"> Go back to main page </Link>
              </header>
            </div>
        );
    }
}

export default HistoryPage;