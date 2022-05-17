import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  userName: any = localStorage.getItem('user');
  favs: any = null;
  favMovies: any[] = [];
  displayElement: boolean = false;

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * function to open edit user dialog
   * @function openEditProfileDialog
   * @module EditProfileComponent
   */
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      panelClass: 'custom-container',
      width: 'max-content',
    });
  }

  /**
   * function to get user object AND user's favorites movies
   * @function getUser
   * @param user
   * @return user data in JSON format
   */
  getUser(): void {
    let movies: any[] = [];
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((resp: any) => {
        this.user = resp;
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
          this.movies = resp;
          this.movies.forEach((movie: any) => {
            if (this.user.FavoriteMovies.includes(movie._id)) {
              this.favMovies.push(movie);
              this.displayElement = true;
            }
          });
        });
      });
    }
  }

  /**
   * function to delete one's user account
   * @function deleteUserProfile
   */
  deleteUserProfile(): void {
    if (confirm('Are you sure? This cannot be undone.')) {
      this.router.navigate(['login']).then(() => {
        this.snackBar.open('Your account was deleted', 'OK', {
          duration: 6000,
        });
      });
      this.router.navigate(['login']);
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.clear();
      });
    }
  }

  /**
   * function to remove favorite from user's favorite movies
   * @function removeFav
   * @param id
   */
  removeFav(id: string): void {
    this.fetchApiData.deleteUserFavorite(id).subscribe((res: any) => {
      this.snackBar.open('Successfully removed from favorite movies.', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
      window.location.reload();
      return this.favs;
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
  openSynopsisDialog(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
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
}
