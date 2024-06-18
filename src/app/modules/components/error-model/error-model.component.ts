import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-model',
  templateUrl: './error-model.component.html',
  styleUrl: './error-model.component.scss',
})
export class ErrorModelComponent {
  @Input()
  errorMessage!: string;

  constructor(public activeModal: NgbActiveModal) {}
}
