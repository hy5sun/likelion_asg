import { input } from "./input";
import { initQuestion } from "./initQ";

type Post = {
    id: number,
    writerId: number,
    content: string,
    createdAt: Date
}

type PostInput = Omit<Post, 'id' | 'createdAt'>;

let posts: Post[] = [];
const now = new Date();
export let isLogout: number = 0;

const createPost = (postInfo: PostInput) => {
    posts.push({
        id: posts.length + 1,
        ... postInfo,
        createdAt: now
    })

    console.log('게시물 작성 완료!');
};

const getAllPosts = () => {
    return posts;
}

const deletePost = (deleteId: number, loginedId: number) => {
    const postIndex = posts.findIndex((post) => post.id === deleteId);

    if (postIndex === -1) {
        return;
    }

    if (posts[postIndex].writerId === loginedId) {
        posts.splice(postIndex, 1);
    } else {
        console.log('본인 게시물이 아닙니다.');
    }

}

const logout = () => {
    isLogout = 1; //로그아웃 했음을 initQ.ts 파일에 알려주기 위함
    initQuestion();
}

export const gotoPost = async (loginedId: number) => {

    let option = '';

    do {
        console.log(`
        1. 피드보기
        2. 게시물 작성
        3. 게시물 삭제
        0. 로그아웃
        `);
        option = await input("선택하세요: ");

        switch (option) {
            case '1':
                console.log('피드보기');
                console.log(getAllPosts());
                break;
            case '2':
                console.log('게시물 작성하세요.');
                const content = await input('내용: ');
                createPost({writerId: loginedId, content});
                break;
            case '3':
                console.log('게시물 삭제');
                const deleteId = parseInt(await input('삭제할 게시물의 id: '));
                deletePost(deleteId, loginedId);
                break;
            case '0':
                console.log('로그아웃할게요');
                logout();
                break;
            default:
                console.log('Invalid option');
                break;
        }
    } while (option !== '0')
};
