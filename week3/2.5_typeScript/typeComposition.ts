// 유니언 타입 : 여러 타입을 조합
// 아래 코드에서는 obj가 문자 혹은 문자열 타입을 갖는다.
function getLength(obj: string | string[]) {
    return obj.length;
}

// 유니언 타입을 통해 변수가 가질 수 있는 값을 제한할 수도 있다.
type Status = "ready" | "waiting";

// 타입스크립트는 열거형을 제공한다.
enum Status1 {
    READY = "ready",
    WAITING = "waiting",
}

/* 제네릭 타입:어떤 타입이든 정의되지만, 호출되는 시점에 따라 타입이 결정된다.
반환값이 any이기 때문에 arg에 'test'를 인수로 전달하면 전달한 인수의 string 타입이 반환할 때 any가 된다.
*/
function identity(arg: any): any {
    return arg;
}

/* 아래처럼 제네릭 타입을 사용하면 리턴되는 값의 타입은 함수를 호출하는 시점의 인수로 넣은 타입으로 결정된다.*/
function identity1<T>(arg: T): T {
    return arg;
}