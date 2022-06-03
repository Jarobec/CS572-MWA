import { Token } from "./MyDecorator.js";
import { Student } from "./Student.js";

@Token({ course: "CS572", canProgram: false })
export class DE_Student extends Student {}
