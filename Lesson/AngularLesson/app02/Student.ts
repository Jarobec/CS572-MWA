export class Student {
  private id: number;
  private _name: string;
  #_gpa: number;

  constructor(id: number, name: string, gpa: number) {
    this.id = id;
    this._name = name;
    this.gpa = gpa;
  }

  getId(): number {
    return this.id;
  }
  set name(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  set gpa(gpa) {
    this.#_gpa = gpa;
  }
  get gpa() {
    return this.#_gpa;
  }

  public study(): string {
    return "Hello";
  }
}
