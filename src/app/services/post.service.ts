import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Post} from "../models/post.model";
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    posts: Post[] = [];
    postSubject = new Subject<Post[]>();

    constructor() {
        this.getPosts();
    }

    emitPost() {
        this.postSubject.next(this.posts);
    }

    getPosts() {
        firebase.database().ref('/post').on('value', (data) => {
            this.posts = data.val() ? data.val() : [];
            this.emitPost();
        });
    }

    savePost() {
        firebase.database().ref('/post').set(this.posts);
    }

    createNewPost(newPost: Post) {
        this.posts.push(newPost);
        this.savePost();
        this.emitPost()
    }

    removePost(post: Post) {
        const PostIndexToRemove = this.posts.findIndex(
            (postEl) => {
                if (post === postEl) {
                    return true;
                }
            }
        );
        this.posts.splice(PostIndexToRemove, 1);
        this.savePost();
        this.emitPost();
    }

    lovePost(post: Post) {
        const postIndexToLove = this.findIndexPost(post);
        post.loveIts += 1;
        this.posts[postIndexToLove] = post;
        this.savePost();
        this.emitPost()
    }

    dontLovePost(post: Post) {
        const postIndexToLove = this.findIndexPost(post);
        post.loveIts -= 1;
        this.posts[postIndexToLove] = post;
        this.savePost();
        this.emitPost()
    }

    private findIndexPost(post: Post) {
        return this.posts.findIndex(
            (postEl) => {
                if (post === postEl) {
                    return true;
                }
            }
        );
    }
}
