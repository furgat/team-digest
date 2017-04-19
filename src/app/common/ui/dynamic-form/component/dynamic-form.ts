import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionBase, QuestionControlProvider } from '../questions';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.html',
  providers: [ QuestionControlProvider ]
})
export class DynamicFormComponent implements OnInit {
  @Input() public questions: Array<QuestionBase<any>> = [];
  public form: FormGroup;
  public payLoad = '';
  constructor(private qcp: QuestionControlProvider) {  }
  public onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
  private ngOnInit() {
    this.form = this.qcp.toFormGroup(this.questions);
  }
}
