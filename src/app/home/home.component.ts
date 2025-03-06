import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  links: any[] = [];
  tags: any[] = [];
  selectedTag: string = '';
  loading: boolean = true;
  error: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.loadLinks();
    this.loadTags();
  }

  loadLinks(): void {
    this.apiService.fetchLinks(this.selectedTag)
      .subscribe({
        next: (data) => {
          this.links = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar enlaces.';
          this.loading = false;
          console.error(err);
        }
      });
  }

  loadTags(): void {
    this.apiService.fetchTags()
      .subscribe({
        next: (data) => {
          this.tags = data;
        },
        error: (err) => {
          this.error = 'Error al cargar etiquetas.';
          console.error(err);
        }
      });
  }

  handleTagChange(): void {
    this.loadLinks();
  }
}
