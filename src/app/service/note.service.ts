import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
//import { Level } from '../enum/level.enum';
import { CustomHttpResponse } from '../interface/custom-http-response';
import { Note } from '../interface/note';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private readonly server = 'http://localhost:8085';

  constructor(private http: HttpClient) { }

  notes$ = <Observable<CustomHttpResponse>>this.http.get<CustomHttpResponse>
    (`${this.server}/note/all`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  save$ = (note: Note) => <Observable<CustomHttpResponse>>
    this.http.post<CustomHttpResponse>
      (`${this.server}/note/add`, note)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  update$ = (note: Note) => <Observable<CustomHttpResponse>>
    this.http.put<CustomHttpResponse>
      (`${this.server}/note/update`, note)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
/*
  filterNotes$ = (level: Level, data: CustomHttpResponse) => <Observable<CustomHttpResponse>>
    new Observable<CustomHttpResponse>(subscriber => {
      subscriber.next(level === Level.ALL ? { ...data, message: data.notes.length > 0 ? `${data.notes.length} notes retrieved` : `No notes to display`} :
        <CustomHttpResponse>{
          ...data,
          message: data.notes.filter(note => note.level === level).length > 0 ? `Notes filtered by ${level.toLowerCase()} priority` : `No notes of ${level.toLowerCase()} priority found`,
          notes: data.notes.filter(note => note.level === level)
        });
      subscriber.complete();
    }).pipe(
      tap(console.log),
      catchError(this.handleError)
    );
*/

  delete$ = (noteId: number) => <Observable<CustomHttpResponse>>
    this.http.delete<CustomHttpResponse>
      (`${this.server}/note/delete/${noteId}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );


  public test() {

    
  }    

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client error occurred - ${error.error.message}`;
    } else {
      if (error.error.reason) {
        errorMessage = `${error.error.reason} - Error code ${error.status}`;
      } else {
        errorMessage = `An error occurred - Error code ${error.status}`;
      }
    }
    return throwError(errorMessage);
  }

}
