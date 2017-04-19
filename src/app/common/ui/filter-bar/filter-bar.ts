import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter-bar',
  styles: [`
    .capitalize { text-transform: capitalize; }
  `],
  template: `
    <div class="input-group col-xs-12">
      <button class="capitalize col-xs-3 btn btn-primary" type="button">
        {{ buttonName }}
      </button>
      <span class="col-xs-1"></span>
      <div class="input-group col-xs-8">
        <input type="text" class="form-control">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button">Filter</button>
        </span>
      </div>
    </div>
  `
})
export class FilterBarComponent {
  @Input() public buttonName: string;
  @Output() public buttonClick = new EventEmitter();
  @Output() public filterClick = new EventEmitter();
};
