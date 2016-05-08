/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { authRouterConfig } from './auth/auth.route';
import { userRouterConfig } from './user/user.route';
import { groupRouterConfig } from './group/group.route';
import { profileRouterConfig } from './profile/profile.route';
import { packageRouterConfig } from './package/package.route';
import { reportRouterConfig } from './report/report.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { GroupController } from './group/group.controller';
import { ProfileController } from './profile/profile.controller';
import { PackageController } from './package/package.controller';
import { ReportController } from './report/report.controller';
// import { ModalController } from '../app/components/modal/modal.controller';
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
  'ui.bootstrap',
  'btford.markdown',
  'chart.js'])
  

  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .config(authRouterConfig)
  .config(userRouterConfig)
  .config(groupRouterConfig)
  .config(packageRouterConfig)
  .config(profileRouterConfig)
  .config(reportRouterConfig)
  .config(function (markdownConverterProvider) {
    console.log(markdownConverterProvider);
    markdownConverterProvider.config({
      extensions: ['github']
    });
  })
  .run(runBlock)
  .service('request', requestService)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .controller('MainController', MainController)
  .controller('AuthController', AuthController)
  .controller('UserController', UserController)
  .controller('GroupController', GroupController)
  .controller('ProfileController', ProfileController)
  .controller('PackageController', PackageController)
  .controller('ReportController', ReportController)
  // .controller('ModalController', ModalController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective);
