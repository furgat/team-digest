import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './question-base';

@Injectable()
export class QuestionControlProvider {
  public toFormGroup(questions: Array<QuestionBase<any>> = undefined) {
    let group: any = {};
    if (questions) {
      questions.forEach((question) => {
        group[question.key] = (question.required
          ? new FormControl(question.value || '', Validators.required)
          : new FormControl(question.value || ''));
      });
      return new FormGroup(group);
    }
    return new FormGroup({});
  }
}
