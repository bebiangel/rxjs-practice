import React, {Component} from 'react';
import './_Carousel.css';

import {fromEvent, merge} from 'rxjs';
import {first, map, scan, share, startWith, switchMap, takeUntil, withLatestFrom} from 'rxjs/operators';

class Carousel extends Component {
    //
    componentDidMount() {
        //
        const THRESHOLD = 30;
        const DEFAULT_DURATION = 300;
        const $view = document.getElementById("carousel");
        const $container = $view.querySelector(".container");
        const PANEL_COUNT = $container.querySelectorAll(".panel").length;
        const SUPPORT_TOUCH = "ontouchstart" in window;
        const EVENTS = {
            start: SUPPORT_TOUCH ? "touchstart" : "mousedown",
            move: SUPPORT_TOUCH ? "touchmove" : "mousemove",
            end: SUPPORT_TOUCH ? "touchend" : "mouseup"
        };

        function translateX(posX) {
            $container.style.transform = `translate3d(${posX}px, 0, 0)`;
        }

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
        const drag$ = start$.pipe(
            switchMap(start => {
                return move$.pipe(
                    map(move => move - start),
                    takeUntil(end$)
                );
            }),
            share(),
            map(distance => ({distance}))
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
            withLatestFrom(size$, (drag, size) => {
                return {...drag, size};
            })
        );


        const carousel$ = merge(drag$, drop$)
            .pipe(
                scan((store, {distance, size}) => {
                    const updateStore = {
                        from: -(store.index * store.size) + distance
                    };

                    if (size === undefined) { // drag 시점
                        updateStore.to = updateStore.from;
                    } else {  // drop 시점
                        let tobeIndex = store.index;
                        if (Math.abs(distance) >= THRESHOLD) {
                            tobeIndex = distance < 0 ?
                                Math.min(tobeIndex + 1, PANEL_COUNT - 1) :
                                Math.max(tobeIndex - 1, 0);
                        }
                        updateStore.index = tobeIndex;
                        updateStore.to = -(tobeIndex * size);
                        updateStore.size = size;
                    }
                    return {...store, ...updateStore};
                }, {
                    from: 0,
                    to: 0,
                    index: 0,
                    size: 0,
                })
            )
        carousel$.subscribe(store => {
            console.log("캐로셀 데이터", store);
            translateX(store.to);
        });
    }

    render() {
        //
        // of(10, 10, 20, 0, 50).pipe(
        //     reduce((acc, value, index) => {
        //         acc.sum += value;
        //         acc.ave = acc.sum / (index + 1);
        //         return acc;
        //     }, {
        //         sum: 0,
        //         ave: 0
        //     })
        // ).subscribe(v => console.log("reduce", v));
        // console.log("====================");
        //
        // of(10, 10, 20, 0, 50).pipe(
        //     scan((acc, value, index) => {
        //         acc.sum += value;
        //         acc.ave = acc.sum / (index + 1);
        //         return acc;
        //     }, {
        //         sum: 0,
        //         ave: 0
        //     })
        // ).subscribe(v => console.log("scan", v));

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