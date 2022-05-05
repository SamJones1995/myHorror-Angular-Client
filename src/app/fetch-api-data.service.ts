import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myhorrormovies.herokuapp.com/';
//get token from localStorage
const token = localStorage.getItem('token');
//get username from localStorage
const username = localStorage.getItem('username');
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  //API call for user login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  //get all movies call
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'horrorMovies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //get single movie details call
  getMovieDetails(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'horrorMovies/${id}', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //get Director details call
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/horrorMovies/Directors/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //get Genre details call
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/horrorMovies/Genres/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //get User details call
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .get(apiUrl + '/users/${username}', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //get User favorites call
  getUserFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .get(apiUrl + '/users/${username}/movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //add to User favorites call
  addUserFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .post(apiUrl + '/users/${username}/movies/${id}', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //edit User details call
  editUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .put(apiUrl + '/users/${username}', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //delete User favorites call
  deleteUserFavorite(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .delete(apiUrl + '/users/${username}/movies/${id}', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Delete user account call
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .delete(apiUrl + '/users/${username}', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }


  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
