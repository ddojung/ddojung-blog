import { observable } from 'mobx';

class MenuStoreType {
  @observable private location: number = 0;

  get Location() {
    return this.location;
  }
  set Location(value: number) {
    this.location = value;
  }
}

export const MenuStore = new MenuStoreType();
