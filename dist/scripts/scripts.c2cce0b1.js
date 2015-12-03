"use strict";angular.module("gabineteApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","slugifier"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/integrantes.html",controller:"IntegrantesCtrl",controllerAs:"main"}).when("/integrantes/:persona",{templateUrl:"views/integrantes.html",controller:"IntegrantesCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"})}]).service("TabletopService",["$q","Slug",function(a,b){this.keys=!1,this.data=!1,this.loading=!1,this.getData=function(){var c=this;return a(function(a,d){c.data?a({data:c.data,keys:c.keys}):(c.loading=!0,Tabletop.init({key:"1MGKBNtMQKpgm4d06j2umafrh3C3nf_gxzuX3iUkJyOs",callback:function(d,e){c.data=d,c.keys={},_.each(e.foundSheetNames,function(a){d[a].elements.length>0&&(c.keys[b.slugify(a)]=a)}),c.loading=!1,a({data:c.data,keys:c.keys})},simpleSheet:!1,parseNumbers:!0}))})}}]),angular.module("gabineteApp").controller("MenuCtrl",["$scope","TabletopService",function(a,b){b.getData().then(function(b){a.options=b.keys})}]),angular.module("gabineteApp").controller("IntegrantesCtrl",["$scope","TabletopService","$routeParams","Slug",function(a,b,c,d){a.loading=!0,b.getData().then(function(b){c.persona&&b.keys[d.slugify(c.persona)]?a.persona=b.keys[d.slugify(c.persona)]:a.persona=_.values(b.keys)[0],a.cargos=_.groupBy(b.data[a.persona].elements,function(a){return a.grupo}),a.loading=!1})}]),angular.module("gabineteApp").run(["$templateCache",function(a){a.put("views/integrantes.html",'<h1>Primer gabinete confirmado de {{sector}}</h1> <div ng-show="loading" class="row row-centered"> <div class="loader"></div> </div> <div class="row row-centered" ng-repeat="(key, personas) in cargos"> <div class="col-xs-12"> <h2>{{key}}</h2> </div> <div class="col-lg-3 col-sm-6 col-centered" ng-class="{ }" ng-repeat="(key, p) in personas"> <div class="card hovercard"> <div class="cardheader" ng-class="{ available: (p.entrante==\'\') }"> </div> <div class="avatar" style="background-image:url({{p.foto || \'https://upload.wikimedia.org/wikipedia/commons/3/33/White_square_with_question_mark.png\' }})"> </div> <div class="info"> <div class="title"> <h3>{{p.entrante || \'Indefinido\'}}</h3> </div> <div class="desc">{{p.cargo}}</div> <div class="desc" ng-if="p.saliente">Reemplaza a: <strong>{{p.saliente}}</strong></div> <div class="desc" ng-if="!p.saliente">Es un nuevo cargo</div> </div> <div class="bottom"> <a ng-if="p.confirmacion" class="btn btn-primary btn-sm" target="_blank" href="{{p.confirmacion}}"> Confirmación oficial </a> <a ng-if="p.chequeos" class="btn btn-warning btn-sm" target="_blank" href="{{p.chequeos}}"> Chequeos </a> </div> </div> </div> </div>')}]);