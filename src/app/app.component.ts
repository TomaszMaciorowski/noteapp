import { Component, OnInit } from '@angular/core';
import { NoteService } from './service/note.service';
import { catchError, map, startWith } from 'rxjs/operators';
import { DataState } from './enum/datastate';
import { CustomHttpResponse } from './interface/custom-http-response';
import { AppState } from './interface/appstate';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  appState$!: Observable<AppState<CustomHttpResponse>>;

  constructor(private noteService: NoteService) {  }


  ngOnInit(): void { 


    this.appState$ = this.noteService.notes$
      .pipe(
        map(response => {
          return { dataState: DataState.LOADED, data: response }
        }),
        startWith({ dataState: DataState.LOADING }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, error })
        })
      );


    }
}
