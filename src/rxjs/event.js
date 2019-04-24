import {fromEvent} from 'rxjs';
import {pluck} from 'rxjs/operators'

const currentTarget$ = fromEvent(document, 'click')
    .pipe(
        pluck("currentTarget")
    ); // observable
const observer = currentTarget => {
    console.log(currentTarget);
};
currentTarget$.subscribe(observer());

// click이 발생하면 currentTarget$은 event객체의 currentTarget을 전달한다.
// observer는 currentTarget을 구독함으로써 currentTarget 데이터를 전달받을 수 있다.

