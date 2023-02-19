class Task {
  constructor(title, desc, dueDate, piority) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.piority = piority;
  }
  complete = false;
  edit(tit, des) {
    this.title = tit;
    this.desc = des;
  }
  setDone() {
    this.complete = true;
  }
  setUnDone() {
    this.complete = false;
  }
}
export default Task;