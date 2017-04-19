import { QuestionBase } from './question-base';

export class DropdownQuestion extends QuestionBase<string> {
  public controlType = 'dropdown';
  public options: Array<{key: string, value: string}> = [];

  constructor(public options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
