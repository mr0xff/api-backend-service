export class Task {
  title: string;
  completed: boolean;

  constructor(title: string, completed = false){
    this.title = title;
    this.completed = completed;
    this.#validate();
  }

  #validate(){
    if(typeof this.title !== "string" || typeof this.completed !== "boolean")
      throw new TypeError("invalid type!");
  }
}