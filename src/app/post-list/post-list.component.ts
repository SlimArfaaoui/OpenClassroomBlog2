import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../models/post.model";
import {Subscription} from "rxjs";
import {PostService} from "../services/post.service";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

    posts: Post[];
    postSupscription: Subscription;

    constructor(private postService: PostService) {

    }

    ngOnInit() {
        this.postSupscription = this.postService.postSubject.subscribe(
            (posts: Post[]) => {
                this.posts = posts;
            }
        );
        this.postService.emitPost();
    }

    ngOnDestroy(): void {
        this.postSupscription.unsubscribe();
    }


}
