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
  const overlay = document.querySelector(".overlay");
  const expandedTask = document.querySelector(".expandedTask");
  const projectTitle = document.querySelector(".projectTitle");

  function createTask(taskObj) {
    const task = document.createElement("div");
    const task2 = document.createElement("div");
    const task3 = document.createElement("div");
    const title = document.createElement("div");
    const date = document.createElement("div");
    const desc = document.createElement("div");
    const piority = document.createElement("div");
    const buttons = document.createElement("div");
    const deleteBtn = document.createElement("button");
    // const editBtn = document.createElement("button");
    const radio = document.createElement("input");
    radio.type = "checkbox";
    radio.classList.add("check");
    task.classList.add("task");
    deleteBtn.classList.add("deleteBtn");
    task2.classList.add("task2");
    task3.classList.add("task3");
    title.textContent = taskObj.title;
    date.textContent = taskObj.dueDate;
    // deleteBtn.textContent = " del";
    deleteBtn.innerHTML =
      '<img src="img/trash.svg" style="width: 25px; height: 25px;">';
    // editBtn.textContent = "edit ";
    tasks.appendChild(task);
    task.appendChild(task2);
    task2.appendChild(radio);
    task2.appendChild(task3);
    task3.appendChild(title);
    task3.appendChild(date);
    task3.appendChild(desc);
    task3.appendChild(piority);
    task.appendChild(buttons);
    // buttons.appendChild(editBtn);
    buttons.appendChild(deleteBtn);

    // editBtn.addEventListener("click", () => editTask(taskObj));
    deleteBtn.addEventListener("click", () => deleteTask(taskObj));
    radio.addEventListener("click", () => changeCompleteStatus(taskObj));
    task3.addEventListener("click", () => expand(taskObj));
    if (taskObj.complete === false) {
      title.style.cssText = "text-decoration: none;";
      task.style.cssText = "opacity: 1";
    } else if (taskObj.complete === true) {
      title.style.cssText = "text-decoration-line: line-through;";
      task.style.cssText = "opacity: .5";
    }
    setPiorityColor(taskObj.piority, task3);
  }
  function setPiorityColor(taskPiority, item) {
    if (taskPiority === "low")
      item.style.cssText = "border-left: 3px solid green";
    if (taskPiority === "medium")
      item.style.cssText = "border-left: 3px solid orange";
    if (taskPiority === "high")
      item.style.cssText = "border-left: 3px solid red";
  }
  function expand(task) {
    const title = document.querySelector(".title1");
    const date = document.querySelector(".date1");
    const desc = document.querySelector(".desc1");
    const piority = document.querySelector(".piority1");
    title.textContent = task.title;
    date.textContent = task.dueDate;
    desc.textContent = task.desc;
    piority.textContent = task.piority;
    show(expandedTask, "expandedTaskActive");
    const edit = document.querySelector(".edit");
    edit.style.cssText = "display:block;";
    edit.addEventListener("click", () => editTask(task));
  }
  function show(thingName, activeThingName) {
    thingName.classList.add(activeThingName);
    overlay.classList.add("overlayActive");
    container.style.cssText = "filter: blur(2px);";
  }
  function hide(thingName, activeThingName) {
    thingName.classList.remove(activeThingName);
    overlay.classList.remove("overlayActive");
    container.style.cssText = "filter: none;";
  }
  function editTask(task) {
    const edit = document.querySelector(".edit");
    edit.style.cssText = "display: none";
    const ti = document.querySelector(".taskInfoData");
    const tiE = document.querySelector(".taskInfoDataEditable");
    ti.style.cssText = "display: none;";
    tiE.style.cssText = "display: block;";
    const submitEdit = document.querySelector(".submitEdit");
    submitEdit.addEventListener("click", (e) => {
      e.preventDefault();
      closeEditMenu();
      task.edit(suckt.value, suckd.value, suckdd.value, suckp.value);
      renderTasks(currentProject());
      hide(expandedTask, "expandedTaskActive");
    });
    const suckt = document.querySelector(".suckt");
    const suckdd = document.querySelector(".suckdd");
    const suckd = document.querySelector(".suckd");
    const suckp = document.querySelector(".suckp");
    suckt.value = task.title;
    suckdd.value = task.dueDate;
    suckd.value = task.desc;
    suckp.value = task.piority;
  }
  function closeEditMenu() {
    const ti = document.querySelector(".taskInfoData");
    const tiE = document.querySelector(".taskInfoDataEditable");
    ti.style.cssText = "display: block;";
    tiE.style.cssText = "display: none;";
  }
  function deleteTask(taskObj) {
    ProjectManager.getProject(currentProject()).removeTaskByIndex(
      taskObj.title
    );
    renderTasks(currentProject());
  }
  function changeCompleteStatus(taskObj) {
    if (taskObj.complete === false) taskObj.setDone();
    else if (taskObj.complete === true) taskObj.setUnDone();
    renderTasks(currentProject());
  }
  function deleteProject(project) {
    ProjectManager.deleteProject(project.getProjectName());
    renderProjects();
  }
  function createProject(project) {
    const ul = document.querySelector(".project");
    const li = document.createElement("LI");
    const projectt = document.createElement("button");
    const del = document.createElement("button");
    projectt.textContent = project.getProjectName();
    // del.textContent = "/"
    del.innerHTML =
      '<img src="img/trash.svg" style="width: 25px; height: 25px;">';
    projectt.classList.add(project.getProjectName());
    projectt.classList.add("button-nav");
    ul.appendChild(li);
    li.appendChild(projectt);
    projectt.appendChild(del);
    projectt.addEventListener("click", (e) => {
      if (e.target.classList.contains("active")) return;
      console.log(`${project.getProjectName()} is clicked`);
      setActiveButton(projectt);
      tasks.textContent = "";
      renderTasks(currentProject());
    });
    del.addEventListener("click", () => deleteProject(project));
    setDefaultProject(project.getProjectName());
    renderTasks(currentProject());
    // addToLocalStorage(project.getProjectName(), project);
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
  function getFormValues(name) {
    return document.querySelector(`.${name}`).value;
  }
  function currentProject() {
    const projects = document.querySelectorAll(".button-nav");
    let cpp = 0;
    let score = 0;
    projects.forEach((project) => {
      if (project.classList.contains("active")) {
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
    tasks.textContent = "";
    const taskList = ProjectManager.getProject(project).name;
    taskList.forEach((item, index) => {
      createTask(ProjectManager.getProject(project).getProjectTask(index));
    });
    projectTitle.textContent = ProjectManager.getProject(
      currentProject()
    ).getProjectName();
    addToLocalStorage("projects", ProjectManager.getProjects());
    // console.log(ProjectManager.getProjects());
  }
  function setDefaultProject(project) {
    const defaultProject = document.querySelector(`.${project}`);
    setActiveButton(defaultProject);
  }
  function storage() {
    function storageAvailable(type) {
      let storage;
      try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
      } catch (e) {
        return (
          e instanceof DOMException &&
          (e.code === 22 ||
            e.code === 1014 ||
            e.name === "QuotaExceededError" ||
            e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
          storage &&
          storage.length !== 0
        );
      }
    }
    if (storageAvailable("localStorage")) {
      console.log("localstorage right here");
      if (localStorage.length < 1) {
        loadDefaultOptions();
      } else {
        console.log("storage not empty");
        loadFromStorage();
      }
    } else {
      alert("no localstorage avaible :(");
    }
  }
  function loadDefaultOptions() {
    console.log("storage empty");
    const home = new Project("Home");
    const today = new Project("Today");
    const week = new Project("Week");
    ProjectManager.addProject(home);
    ProjectManager.addProject(today);
    ProjectManager.addProject(week);
    renderProjects();
    setDefaultProject("Home");
    ProjectManager.addTask(
      currentProject(),
      new Task("task1", "desc", "20-02-2023", "low")
    );
    ProjectManager.addTask(
      currentProject(),
      new Task("task2", "desc", "20-02-2023", "medium")
    );
    ProjectManager.addTask(
      currentProject(),
      new Task("task3", "desc", "20-02-2023", "high")
    );
    renderTasks(currentProject());
  }
  function addToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  function loadFromStorage() {
    const storageItem = JSON.parse(localStorage.getItem("projects"));
    storageItem.forEach((project, index) => {
      ProjectManager.addProject(new Project(storageItem[index].projectName));
      project.name.forEach((task, i, array) => {
        ProjectManager.addTask(
          index,
          new Task(task.title, task.dueDate, task.desc, task.piority)
        );
      });
      renderTasks(index);
    });
    renderProjects();
  }
  function sideMenu() {
    const sideMenuBtn = document.querySelector(".sideMenuBtn");
    const sideMenu = document.querySelector(".sidebar");
    sideMenuBtn.addEventListener("click", () => {
      sideMenu.classList.toggle("show");
    });
  }
  function init() {
    storage();

    addTask.addEventListener("click", () => show(menu, "fade"));
    submit.addEventListener("click", (e) => {
      e.preventDefault();
      hide(menu, "fade");
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
      show(projectMenu, "projectMenuActive");
    });
    projectSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      ProjectManager.addProject(new Project(getFormValues("projectName")));
      renderProjects();
      hide(projectMenu, "projectMenuActive");
    });
    overlay.addEventListener("click", () => {
      hide(menu, "fade");
      hide(projectMenu, "projectMenuActive");
      hide(expandedTask, "expandedTaskActive");
      closeEditMenu();
    });
    addToLocalStorage("projects", ProjectManager.getProjects());
    sideMenu();
  }
  return { init };
})();
export default UI;
