import { Component, OnInit } from '@angular/core';
import { UserRegistrationService  } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  user: any = {};
  movies: any[] = [];
  currentUser: any = null;
  currentFavs: any[] = [];
  constructor( 
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
     ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUser();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }

    // Open Genre View
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  openDirectorDialog(name: string, bio: string, birthyear: string, deathyear: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthyear: birthyear,
        Deathyear: deathyear
      },
      width: '500px'
    });
  }

  openSynopsisDialog(title: string, imagepath: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        ImagePath: imagepath,
        Description: description,
      },
      width: '500px'
    });
  }

  getUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.currentUser = resp.Username
      this.currentFavs = resp.FavoriteMovies
    });
  }

  addFavorite(id: string): void {
    const token = localStorage.getItem('token');
    this.fetchApiData.addUserFavorites(id).subscribe((response: any) => {
      this.ngOnInit();
    });
  }

  isFav(id: string): boolean {
    return this.currentFavs.includes(id);
  }

  removeFavorite(id: string): void {
    const token = localStorage.getItem('token');
    this.fetchApiData.deleteUserFavorite(id).subscribe((resp: any) => { 
      this.ngOnInit();
    });
  }
  
}
