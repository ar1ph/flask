import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Repo {
  full_name: string;
  id: number;
  stargazers_count: number;
}

@Component({
  selector: 'app-top10-table',
  templateUrl: './top10-table.component.html',
  styleUrls: ['./top10-table.component.css'],
})
export class Top10TableComponent {
  displayedColumns: string[] = ['full_name', 'id', 'stargazers_count'];
  dataSource: Repo[] = [];

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  fetchData(){
    this.http.get<Repo[]>('http://localhost:5000/api/top10repos').subscribe(
      data => this.dataSource = data,
      err => console.log(err)
    )
  }
}
