import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { ImageService } from '../../../services/image.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageModel } from '../../../models/ImageModel';
import { ImageTestModel } from '../../../models/image-test-model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  imageModelList: ImageModel[] = [];
  userName: string = '';

  constructor(
    private messageService: MessageService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName').split('@')[0];

    if (this.userName) {
      this.messageService.add({
        severity: 'success',
        summary: 'Welcome',
        detail: this.userName.toUpperCase(),
      });
    }
  }

  getAllImages() {
    this.imageModelList.splice(0);
    this.imageService.getAllImages().subscribe((res: ImageModel[]) => {
      this.imageModelList.push(...res);
      console.log(this.imageModelList, 'List');
    });
  }

  logOut() {
    this.userName = null;
    this.router.navigate(['/vitraya/sign-up']);
  }

  convertBaseIntoImage(base64String: string): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/jpg;base64,' + base64String
    );
  }

  deleteImage(id: number, index: number) {
    this.imageService.deleteImage(id).subscribe((res) => {
      this.imageModelList.splice(index, 1);
      this.onDeleteImage();
    });
  }
  processFileTestingModell(imageInput: any) {
    const file: File = imageInput.files[0];
    const imageTestModel: ImageTestModel = {
      file: file,
      url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      ),
    };
    const formData = new FormData();
    formData.append('imageFile', imageTestModel.file, imageTestModel.file.name);

    this.imageService.uploadImage(formData).subscribe((res) => {
      this.imageModelList.push(res);
      this.onUpload(res.name);
    });
  }

  onUpload(imageName: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: imageName + 'Uploaded SuccessFully',
    });
  }

  onDeleteImage() {
    this.messageService.add({
      severity: 'info',
      summary: 'Delete',
      detail: 'File Delete SuccessFully',
    });
  }
}

// const reader = new FileReader();
// reader.addEventListener('load', (event: any) => {
//   this.selectedFile = new ImageSnippet(event.target.result, file);

//   this.imageService.uploadImage(this.selectedFile.file).subscribe(
//     (res) => {},
//     (err) => {}
//   );
// });

// reader.readAsDataURL(file);

// processFile(imageInput: any) {
//   const file: File = imageInput.files[0];
//   const imageTestModel: ImageTestModel = {
//     file: file,
//     url: this.sanitizer.bypassSecurityTrustUrl(
//       window.URL.createObjectURL(file)
//     ),
//   };
//   const formData = new FormData();
//   formData.append('imageFile', imageTestModel.file, imageTestModel.file.name);

//   this.imageService.uploadImage(formData).subscribe((res) => {
//     this.imageModelList.push(res);
//   });
// }
