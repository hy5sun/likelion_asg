import { input } from "./input";
import { gotoPost, isLogout } from "./post";

console.log(`CLI 버전 인스타그램에 오신 여러분을 환영합니다.
로그인을 안 하시면 아무것도 할 수 없습니다.`);

type Client = {
    id: number;
    name: string;
    email: string;
    password: string;
}

type ClientInput = Omit<Client, 'id'>;
type ClientLoginInput = Omit<Client, "id" | "name">;

let clients: Client[] = [];
let isLogined: number = 0;
let inputName: String;
let imputEmail: String;
let inputPassword: String;

const createClient = (clientInfo: ClientInput) => {
    clients.push({
        id: clients.length + 1,
        ... clientInfo,
    })

    console.log('회원가입 성공!');
    
};

const loginClient = (loginInfo: ClientLoginInput) => {
    let findClient = clients.find(client => client.email === loginInfo.email && client.password === loginInfo.password);

    if (findClient && isLogined === 0) { //로그인 성공
        console.log(`${findClient.name}님 환영합니다~`);
        gotoPost(findClient.id);
        isLogined = 1;
    } else {
        console.log('로그인 실패!');
    }
};

export const initQuestion = async () => {

    let option = '';

    do {
        // 근데 너무 비효율적으로 보이는 ㅠㅠ
        if (isLogout === 1) { //로그아웃 되어있으면 
            isLogined = 0; // 로그인 안 되어있는 걸로 수정
        }
        
        console.log(`
        1. 로그인
        2. 회원가입
        0. 그냥 나가기
        `);
        option = await input("선택하세요: ");

        switch (option) {
            case '1': {
                const email = await input('이메일: ');
                const password = await input('비밀번호: ');
                loginClient({email, password}); 
                break;
            }
            case '2': {
                const name = await input('이름: ');
                const email = await input('이메일: ');
                const password = await input('비밀번호: ');
                createClient({name, email, password});
                break;
            }
            case '0':
                break;
            default:
                console.log('Invalid option');
                break;
        }
    } while (option !== '0' && isLogined !== 1);
};

initQuestion();