class Projects {}

class ProjectItem {
  constructor(id, updateProjectList) {
    this.updateProjectListHandler = updateProjectList;
    this.id = id;
    this.infoButton();
    this.switchProject();
  }
  infoButton() {}
  switchProject() {
    const elementItem = document.querySelector(`#${this.id}`);
    const switchButton = elementItem.querySelector("button:last-of-type");
    switchButton.addEventListener("click", this.updateProjectListHandler);
  }
}

class ProjectList {
  projects = [];
  constructor(type) {
    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    // console.log(projectItems);
    for (let projectItem of projectItems) {
      this.projects.push(
        new ProjectItem(projectItem.id, this.switchProject.bind(this))
      );
    }
    // console.log(this.projects);
    // const finishedtItems = document.querySelectorAll(`#${type}-projects`);
    // console.log(finishedtItems);
  }

  setSwitchHandler(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }
  addProject() {
    console.log(this);
  }
  switchProject(projectId) {
    this.switchHandler(this.projects.find((e) => e.id === projectId));
    // const projectIndex = this.projects.findIndex((e) => e.id === projectId);
    // this.projects.splice(projectIndex, 1);
    this.projects = this.projects.filter((e) => e.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");
    activeProjectsList.setSwitchHandler(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandler(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
  }
}

App.init();
