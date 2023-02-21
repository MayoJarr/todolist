const ProjectManager = (() => {
  let projects = [];
  function addProject(project) {
    projects.push(project);
  }
  function getProjects() {
    return projects;
  }
  function getProject(i) {
    return projects[i];
  }
  function addTask(projectIndex, item) {
    // projects[projectIndex].push(item);
    getProject(projectIndex).name.push(item);
  }
  function removeTask(projectIndex, itemIndex){
    getProject(projectIndex).name.splice(itemIndex, 1);
  }
  function deleteProject(projectTitle){
    let i;
    projects.forEach((element, index) => {
      if (element.getProjectName() === projectTitle) i = index;
    });
    projects.splice(i, 1);
  }
  function setProjects(newProjects){
    projects = newProjects;
  }
  return { addProject, getProjects, getProject, addTask, removeTask, deleteProject, setProjects };
})();

class Project {
  constructor(projectName) {
    this.projectName = projectName;
  }
  name = [];
  getProjectName() {
    return this.projectName;
  }
  getProjectItems() {
    return this.name;
  }
  getProjectTask(index) {
    return this.name[index];
  }
  removeTaskByIndex(taskName){
    let i;
    this.name.forEach((element, index) => {
     if(element.title === taskName) i = index;
    });
    this.name.splice(i, 1);
  }
}

export { Project, ProjectManager };
