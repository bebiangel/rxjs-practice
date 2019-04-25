import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {range, from, fromEvent} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {map} from 'rxjs/operators';


class App extends Component {
    //

    componentDidMount() {
        //
        const keyup$ = fromEvent(document.getElementById("search"), 'keyup')
            .pipe(
                map(event => event.target.value)
            );
        keyup$.subscribe(event => console.log("사용자 입력의 KeyboardEvent", event));

        const request$ = from(fetch('https://api.github.com/search/users?q=sculove')
            .then(res => res.json()));
        request$.subscribe(json => console.log("서버로 부터 전달 받은 json 값", json));

        const user$ = fromEvent(document.getElementById('search'), 'keyup')
            .pipe(
                map(event => event.target.value),
                map(query => ajax.getJSON(`https://api.github.com/search/users?q=${query}`))
            );
        user$.subscribe(value => console.log("서버로 부터 전달 받은 json 값", value));
    }

    render() {
        console.log(range(1, 10)
            .subscribe({
                next: console.log,
                error: console.error,
                complete: () => console.log('완료')
            }));

        // const keyup$ = fromEvent(document.getElementById("search"), 'keyup');
        // keyup$.subscribe(event => console.log("사용자 입력의 KeyboardEvent", event));
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <input id="search" type="input"/>
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
