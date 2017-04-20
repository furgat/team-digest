import { Injectable } from '@angular/core';
import {
  QuestionBase, DropdownQuestion, TextboxQuestion
} from '../../../common/ui/dynamic-form';

import { TYPES } from '../../../common/constants';

export type DexForm = {
  id: number,
  name: string,
  questions: Array<QuestionBase<any>>
};

@Injectable()
export class DexFormsQuestionProvider {
  private _dexForms: DexForm[] = [
    {
      id: 0, name: 'abilities',
      questions: [
        new TextboxQuestion({
          key: 'name',
          label: 'Name',
          value: '',
          required: true,
          order: 0
        }),
        new TextboxQuestion({
          key: 'description',
          label: 'Description',
          value: '',
          required: true,
          order: 1
        })
      ]
    },
    {
      id: 1, name: 'moves',
      questions: [
        new TextboxQuestion({
          key: 'name',
          label: 'Name',
          value: '',
          required: true,
          order: 0
        }),
        new DropdownQuestion({
          key: 'type',
          label: 'Type',
          options: TYPES.map((type) => {
            return {key: type, value: type};
          }),
          order: 1
        }),
        new TextboxQuestion({
          key: 'description',
          label: 'Description',
          value: '',
          required: true,
          order: 2
        })
      ]
    },
    {
      id: 2, name: 'pokemon',
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
