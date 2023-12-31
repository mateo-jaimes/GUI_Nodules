import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged = false;

  isAdmin = false;
  userRole:string='';

  constructor(private tokenService: TokenService, private router:Router) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole')!;
    if(this.tokenService.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }
    if(this.tokenService.getAuthorities()=='ROLE_ADMIN')this.isAdmin=true;
  }

  onLogOut():void{
    // this.tokenService.logOut();
    // window.location.reload();
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
