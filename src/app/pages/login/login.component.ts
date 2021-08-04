import { CookieService } from 'ngx-cookie-service';
import { SecurityService } from './../../services/security.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/types/authentication-user';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = {
    username: '',
    password: ''
  };
  csrfToken: string;
  constructor(private security: SecurityService, private cookieService: CookieService) { }

  submitForAuthentication(): void {
    if (this.user) {
      console.log('CSRF Token: ' + this.cookieService.get('csrftoken'));
      console.log(this.user);
      this.security.login(this.user).subscribe({
        next: (response: HttpResponse<string>) => {
          console.log(response);
        },
        error: (error) => console.log(error)
      });
    }
  }

  parseInitiationResponseForCSRF(htmlAsString: string): string {
    const parser = new DOMParser();
    const dom = parser.parseFromString(htmlAsString, 'application/xml');
    const inputElements = dom.getElementsByTagName('input');
    for (let i = 0; i <= inputElements?.length; i++) {
      const elementAttributes = inputElements.item(i).attributes;
      if (elementAttributes.getNamedItem('name').value === 'csrfmiddlewaretoken') {
        this.csrfToken = elementAttributes.getNamedItem('value')?.value;
        return this.csrfToken;
      }
    }
  }

  ngOnInit(): void {
    this.security.intiateAuthentication().subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response);
        const csrfTokenFromResponse = this.parseInitiationResponseForCSRF(response.body);
        localStorage.setItem('X-CSRF-TOKEN', csrfTokenFromResponse);
      },
      error: (error) => console.log(error)
    });
  }
}
