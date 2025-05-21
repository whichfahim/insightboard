import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-test-api',
  imports: [],
  templateUrl: './test-api.component.html',
  styleUrl: './test-api.component.scss',
})
export class TestApiComponent {
  http = inject(HttpClient);
  posts: any[] = [];
  profile: any;

  private apiUrl = 'http://localhost:3000';

  constructor() {
    this.getPosts().subscribe((data: any[]) => {
      console.log(data);
      this.posts = data;
    });

    this.getProfile().subscribe((data: any) => {
      console.log(data);
      this.profile = data;
    });
  }

  getPosts(): any {
    return this.http.get(`${this.apiUrl}/posts`);
  }

  getProfile(): any {
    return this.http.get(`${this.apiUrl}/profile`);
  }
}
