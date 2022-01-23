export class InitializeState {
  static readonly type = '[Animals] Initialize State';
}

export class ChangeName {
  static readonly type = '[Animals] Change Name';
  constructor(public payload: string) {}
}

export class UpdateCategory {
  static readonly type = '[Animals] Update Category';
}

export class AddZebra {
  static readonly type = '[Animals] Add Zebra';
  constructor(public payload: string) {}
}

export class RemovePanda {
  static readonly type = '[Animals] Remove Panda';
  constructor(public payload: string) {}
}

export class ChangePandaName {
  static readonly type = '[Animals] Change Panda Name';
  constructor(public payload: { name: string; newName: string }) {}
}
