import { Injectable } from '@angular/core';
import {
  QuestionBase, DropdownQuestion, TextboxQuestion
} from '../../../common/ui/dynamic-form';

import { TERMS, TYPES } from '../../../common/constants';

export type DexForm = {
  id: number,
  name: string,
  questions: Array<QuestionBase<any>>
};

@Injectable()
export class DexFormsQuestionProvider {
  private _dexForms: DexForm[] = [
    {
      id: 0, name: TERMS.ABILITY[1],
      questions: [
        new TextboxQuestion({
          key: TERMS.NAME[0],
          label: TERMS.NAME[0],
          value: '',
          required: true,
          order: 0
        }),
        new TextboxQuestion({
          key: TERMS.DESCRIPTION[0],
          label: TERMS.DESCRIPTION[0],
          value: '',
          required: true,
          order: 1
        })
      ]
    },
    {
      id: 1, name: TERMS.MOVE[1],
      questions: [
        new TextboxQuestion({
          key: TERMS.NAME[0],
          label: TERMS.NAME[0],
          value: '',
          required: true,
          order: 0
        }),
        new DropdownQuestion({
          key: TERMS.TYPE[0],
          label: TERMS.TYPE[0],
          options: TYPES.map((type) => {
            return {key: type, value: type};
          }),
          required: true,
          order: 1
        }),
        new TextboxQuestion({
          key: TERMS.DESCRIPTION[0],
          label: TERMS.DESCRIPTION[0],
          value: '',
          required: true,
          order: 2
        })
      ]
    },
    {
      id: 2, name: TERMS.POKEMON[1],
      questions: []
    }
  ];

  public getFormByName(
    name: string = undefined,
    forms: DexForm[] = this._dexForms
  ): Array<QuestionBase<any>> {
    if (name !== undefined) {
      for (let form of forms) {
        if (form.name === name) {
          return form.questions;
        }
      }
    }
    return undefined;
  }
}
