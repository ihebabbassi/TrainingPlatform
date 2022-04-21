import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service" ;
import { HeadService } from "./head.service";
import { Router,NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized  } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  userIsAuthenticated = false;
  profession : any ;
  private authListenerSubs: Subscription = new Subscription;
  
  constructor(private authService: AuthService, private headService : HeadService ,private router: Router) {  }
  public email : string = "";

  ngOnInit() {
    this.router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        this.profession = this.authService.getProfession();
       // console.log(this.profession);
      }
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
     } 
  
     onClickProfile(){
       this.email = this.authService.getUserId();
       this.router.navigate(['profile', this.email]);
     }
     onClickWorkoutPlan(){
      this.email = this.authService.getUserId();
      if(this.profession =='member'){
        this.router.navigate(['workout', this.email]);
       }else{
          this.router.navigate(['workout']);
        }
    
     }
     onClicknutriPlan(){
      this.email = this.authService.getUserId();
      if(this.profession =='member'){
      this.router.navigate(['nutrition', this.email]);
      }else{
        this.router.navigate(['nutrition']);
      }
     }

   /*onUpdate(email : string){  // this methode is for making the fetching available after profile updating
       this.email = email; 
       console.log(this.email);
   } */
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}