import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {range, from, fromEvent, Observable} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {map, filter, mergeAll, debounceTime, mergeMap, distinctUntilChanged} from 'rxjs/operators';
import Carousel from "./components/Carousel";
import {scheduler} from "./rxjs/scheduler";


class App extends Component {
    //
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        //
        // const keyup$ = fromEvent(document.getElementById("search"), 'keyup')
        //     .pipe(
        //         map(event => event.target.value)
        //     );
        // keyup$.subscribe(event => console.log("사용자 입력의 KeyboardEvent", event));
        //
        // const request$ = from(fetch('https://api.github.com/search/users?q=sculove')
        //     .then(res => res.json()));
        // request$.subscribe(json => console.log("서버로 부터 전달 받은 json 값", json));
        //
        // const user$ = fromEvent(document.getElementById('search'), 'keyup')
        //     .pipe(
        //         debounceTime(300), // 입력할때마다 ajax호출하면 404 error를 방지한다.
        //         map(event => event.target.value),
        //         distinctUntilChanged(), //특수키가 입력된 경우에는 나오지 않도록 하기 위함.
        //         filter(query => query.trim().length > 0), // 빈공백으로 호출할경우 422 error를 방지한다.
        //         mergeMap(query => ajax.getJSON(`https://api.github.com/search/users?q=${query}`)),
        //         // mergeAll()
        //     );
        // user$.subscribe(value => this.setState({users: value.items}))


        //
        // const users$ = from([{
        //     name: "유비",
        //     birthYear: 161,
        //     nationality: "촉",
        // }, {
        //     name: "손권",
        //     birthYear: 182,
        //     nationality: "오"
        // }, {
        //     name: "관우",
        //     birthYear: 160,
        //     nationality: "촉",
        // }, {
        //     name: "장비",
        //     birthYear: 168,
        //     nationality: "촉",
        // }, {
        //     name: "조조",
        //     birthYear: 155,
        //     nationality: "위"
        // }, {
        //     name: "손권",
        //     birthYear: 182,
        //     nationality: "오"
        // }
        // ]).pipe(
        //     filter(user => user.nationality === "촉")
        // )
        // const observer = user => console.log(user);
        // users$.subscribe(observer);
        // console.log(users$);


        // const numbers$ = Observable.create(observer => {
        //
        //     try {
        //         observer.next(1);
        //         observer.next(2);
        //         // 에러 발생시
        //         throw new Error("데이터 전달 도중 에러가 발생했씁니다.");
        //         observer.next(3);
        //     } catch (e) {
        //         observer.error(e);
        //     }
        // });
        // numbers$.subscribe({
        //     next: v => console.log(v),
        //     error: e => console.log(e)
        // });
        //
        // const click$ = fromEvent(document, 'click');
        // click$.subscribe({
        //     next: v => console.log('click 이벤트 발생'),
        //     error: err => console.log(err),
        //     complete: () => console.log('완료')
        // });
        //
        // const arguments$ = (function () {
        //     return from(arguments)
        // })(1, 2, 3)
        //     .subscribe({
        //         next: v => console.log(v),
        //         error: err => console.log(err),
        //         complete: () => console.log('완료')
        //     })

        // scheduler();
    }

    drawLayer = (items) => {
        //
        this.$layer.innerHTML = items.map(user => {
            console.log(user);
            return (
                <li className={'user'}>
                    <img src={user && user.avatar_url} width={'50px'} height={'50px'}/>
                    <p><a href={user.html_url} target={"_blank"}>${user && user.login}</a></p>
                </li>
            )
        }).join('');
    };

    render() {
        // const keyup$ = fromEvent(document.getElementById("search"), 'keyup');
        // keyup$.subscribe(event => console.log("사용자 입력의 KeyboardEvent", event));
        return (
            <div className="App">
                <h2 className="bus">RxJS Example</h2>
                {/*자동완성 UI 영역 (시작) */}
                <div className="autocomplete">
                    <input type="input" placeholder="검색하고 싶은 버스 번호를 입력해주세요"/>
                    <ul className="layer"/>
                    <div className="loading">
                        <i className="fas fa-spinner fa-pulse"/>
                    </div>
                </div>
                {/*<Carousel/>*/}
                <main>
                    {/*지도 영역 (시작)*/}
                    <article className="map"/>
                    {/*지도 영역 (끝)*/}
                    {/*사이드바 영역 (시작) */}
                    <aside className="stations">
                        <div className="title-container">
                            <span className="title"/>
                        </div>
                        <ul/>
                    </aside>
                    {/*사이드바 영역 (끝)*/}
                </main>
            </div>
        );
    }
}

export default App;
