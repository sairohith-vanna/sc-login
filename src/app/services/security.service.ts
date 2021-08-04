import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../types/authentication-user';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private readonly api: string = environment.api;

  constructor(private http: HttpClient) { }

  public intiateAuthentication(): Observable<any> {
    return this.http.get(`${this.api}/SC/login/`, { withCredentials: true, observe: 'response', responseType: 'text' as 'json' });
  }

  public login(user: User): Observable<any> {
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password);
    return this.http.post(`${this.api}/SC/login/`, formData,
      { withCredentials: true, observe: 'response', responseType: 'text' as 'json' });
  }
}
