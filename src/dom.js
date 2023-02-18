import { Project, ProjectManager } from "./project";
import Task from "./task";
const UI = (() => {
  const side = document.querySelector(".sidebar");
  const content = document.querySelector(".content");
  const menu = document.querySelector(".taskCreationMenu");
  const submit = document.querySelector(".submit");
  const addProject = document.querySelector(".addProjectBtn");
  const addTask = document.querySelector(".addTaskBtn");
  const tasks = document.querySelector(".tasks");
  const projectList = document.querySelector(".project");
  const container = document.querySelector(".container");
  const projectMenu = document.querySelector(".projectMenu");
  const projectSubmit = document.querySelector(".projectSubmit");

  function createTask(titleV, descV, dateV, piorityV) {
    const task = document.createElement("div");
    const task2 = document.createElement("div");
    const title = document.createElement("div");
    const date = document.createElement("div");
    const desc = document.createElement("div");
    const piority = document.createElement("div");
    const buttons = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    task.classList.add("task");
    deleteBtn.classList.add("deleteBtn");
    title.textContent = titleV;
    date.textContent = dateV;
    deleteBtn.textContent = " del";
    editBtn.textContent = "edit ";
    tasks.appendChild(task);
    task.appendChild(task2);
    task2.appendChild(title);
    task2.appendChild(date);
    task2.appendChild(desc);
    task2.appendChild(piority);
    task.appendChild(buttons);
    buttons.appendChild(editBtn);
    buttons.appendChild(deleteBtn);
  }
  function createProject(project) {
    const ul = document.querySelector(".project");
    const li = document.createElement("LI");
    const projectt = document.createElement("button");
    projectt.textContent = project.getProjectName();
    ul.appendChild(li);
    li.appendChild(projectt);
  }
  function showMenu() {
    menu.style.cssText = "display: flex;";
    menu.classList.add("fade");
  }
  function hideMenu() {
    menu.style.cssText = "display: none;";
    menu.classList.remove("fade");
  }
  function getFormValues(name) {
    return document.querySelector(`.${name}`).value;
  }
  function currentProject() {
    const cP = 0;
    return cP;
  }
  function renderProjects() {
    projectList.textContent = "";
    ProjectManager.getProjects().forEach((item, index) => {
      createProject(ProjectManager.getProject(index));
    });
  }
  function renderTasks() {
    console.log(
      `this task goes to: ${
        ProjectManager.getProject(currentProject()).projectName
      }`
    );
    tasks.textContent = "";
    const taskList = ProjectManager.getProject(currentProject()).name;
    taskList.forEach((item, index) => {
      console.log(item.title);
      createTask(item.title, item.desc, item.dueDate, item.piority);
    });
  }
  function menuu() {
    menu.classList.toggle("fade");
  }
  // function toggleProjectMenu(){
  //   projectMenu.classList.toggle("fade");
  // }
  function showProjectMenu() {
    projectMenu.style.cssText = "display: block";
  }
  function hideProjectmenu() {
    projectMenu.style.cssText = "display: none";
  }
  function init() {
    const home = new Project("Home");
    const today = new Project("Today");
    const week = new Project("Week");
    ProjectManager.addProject(home);
    ProjectManager.addProject(today);
    ProjectManager.addProject(week);
    renderProjects();

    addTask.addEventListener("click", () => menuu());
    submit.addEventListener("click", () => {
      // hideMenu();
      menuu();
      ProjectManager.addTask(
        currentProject(),
        new Task(
          getFormValues("title"),
          getFormValues("desc"),
          getFormValues("date"),
          getFormValues("piority")
        )
      );
      renderTasks();
    });
    addProject.addEventListener("click", () => {
      // toggleProjectMenu();
      showProjectMenu();
    });
    // container.addEventListener("click", () => menuu());
    projectSubmit.addEventListener("click", () => {
      ProjectManager.addProject(new Project(getFormValues("projectName")));
      renderProjects();
      hideProjectmenu();
    });
  }
  return { init };
})();
export default UI;
