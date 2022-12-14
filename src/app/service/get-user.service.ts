import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { UserChoice } from '../model/userchoice.model';


@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  // for use with local spring boot instance
  // getUserUrl: string = "http://localhost:8080/getAllUsers";
  // playGameUrl: string = "http://localhost:8080/playGame";
  // resetGameUrl: string = "http://localhost:8080/resetGame";

  getUserUrl: string = "https://lesssimplepaperrockscissors.herokuapp.com/getAllUsers";
  playGameUrl: string = "https://lesssimplepaperrockscissors.herokuapp.com/playGame";
  resetGameUrl: string = "https://lesssimplepaperrockscissors.herokuapp.com/resetGame";

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.getUserUrl);
  }

  playGame(userChoice: UserChoice): Observable<UserChoice>{
    return this.httpClient.post<UserChoice>(this.playGameUrl + "/0", userChoice);
  }

  resetGame(): Observable<void>{
    return this.httpClient.post<void>(this.resetGameUrl+"/0", "");
  }
}
