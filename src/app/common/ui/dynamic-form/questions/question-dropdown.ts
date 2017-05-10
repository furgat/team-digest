import { QuestionBase } from './question-base';

export class DropdownQuestion extends QuestionBase<string> {
  public controlType = 'dropdown';
  public options: Array<{key: number, value: string}> = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
