import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserChoice } from 'src/app/model/userchoice.model';
import { GetUserService } from 'src/app/service/get-user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit{

  allUsers: User[] = [];
  userChoice: UserChoice = {
    userChoice: '',
    compChoice: ''
  };
  choiceResponse: UserChoice = {
    userChoice: '',
    compChoice: ''
  };

  gameVideo = '../../../assets/rps.mp4';

  constructor(private GetUserService: GetUserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.GetUserService.getAllUsers().subscribe((response)=>{
      this.allUsers = response;
    });
  }

  playGame(choice: string): void {
    this.userChoice = {
      userChoice: choice,
      compChoice: ''

    }
    this.GetUserService.playGame(this.userChoice).subscribe((response)=>{
      this.choiceResponse = response;
      this.gameVideo = '../../../assets/'+this.choiceResponse.userChoice+'-vs-'+this.choiceResponse.compChoice+'.mp4';
      const video = document.querySelector("video")!;
      video.load();
      video.onended = () => {this.loadUsers();}
      });    
        
  }

  resetGame(): void {
    this.GetUserService.resetGame().subscribe((response)=>{
      this.loadUsers();
    });
  }
}
