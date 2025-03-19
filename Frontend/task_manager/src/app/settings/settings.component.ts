import { SettingsService } from './../services/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit{

  tableData : any[] =[];
  talbleColumns = ["S.No", "Name", "Username", "Role","#"]

  constructor(private service: SettingsService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
}
