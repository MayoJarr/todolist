class Task {
  constructor(title, desc, dueDate, piority, complete) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.piority = piority;
    this.complete = complete;
  }
  edit(title, desc, date, piority) {
    this.title = title;
    this.desc = desc;
    this.dueDate = date;
    this.piority = piority;
  }
  setDone() {
    this.complete = true;
  }
  setUnDone() {
    this.complete = false;
  }
}
export default Task;