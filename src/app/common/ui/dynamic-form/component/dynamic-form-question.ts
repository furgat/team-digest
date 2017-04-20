import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { QuestionBase }     from '../questions';
@Component({
  selector: 'df-question',
  templateUrl: './dynamic-form-question.html'
})
export class DRFQuestionComponent {
  @Input() public question: QuestionBase<any>;
  @Input() public form: FormGroup;
  public get isValid() { return this.form.controls[this.question.key].valid; }
}
