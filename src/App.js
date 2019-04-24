import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {range} from 'rxjs';


class App extends Component {
    //

    render() {
        console.log(range(1, 10)
            .subscribe({
                next: console.log,
                error: console.error,
                complete: () => console.log('완료')
            }));
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    {}
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
