import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageModel } from '../models/ImageModel';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  private usersUrl: string = 'http://localhost:9090/';

  getAllImages(): Observable<ImageModel[]> {
    return this.http.get<ImageModel[]>(
      this.usersUrl + 'images' + '/' + 'showAllImages'
    );
  }

  uploadImage(formData: FormData): Observable<ImageModel> {
    return this.http.post<ImageModel>(
      this.usersUrl + 'images' + '/' + 'saveImage',
      formData
    );
  }

  deleteImage(id: number): Observable<void> {
    return this.http.delete<void>(
      this.usersUrl + 'images' + '/' + 'delete' + '/' + id
    );
  }
}
