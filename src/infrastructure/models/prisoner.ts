export interface Prisoner {
  id: string;
  name: string;
  contactId: number;
  lawId: number;
}

export class BasePrisoner implements Prisoner {
  constructor({ id, contactId, name, lawId }: Prisoner) {
    this.id = id;
    this._contactId = contactId;
    this._name = name;
    this._lawId = lawId;
  }

  public id!: string;
  private _name!: string;
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  private _contactId!: number;
  public get contactId(): number {
    return this._contactId;
  }
  public set contactId(value: number) {
    this._contactId = value;
  }
  private _lawId!: number;
  public get lawId(): number {
    return this._lawId;
  }
  public set lawId(value: number) {
    this._lawId = value;
  }
}