import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DynamicFormComponent } from '../../../common/ui';
import { DexFormsQuestionProvider } from '../provider';

@Component({
  selector: 'dex-modal-form',
  styles: [],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <dynamic-form
        [questions]="questions"
        (submit)="submitHandler($event)"
      ></dynamic-form>
    </div>
    <div class="modal-footer">
    </div>
  `
})
export class DexModalFormComponent {
  public questions: any[];
  @Input() public name: string;
  @Output() public formData = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private questionProvider: DexFormsQuestionProvider
  ) {}

  public setForm(id: string) {
    this.questions = this.questionProvider.getFormByName(id);
  }

  public submitHandler(data) {
    this.formData.next(data);
    this.activeModal.dismiss('Submitted');
  }
}
