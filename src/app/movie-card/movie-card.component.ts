import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  user: any = {};
  movies: any[] = [];
  currentUser: any = null;
  currentFavs: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUser();
  }

  /**
   * function to fetch movies from the database
   * @function getMovies
   * @returns movies in JSON format
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * opens Genre card for specific movie when clicked
   * @function openGenreDialog
   * @param name
   * @param description
   * @module GenreCardComponent
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
    });
  }

  /**
   * function to open Genre card for specific movie when clicked
   * @function openDirectorDialog
   * @param name
   * @param bio
   * @param birthyear
   * @param deathyear
   * @module DirectorCardComponent
   */
  openDirectorDialog(
    name: string,
    bio: string,
    birthyear: string,
    deathyear: string
  ): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthyear: birthyear,
        Deathyear: deathyear,
      },
      width: '500px',
    });
  }

  /**
   * function to open Synopsis or 'More Info' for specific movie
   * @function openSynopsisDialog
   * @param title
   * @param imagepath
   * @param description
   * @module SynopsisCardComponent
   */
  openSynopsisDialog(
    title: string,
    imagepath: string,
    description: string
  ): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        ImagePath: imagepath,
        Description: description,
      },
      width: '500px',
    });
  }

  /**
   * function to get user object
   * @function getUser
   */
  getUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.currentUser = resp.Username;
      this.currentFavs = resp.FavoriteMovies;
    });
  }

  /**
   * function to add favorite to user's favorites list
   * @function addFavorite
   * @param id
   */
  addFavorite(id: string): void {
    const token = localStorage.getItem('token');
    this.fetchApiData.addUserFavorites(id).subscribe((response: any) => {
      this.ngOnInit();
    });
  }

  /**
   * function to check if movie is or is not in favorites list
   * in order to display outline or filled in fav heart
   * @param id
   * @returns true or false
   */
  isFav(id: string): boolean {
    return this.currentFavs.includes(id);
  }

  /**
   * function to remove favorite from user's favorites list
   * @param id
   */
  removeFavorite(id: string): void {
    const token = localStorage.getItem('token');
    this.fetchApiData.deleteUserFavorite(id).subscribe((resp: any) => {
      this.ngOnInit();
    });
  }
}
