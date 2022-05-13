import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService  } from '../fetch-api-data.service';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';

@Component({
  selector: 'app-synopsis-card',
  templateUrl: './synopsis-card.component.html',
  styleUrls: ['./synopsis-card.component.css']
})
export class SynopsisCardComponent implements OnInit {
  
  movie: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string,
    },
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
     this.getMovie();
  }

  getMovie(): any {
        const data = this.data;
        console.log(this.data);
        this.fetchApiData.getMovieDetails(data.Title).subscribe((resp: any) => {
        this.movie = resp;
        return this.movie;
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
    
    openGenreDialog(name: string, description: string): void {
      this.dialog.open(GenreCardComponent, {
        data: {
          Name: name,
          Description: description,
        },
        width: '500px'
      });
    }
  
}
