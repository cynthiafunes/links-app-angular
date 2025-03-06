import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  link: any = null;
  userName: string = '';
  commentText: string = '';
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadLink(+id);
      }
    });
  }

  loadLink(id: number): void {
    this.loading = true;
    this.apiService.fetchLinkById(id)
      .subscribe({
        next: (data) => {
          this.link = data;
          this.error = null;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar los detalles del enlace.';
          this.loading = false;
          console.error(err);
        }
      });
  }

  get totalVotes(): number {
    if (!this.link || !this.link.votes) return 0;
    return this.link.votes.reduce((sum: number, vote: any) => sum + vote.value, 0);
  }

  handleVote(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.apiService.addVote(+id)
      .subscribe({
        next: () => {
          this.loadLink(+id);
          alert('Voto registrado correctamente');
        },
        error: (err) => {
          alert('Error al registrar el voto');
          console.error(err);
        }
      });
  }

  handleSubmitComment(): void {
    if (!this.userName.trim() || !this.commentText.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.apiService.addComment(+id, { 
      userName: this.userName, 
      text: this.commentText 
    })
      .subscribe({
        next: () => {
          this.loadLink(+id);
          this.userName = '';
          this.commentText = '';
          alert('Comentario añadido correctamente');
        },
        error: (err) => {
          alert('Error al añadir el comentario');
          console.error(err);
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}