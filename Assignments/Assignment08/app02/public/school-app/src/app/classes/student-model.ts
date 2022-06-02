export class StudentModel {
  #_id!: string;
  #name!: string;
  #gpa!: number;
  #courses!: CourseModel[];

  constructor(id: string, name: string) {
    this.#_id = id;
    this.#name = name;
  }

  get _id(): string {
    return this.#_id;
  }
  get name(): string {
    return this.#name;
  }
  set name(name: string) {
    this.#name = name;
  }
  get gpa(): number {
    return this.#gpa;
  }
  set gpa(gpa: number) {
    this.#gpa = gpa;
  }
  get courses(): CourseModel[] {
    return this.#courses;
  }
  set courses(courses: CourseModel[]) {
    this.#courses = courses;
  }
}

class CourseModel {
  #name!: string;
  #block!: string;

  constructor(name: string, block: string) {
    this.#name = name;
    this.#block = block;
  }

  get name(): string {
    return this.#name;
  }
  set name(name: string) {
    this.#name = name;
  }

  get block(): string {
    return this.#block;
  }
  set block(block: string) {
    this.#block = block;
  }
}
