"use strict";angular.module("gabineteApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/integrantes/:sector",{templateUrl:"views/integrantes.html",controller:"IntegrantesCtrl",controllerAs:"main"}).otherwise({redirectTo:"/integrantes/Gabinete nacional confirmado"})}]).service("TabletopService",["$q",function(a){this.data=!1,this.loading=!1,this.getDataOptions=function(){var b=this;return a(function(a,c){b.getData().then(function(b){var c=_.reduce(b,function(a,b,c){return b.elements.length>0&&a.push(c),a},[]);a(c)})})},this.getDataSector=function(b){var c=this;return a(function(a,d){c.getData().then(function(c){c[b]&&a(c[b])})})},this.getData=function(){var b=this;return a(function(a,c){b.data?a(b.data):(b.loading=!0,Tabletop.init({key:"1MGKBNtMQKpgm4d06j2umafrh3C3nf_gxzuX3iUkJyOs",callback:function(c,d){b.data=c,a(angular.copy(b.data)),b.loading=!1},simpleSheet:!1,parseNumbers:!0}))})}}]),angular.module("gabineteApp").controller("MenuCtrl",["$scope","TabletopService",function(a,b){b.getDataOptions().then(function(b){a.options=b})}]),angular.module("gabineteApp").controller("IntegrantesCtrl",["$scope","TabletopService","$routeParams",function(a,b,c){a.sector=c.sector,a.loading=!0,b.getDataSector(c.sector).then(function(b){a.cargos=_.groupBy(b.elements,function(a){return a.grupo}),a.loading=!1})}]),angular.module("gabineteApp").run(["$templateCache",function(a){a.put("views/integrantes.html",'<h1>{{sector}}</h1> <div ng-show="loading" class="row row-centered"> <div class="loader"></div> </div> <div class="row row-centered" ng-repeat="(key, personas) in cargos"> <div class="col-xs-12"> <h2>{{key}}</h2> </div> <div class="col-lg-3 col-sm-6 col-centered" ng-class="{ }" ng-repeat="(key, p) in personas"> <div class="card hovercard"> <div class="cardheader" ng-class="{ available: (p.entrante==\'\') }"> </div> <div class="avatar"> <img alt="" ng-src="{{p.foto || \'https://upload.wikimedia.org/wikipedia/commons/3/33/White_square_with_question_mark.png\' }}" class="portrait"> </div> <div class="info"> <div class="title"> <a>{{p.entrante || \'Indefinido\'}}</a> </div> <div class="desc">{{p.cargo}}</div> <div class="desc" ng-if="p.saliente">Reemplaza a: <strong>{{p.saliente}}</strong></div> <div class="desc" ng-if="!p.saliente">Es un nuevo cargo</div> </div> <div class="bottom"> <a ng-if="p.confirmacion" class="btn btn-primary btn-sm" target="_blank" href="{{p.confirmacion}}"> Confirmación oficial </a> <a ng-if="p.chequeos" class="btn btn-warning btn-sm" target="_blank" href="{{p.chequeos}}"> Chequeos </a> </div> </div> </div> </div>')}]);