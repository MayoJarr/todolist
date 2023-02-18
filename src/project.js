const ProjectManager = (() => {
  const projects = [];
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
  return { addProject, getProjects, getProject, addTask };
})();

class Project {
  constructor(projectName) {
    this.projectName = projectName;
  }
  name = [];
  addItemToProject(item) {
    this.name.push(item);
  }
  getProjectItems() {
    return this.name;
  }
  getProjectName() {
    return this.projectName;
  }
}

export { Project, ProjectManager };
