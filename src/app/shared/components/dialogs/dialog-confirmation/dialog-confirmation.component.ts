import { CommonModule } from '@angular/common';
import { afterNextRender, Component, ElementRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-confirmation',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './dialog-confirmation.component.html',
  styleUrl: './dialog-confirmation.component.scss'
})
export class DialogConfirmationComponent implements OnInit {

  @Input() message: string = '';
  @Input() title!: string;
  @Input() showCancelButton: boolean = true;
  @Output() onConfirm = new EventEmitter<boolean>();

  elementRef = inject(ElementRef);
  dialogue!: HTMLDialogElement;

  constructor() {
    afterNextRender(() => {
      this.dialogue =
        this.elementRef.nativeElement.querySelector('#dialogConfirmation');
    });
  }

  ngOnInit(): void {
    
  }

  openDialogue(): void {
    this.dialogue.showModal();
  }
  
  confirmDialogue(agree: boolean): void {
    this.onConfirm.emit(agree);
    this.dialogue.close();
  }

}
