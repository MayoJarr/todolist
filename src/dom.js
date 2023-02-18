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
    const task3 = document.createElement("div");
    const title = document.createElement("div");
    const date = document.createElement("div");
    const desc = document.createElement("div");
    const piority = document.createElement("div");
    const buttons = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const radio = document.createElement("input");
    radio.type = "checkbox";
    radio.classList.add("check");
    // const circle = document.createElement("div")
    task.classList.add("task");
    deleteBtn.classList.add("deleteBtn");
    task2.classList.add("task2");
    // circle.classList.add("circle")
    title.textContent = titleV;
    date.textContent = dateV;
    deleteBtn.textContent = " del";
    editBtn.textContent = "edit ";
    tasks.appendChild(task);
    // task.appendChild(circle);
    task.appendChild(task2);
    task2.appendChild(radio);
    task2.appendChild(task3)
    task3.appendChild(title);
    task3.appendChild(date);
    task3.appendChild(desc);
    task3.appendChild(piority);
    task.appendChild(buttons);
    buttons.appendChild(editBtn);
    buttons.appendChild(deleteBtn);
  }
  function createProject(project) {
    const ul = document.querySelector(".project");
    const li = document.createElement("LI");
    const projectt = document.createElement("button");
    projectt.textContent = project.getProjectName();
    projectt.classList.add(project.getProjectName());
    projectt.classList.add("button-nav");
    ul.appendChild(li);
    li.appendChild(projectt);
    projectt.addEventListener("click", (e) => {
      if (e.target.classList.contains("active")) return;
      console.log(`${project.getProjectName()} is clicked`);
      setActiveButton(projectt);
      tasks.textContent = "";
      renderTasks(currentProject());
    });
  }
  function setActiveButton(button) {
    const buttons = document.querySelectorAll(".button-nav");
    
    buttons.forEach((button) => {
      if (button !== this) {
        button.classList.remove("active");
      }
    });
    button.classList.add("active");
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
    const projects = document.querySelectorAll(".button-nav");
    let cpp = 0;
    let score = 0;
    projects.forEach((project) => {
      if (project.classList.contains("active")) {
        // console.log(`current project is ${project.classList} and it has number of ${cpp}`);
        score = cpp;
      }
      cpp = cpp + 1;
    });
    return score;
  }
  function renderProjects() {
    projectList.textContent = "";
    ProjectManager.getProjects().forEach((item, index) => {
      createProject(ProjectManager.getProject(index));
    });
  }
  function renderTasks(project) {
    console.log(
      `this task goes to: ${
        ProjectManager.getProject(project).projectName
      }`
    );
    tasks.textContent = "";
    const taskList = ProjectManager.getProject(project).name;
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
  function setDefaultProject(){
    const defaultProject = document.querySelector(".Home")
    setActiveButton(defaultProject);
  }
  function init() {
    const home = new Project("Home");
    const today = new Project("Today");
    const week = new Project("Week");
    ProjectManager.addProject(home);
    ProjectManager.addProject(today);
    ProjectManager.addProject(week);
    renderProjects();

    setDefaultProject();

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
      renderTasks(currentProject());
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
