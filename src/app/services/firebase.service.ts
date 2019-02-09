import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Tab } from '../models/tab';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getTabId(name){
    var tabId = name.toLowerCase();
    tabId = tabId.replace(" ","_");
    return tabId;
  }

  getTab(tabId){
    //return this.db.collection('tabs').doc(tabId).snapshotChanges();
    return this.db.collection('tabs', ref => ref.where('id', '==', tabId)).snapshotChanges();
  }

  updateTab(tab){
    tab.url = tab.url.toLowerCase();
    return this.db.collection('tabs').doc(tab.tabId).set(tab);
  }

  deleteTab(tabId){
    return this.db.collection('tabs').doc(tabId).delete();
  }

  getTabs(){
    return this.db.collection('tabs').snapshotChanges();
  }

  searchTabs(searchValue){
    return this.db.collection('tabs',ref => ref.where('name', '>=', searchValue)
      .where('name', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchTabsByName(value){
    return this.db.collection('tabs',ref => ref.orderBy('name').startAt(value)).snapshotChanges();
  }

  createTab(tab: Tab){
    var tabId = this.getTabId(tab.name);
    // TODO: check if tabId already exists in db.

    return this.db.collection('tabs').add({
      id: tabId,
      name: tab.name,
      url: tab.url,
      date_updated: Date()
    });
  }
}
