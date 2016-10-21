import './home.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './home.routes';
import HomeController from './home.controller';
import randomNames from '../../services/randomNames.service';
import histogram from '../../directives/histogram/histogram.directive.js';
import ngUpload from 'ngUpload';
import ngFileModel from 'ng-file-model';

export default angular.module('app.home', [uirouter, randomNames, histogram, 'ngUpload', 'ng-file-model'])
  .config(routing)
  .controller('HomeController', HomeController)
  .name;
