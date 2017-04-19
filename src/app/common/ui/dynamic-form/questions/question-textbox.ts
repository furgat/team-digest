import { QuestionBase } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {
  public controlType = 'textbox';
  public type: string;

  constructor(public options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
