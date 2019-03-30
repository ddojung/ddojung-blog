export interface IMenuTitle {
  title: IMenuTitleForType | null;
}

export interface IMenuTitleForType {
  [key: string]: IMenuTitleElement[];
}

export interface IMenuTitleElement {
  id: string;
  title: string;
}
