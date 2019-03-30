import { observable, action } from 'mobx';

class MenuStoreType {
  @observable private location: number = 0;
  @observable public editable: boolean = false;

  constructor() {}

  get Location() {
    return this.location;
  }
  set Location(value: number) {
    this.location = value;
  }

  get Editable() {
    return this.editable;
  }
  set EditMode(value: boolean) {
    console.log(value);
    this.editable = value;
  }
}

export const MenuStore = new MenuStoreType();
