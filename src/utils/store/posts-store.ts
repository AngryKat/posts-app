import { List } from "immutable";
import { makeAutoObservable } from "mobx"
import { Post, PostFormValues, PostId } from "../../types/post-types";

export class PostStore {
    private _posts = List<Post>([]);

    constructor() {
        makeAutoObservable(this);
    }

    public get posts(): Post[] {
        return this._posts.toJS() as Post[];
    }

    public set posts(posts: Post[]) {
        this._posts = List<Post>(posts);
    }

    public concatWithPostArray(posts: Post[]) {
        this._posts = this._posts.concat(posts);
        return this._posts.toJS() as Post[];
    }

    public addPost(newPost: Post) {
        this._posts = this._posts.insert(0, newPost);
    }

    public deletePost(id: PostId) {
        this._posts = this._posts.filter((post) => post.id !== id);
    }

    public editPost(id: PostId, newData: PostFormValues) {
        const postIndex = this._posts.findIndex((post) => post.id === id);
        this._posts = this._posts.update(postIndex, (oldPost: Post | undefined) => {
            return {
                ...oldPost,
                ...newData,
            } as Post;
        });
    }
};

const postStore = new PostStore();

export default postStore;