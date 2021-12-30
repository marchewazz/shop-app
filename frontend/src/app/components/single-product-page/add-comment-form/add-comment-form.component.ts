import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthService } from 'src/app/services/authService/auth.service';
import { CommentsService } from 'src/app/services/commentsService/comments.service';

@Component({
  selector: 'app-add-comment-form',
  templateUrl: './add-comment-form.component.html',
  styleUrls: ['./add-comment-form.component.scss']
})
export class AddCommentFormComponent implements OnInit {

  @Input() productID: number | undefined;

  info: string = "";
  
  isAnonymous = new FormControl();
  commentText = new FormControl();
  rating = new FormControl();
  
  constructor(private as: AuthService, private cs: CommentsService) { }

  ngOnInit(): void {
    this.rating.setValue("5");
  }

  addComment(){
    console.log(this.rating.value, this.isAnonymous.value);
    
    if(this.commentText.value == null || this.commentText.value == "") this.info = "Hey! If you wanna add comment write something!";
    else {
      console.log(this.commentText.value, this.isAnonymous.value);
      const userData = JSON.parse(this.as.getUserDetails());
      if (this.isAnonymous.value != null || this.isAnonymous.value == true){
        var author = "Anonymous";
      } else {
        console.log(userData);
        var author = `${userData.userFirstName} ${userData.userLastName}`;
        console.log(author); 
      }
      var userID = `${userData.userID}`;
      const commentData = {
        userID: userID,
        rating: Number(this.rating.value),
        commentText: this.commentText.value,
        userName: author,
        productID: this.productID
      }
      console.log(commentData);
      this.cs.addComment(commentData).subscribe((res: any) => {
        console.log(res);
      })
    }
   
  }

}
