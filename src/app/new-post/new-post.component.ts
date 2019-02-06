import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../services/post.service";
import {Router} from "@angular/router";
import {Post} from "../models/post.model";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  created_at: Date = new Date();
  postForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private postService: PostService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
        title: ['', Validators.required],
        content: ['', Validators.required],
        }
    );
  }

  onSavePost() {
    const title = this.postForm.get('title').value;
    const content = this.postForm.get('content').value;

    const newPost = new Post(title, content);
    this.postService.createNewPost(newPost);
    this.router.navigate(['/posts']);

  }

}
