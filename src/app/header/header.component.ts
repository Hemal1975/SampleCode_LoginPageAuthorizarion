import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userSub: Subscription;
  isAuthenticate = false;

  constructor(private dataStorageService: DataStorageService,
      private authService: AuthService,
      private router: Router
    ) {}

    onLogout(){
      this.authService.logout();
      this.router.navigate(['auth']);
    }

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(
      user => {
        this.isAuthenticate = !user ? false : true;
      }
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }



  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
