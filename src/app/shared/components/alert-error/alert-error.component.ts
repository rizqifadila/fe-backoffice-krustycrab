import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ErrorAlertDto } from '../../interface/global.model';

@Component({
  selector: 'app-alert-error',
  imports: [
    CommonModule
  ],
  templateUrl: './alert-error.component.html',
  styleUrl: './alert-error.component.scss'
})
export class AlertErrorComponent implements OnChanges {

  @Input() error!: ErrorAlertDto;
  isFatalError: boolean = false;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const statusCodes = [400, 401, 403, 404, 422];
    if (!statusCodes.includes(this.error.statusCode)) {
      this.isFatalError = true;
    }
  }

}
