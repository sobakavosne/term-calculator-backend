export interface Law {
  id: string;
  name: string;
  term: Date;
}

export class BaseLaw implements Law {
  constructor({ id, name, term }: Law) {
    this.id = id;
    this._name = name;
    this._term = term;
  }

  public id!: string;
  private _name!: string;

  public get name(): string {
    return this._name;
  }

  public set relation(value: string) {
    this._name = value;
  }

  private _term: Date;

  public get term(): Date {
    return this._term;
  }
  
  public set term(value: Date) {
    this._term = value;
  }
}