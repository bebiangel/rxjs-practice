import React, {Component} from 'react';
import './_Carousel.css';

import {fromEvent, merge} from 'rxjs';
import {map, startWith, switchMap, takeUntil, tap, share, first, withLatestFrom} from 'rxjs/operators';

class Carousel extends Component {
    //
    componentDidMount() {
        //
        const $view = document.getElementById("carousel");
        const $container = $view.querySelector(".container");
        const PANEL_COUNT = $container.querySelectorAll(".panel").length;
        const SUPPORT_TOUCH = "ontouchstart" in window;
        const EVENTS = {
            start: SUPPORT_TOUCH ? "touchstart" : "mousedown",
            move: SUPPORT_TOUCH ? "touchmove" : "mousemove",
            end: SUPPORT_TOUCH ? "touchend" : "mouseup"
        };


        function toPos(obs$) {
            return obs$.pipe(
                map(v => SUPPORT_TOUCH ? v.changedTouches[0].pageX : v.pageX)
            );
        }

        const start$ = fromEvent($view, EVENTS.start).pipe(toPos);
        const move$ = fromEvent($view, EVENTS.move).pipe(toPos);
        const end$ = fromEvent($view, EVENTS.end);
        const size$ = fromEvent(window, "resize").pipe(
            startWith(0),
            map(event => $view.clientWidth)
        )

        // size$.subscribe(width => console.log("view의 넓이", width));
        const drag$ = start$.pipe(
            switchMap(start => {
                return move$.pipe(
                    map(move => move - start),
                    takeUntil(end$)
                );
            }),
            // tap(v => console.log("drag$", v)),
            share()
        )

        // drag$.subscribe(distance => console.log("start$와 move$의 차이값", distance));
        const drop$ = drag$.pipe(
            // tap(v => console.log("drop$", v))
            switchMap(drag => {
                return end$.pipe(
                    map(event => drag), // drag는 drag$가 전달하는 start$와 move$의 위치 값의 거리
                    first()
                )
            }),
            withLatestFrom(size$)
        );
        // drop$.subscribe(array => console.log("drop", array));
        const carousel$ = merge(drag$, drop$)
        carousel$.subscribe(v => console.log("캐로셀 데이터", v));
    }

    render() {
        return (
            <div id="carousel" className="view">
                <ul className="container">
                    <li className="panel" style={{backgroundColor: 'lightgreen'}}>
                    </li>
                    <li className="panel" style={{backgroundColor: 'lightpink'}}>
                    </li>
                    <li className="panel" style={{backgroundColor: 'royalblue'}}>
                    </li>
                    <li className="panel" style={{backgroundColor: 'darkred'}}>
                    </li>
                </ul>
            </div>
        );
    }
};

export default Carousel;