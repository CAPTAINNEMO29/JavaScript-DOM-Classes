class Projects {}

class Helper {
  static claerEvents(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestination) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestination);
    destinationElement.append(element);
  }
}

class ToolTip {}

class ProjectItem {
  constructor(id, updateProjectList, type) {
    this.updateProjectListHandler = updateProjectList;
    this.id = id;
    this.infoButton();
    this.switchProject(type);
  }
  infoButton() {}
  switchProject(type) {
    //     const projectItemElement = document.getElementById(this.id);
    const elementItem = document.querySelector(`#${this.id}`);
    let switchButton = elementItem.querySelector("button:last-of-type");
    switchButton = Helper.claerEvents(switchButton);
    switchButton.textContent = type === "active" ? "finish" : "Activate";
    switchButton.addEventListener(
      "click",
      this.updateProjectListHandler.bind(null, this.id)
    );
  }
  update(updateProjectList, type) {
    this.updateProjectListHandler = updateProjectList;
    this.switchProject(type);
  }
}

class ProjectList {
  projects = [];
  constructor(type) {
    this.type = type;
    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    // console.log(projectItems);
    for (let projectItem of projectItems) {
      this.projects.push(
        new ProjectItem(
          projectItem.id,
          this.switchProject.bind(this),
          this.type
        )
      );
    }
  }

  setSwitchHandler(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }
  addProject(project) {
    this.projects.push(project);
    Helper.moveElement(project.id, `#${this.type}-projects ul`);
    // console.log(this);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    // this.switchHandler(this.projects.find((p) => p.id === projectId));
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
