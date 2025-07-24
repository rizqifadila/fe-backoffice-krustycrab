import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  title = inject(Title);
  
  ngOnInit(): void {
    this.title.setTitle(`Backoffice Krusty Crab - Dashboard`);
    
  }

}
