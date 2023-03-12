export enum Relation {
  FRIEND = "Friend",
  RELATIVE = "Relative"
}

export interface Contact {
  id: string;
  relation: Relation;
  enteredTerm: Date | undefined;
  calculatedTerm: Date | undefined;
}

export class BaseContact implements Contact {
  constructor({ id, relation, calculatedTerm, enteredTerm }: Contact) {
    this.id = id;
    this._relation = relation;
    this._calculatedTerm = calculatedTerm;
    this._enteredTerm = enteredTerm;
  }

  public id!: string;
  private _relation!: Relation;

  public get relation(): Relation {
    return this._relation;
  }

  public set relation(value: Relation) {
    this._relation = value;
  }

  private _enteredTerm: Date | undefined;

  public get enteredTerm(): Date | undefined {
    return this._enteredTerm;
  }

  public set enteredTerm(value: Date | undefined) {
    this._enteredTerm = value;
  }

  private _calculatedTerm: Date | undefined;

  public get calculatedTerm(): Date | undefined {
    return this._calculatedTerm;
  }

  public set calculatedTerm(value: Date | undefined) {
    this._calculatedTerm = value;
  }
}