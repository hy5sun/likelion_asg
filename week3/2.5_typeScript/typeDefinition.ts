// 타입들을 조합하여 사용
const user = {
    name: 'hyosun',
    age: 23,
}

// interface 사용
interface User1 {
    name: string;
    age: number;
}

const user1: User1 = {
    name: 'hyosun',
    age: 23,
}

// interface는 class로 선언할 수 있다.
class User { //public 선언을 안 하면 자동으로 public이 됨
    constructor(name: string, ange: number) {}
}

const user2: User = new User('Hyosun', 23);

// type 키워드로 새로운 타입 생성 가능
type MyUser = User; // 기존 User 타입을 그대로 사용하지만 본인이 사용하는 도메인에 맞는 이름으로 바꿈