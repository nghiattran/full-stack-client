/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { authRouterConfig } from './auth/auth.route';
import { userRouterConfig } from './user/user.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { ModalController } from '../app/components/modal/modal.controller';
import { requestService } from '../app/components/request/request.service';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';


angular.module('gulpAngular', [
  'ngAnimate', 
  'ngCookies', 
  'ngTouch', 
  'ngSanitize', 
  'ngMessages', 
  'ngAria', 
  'ngResource', 
  'ui.router', 
  'toastr', 
  'angular-jwt',
  'ui.bootstrap'])

  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .config(authRouterConfig)
  .config(userRouterConfig)
  .run(runBlock)
  .service('request', requestService)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .controller('MainController', MainController)
  // .controller('AuthController', AuthController)
  .controller('UserController', UserController)
  .controller('ModalController', ModalController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective);
