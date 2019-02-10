import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService }  from './services/firebase.service';
import { Tab } from './models/tab';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {  
  constructor(
    private firebaseService: FirebaseService
  ) {    
    this.newTab.id = '';
    this.newTab.name = '';
    this.newTab.url = '';
    this.newTab.date_updated = '';
  }

  ngOnInit() {
    this.tabs = this.firebaseService.getTestData();
  }

  newTab = new Tab ();
  tabs: Tab[] = [];

  title = 'Managing Tabs with Angular & Firebase!';
  
  save(): void {
    if(this.newTab.name.trim() != '' && this.newTab.url.trim() != '') {
      this.newTab.date_updated = Date();
      this.firebaseService.createTab(this.newTab);
    }
  }
}
