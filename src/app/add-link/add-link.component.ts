import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.css']
})
export class AddLinkComponent {
  title: string = '';
  url: string = '';
  description: string = '';
  tagsInput: string = '';
  error: string | null = null;

  constructor(private router: Router, private apiService: ApiService) { }

  handleSubmit(): void {
    if (!this.title.trim() || !this.url.trim()) {
      this.error = 'Por favor completa los campos obligatorios';
      return;
    }

    const tags = this.tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    this.apiService.createLink({
      title: this.title,
      url: this.url,
      description: this.description,
      tags
    })
      .subscribe({
        next: () => {
          alert('Enlace añadido correctamente');
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error = 'Error al crear el enlace. Por favor intenta de nuevo.';
          console.error(err);
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}