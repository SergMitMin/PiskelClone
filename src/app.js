import MainModel from './models/MainModel';
import MainView from './views/MainView';
import MainController from './controllers/MainController';
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
export default class App {
  start() {
    // login
    const mainModel = new MainModel();
    mainModel.init();
    const mainView = new MainView();
    const mainController = new MainController(mainModel, mainView);
  }
}
