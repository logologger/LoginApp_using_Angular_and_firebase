
/*

angular JS Directives


E-----Element
C-----Class
M-----comment
A------Attributes

Different ways of writing directives

ng-bind

<input type="text" ng-model="directivename" placeholder="name" />
<span ng-bind="directivename"></span>
<span ng:bind="directivename"></span>
<span ng_bind="directivename"></span>
<span x-ng-bind="directivename"></span>
<span data-ng-bind="directivename"></span>


Camel Casing in AngularJS


let the name of directive that you specify in angularJS be rajatSinghBhadauria

then in html we will write it as rajat-singh-bhadauria

Restrict--option

Four restrict option are available in AngularJS

'A' - <span ng-sparkline></span>
'E' - <ng-sparkline></ng-sparkline>
'C' - <span class="ng-sparkline"></span>
'M' - <!-- directive: ng-sparkline -->

restrict:'EA' ---specifies that directive is made for element and attribute only

We can specify template or templateUrl

template tells the template that should be loaded in place of that directive

DOM manipulation should never be done in controller function

$watch function is called in every $digest cycle in AngularJS

Please refer this link for Directives

http://www.ng-newsletter.com/posts/directives.html

Understanding Promises 
http://andyshora.com/promises-angularjs-explained-as-cartoon.html


Please refer the below link for complete understanding of Promises and deferred 

http://www.webdeveasy.com/javascript-promises-and-angularjs-q-service/

*/


angular.module('7minworkout').directive('workOut',function()
{
  return {
    restrict:'EACM',
    template:'<button class="btn btn-alert btn-lg">Hymn for the Weekend</button>'
    
    
    
  };
  
  
  
});