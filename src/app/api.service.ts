import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  fetchLinks(tag: string = ''): Observable<any> {
    const url = tag ? `${this.API_URL}/links?tag=${tag}` : `${this.API_URL}/links`;
    return this.http.get(url);
  }

  fetchLinkById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/links/${id}`);
  }

  fetchTags(): Observable<any> {
    return this.http.get(`${this.API_URL}/tags`);
  }

  createLink(linkData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/links`, linkData);
  }

  addComment(linkId: number, commentData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/links/${linkId}/comments`, commentData);
  }

  addVote(linkId: number): Observable<any> {
    return this.http.post(`${this.API_URL}/links/${linkId}/votes`, { value: 1 });
  }
}