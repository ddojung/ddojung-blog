import { IMenuTitleForType } from './../models/interface/IMenuTitle';
import { observable } from 'mobx';

class MenuStoreType {
  @observable private location: number = 0;
  @observable private menuTitle: IMenuTitleForType | null = null;

  constructor() {}

  get Location() {
    return this.location;
  }
  set Location(value: number) {
    this.location = value;
  }

  get MenuTitle() {
    return this.menuTitle;
  }
  set MenuTitle(value: IMenuTitleForType | null) {
    this.menuTitle = value;
  }
}

export const MenuStore = new MenuStoreType();
