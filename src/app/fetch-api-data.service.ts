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
  /**  Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making it available via this.http
   *@param http
   */
  constructor(private http: HttpClient) {}

  /**
   * Making the api call for the user registration endpoint
   * @funciton userRegistration
   * @param userDetails
   * @returns a new user object JSON
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * API call for user login
   * @function userLogin
   * @param userDetails
   * @returns the users' data in JSON format
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }
  /**
   * get all movies call
   * @function getAllMovies
   * @returns array of movies objects in JSON format
   */
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
  /**
   * get single movie details call
   * @function getMovieDetails
   * @param Title
   * @returns a movie object JSON
   */
  getMovieDetails(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `horrorMovies/${Title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * get User details call
   * @function getUser
   * @param User
   * @returns user object JSON
   */
  getUser(User: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${User}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * add to User favorites call
   * @function addUserFavorites
   * @param id
   *
   */
  public addUserFavorites(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(
        apiUrl + `users/${username}/movies/${id}`,
        {},
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * edit User details call
   * @param userData
   * @returns updated user data JSON
   */
  editUserProfile(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${username}`, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * delete User favorites call
   * @function deleteUserFavorites
   * @param id
   *
   */
  deleteUserFavorite(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Delete user account call
   * @param username
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Error function
   * @function handleError
   * @param error
   * @returns error call
   */
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

  /**
   *  non-typed response extraction at bottom to reduce repetition
   * @function extractResponseData
   * @param resp
   * @returns response || object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
