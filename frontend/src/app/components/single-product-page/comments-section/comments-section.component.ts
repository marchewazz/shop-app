import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthService } from 'src/app/services/authService/auth.service';
import { CommentsService } from 'src/app/services/commentsService/comments.service';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent implements OnInit {

  @Input() productID : any;

  isUserLogged: boolean = false;
  userID: number = 0;

  average: number | undefined;
  comments: any = [];
  info: string = "";
  
  isAnonymous = new FormControl();
  commentText = new FormControl();
  rating = new FormControl();

  constructor(private comS: CommentsService, private as: AuthService) { }

  ngOnInit(): void {
    this.rating.setValue("5");
    
    const productID = {
      productID: this.productID
    }
    this.isUserLogged = this.as.isUserLogged();
    if (JSON.parse(this.as.getUserDetails()) != null) this.userID = JSON.parse(this.as.getUserDetails()).userID;
    this.comS.getComments(productID).subscribe((res: any) => {
      this.comments = res.comments;
    })

    this.comS.getAverage(productID).subscribe((res: any) => {
      
      //EITHER I'M STUPID OR TYPESCRIPT BUT IT'S WEIRDEST LINE IN MY LIFE
      this.average = Number(Number(res.average[0].avg).toFixed(2));
    })
  }

  createDate(date: any){
    return new Date(date).toLocaleString()
  }

  addComment(){
    
    if(this.commentText.value == null || this.commentText.value == "") this.info = "Hey! If you wanna add comment write something!";
    else {
      console.log(this.commentText.value, this.isAnonymous.value);
      const userData = JSON.parse(this.as.getUserDetails());
      if (this.isAnonymous.value != null || this.isAnonymous.value == true){
        var author = "Anonymous";
      } else {
        var author = `${userData.userFirstName} ${userData.userLastName}`;
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
      this.comS.addComment(commentData).subscribe((res: any) => {
        if (res.message == "inserted") this.ngOnInit();
      })
    }
  }

  deleteComment(commentID: number){
    this.comS.deleteComment({commentID: commentID}).subscribe((res: any) => {
      if (res.message == "deleted") this.ngOnInit();
    })
  }
}
