import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../models/post.model";
import {PostService} from "../services/post.service";

@Component({
    selector: 'app-post-list-item',
    templateUrl: './post-list-item.component.html',
    styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {
    @Input() post: Post;
    @Input() title: string;
    @Input() content: string;
    @Input() loveIts: number;
    @Input() created_at: Date;

    constructor(private postService: PostService) {
    }

    ngOnInit() {
    }

    onDeletePost(post: Post) {
        this.postService.removePost(post);
    }

    onLoveIt(post: Post) {
        this.postService.lovePost(post);

    }

    onDontLoveIt(post: Post) {
        this.postService.dontLovePost(post);
    }

    getClassLove() {
        if (this.loveIts > 0) {
            return 'list-group-item list-group-item-success mb-3';
        } else if (this.loveIts === 0) {
            return 'list-group-item mb-3';
        } else {
            return 'list-group-item list-group-item-danger mb-3';
        }
    }
}
