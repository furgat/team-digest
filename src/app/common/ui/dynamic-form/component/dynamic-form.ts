import { Component, Input, Output, EventEmitter, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionBase, QuestionControlProvider } from '../questions';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.html',
  providers: [ QuestionControlProvider ]
})
export class DynamicFormComponent implements OnInit {
  @Input() public questions: Array<QuestionBase<any>> = [];
  @Output() public submit = new EventEmitter();
  public form: FormGroup;
  constructor(private qcp: QuestionControlProvider) {  }
  public onSubmit() {
    this.submit.next(JSON.stringify(this.form.value));
  }
  public ngOnInit() {
    this.form = this.qcp.toFormGroup(this.questions);
  }
}
