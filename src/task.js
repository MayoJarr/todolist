class Task {
  constructor(title, desc, dueDate, piority) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.piority = piority;
  }
  complete = false;
  edit(title, desc) {
    this.title = title;
    this.desc = desc;
  }
  setDone() {
    this.complete = true;
  }
}
export default Task;