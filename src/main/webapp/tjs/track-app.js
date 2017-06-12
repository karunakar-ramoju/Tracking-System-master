
var hostname ="http://localhost:8080";
  //hostname = "http://service-trackingsys.1d35.starter-us-east-1.openshiftapps.com";
 //var hostname = "http://service-itemmngtally.7e14.starter-us-west-2.openshiftapps.com"


var app = angular.module("trackingApp", ["ngRoute","LocalStorageModule"]);
app.config(['$routeProvider', '$locationProvider','localStorageServiceProvider', function ($routeProvider, $locationProvider,localStorageServiceProvider) {
    $routeProvider
	/*.when('/',
	      { 
		    controller: 'loginController',
		    templateUrl :'/inline-login.html',
		  })
	*/.when('/login',
	      { 
		    controller: 'loginController',
		    templateUrl :'/inline-login.html',
		  })
	  .when('/logout',
	  { 
		controller: 'logoutController',
		templateUrl :'/inline-logout.html',
	  })
	.when('/show-company'	,
	      { 
		    controller: 'companiesController',
		    templateUrl :'/inline-companies.html',
		  })		  
	.when('/create-company'	,
	      { 
		    controller: 'createCompanyController',
		    templateUrl :'/inline-create-company.html',
		  })
	.when('/edit-company'	,
	      { 
		    controller: 'editCompanyController',
		    templateUrl :'/inline-create-company.html',
		  })	
	.when('/perform-action'	,
	      { 
		    controller: 'performActionController',
		    templateUrl :'/inline-perform-action.html',
		  })	
	.when('/create-stock-groups'	,
	      { 
		    controller: 'stockGroupController',
		    templateUrl :'/inline-create-stocks-groups.html',
		  })	
	.when('/create-stock-items'	,
	      { 
		    controller: 'stockItemController',
		    templateUrl :'/inline-create-stocks-items.html',
		  })
	.when('/view-stock-items'	,
	      { 
		    controller: 'showStockItemController',
		    templateUrl :'/inline-view-stocks-items.html',
		  })		  
	.when('/view-stock-groups'	,
	      { 
		    controller: 'showStockGroupsController',
		    templateUrl :'/inline-view-stock-groups.html',
		  })	
	.when('/show-user'	,
	      { 
		    controller: 'usersController',
		    templateUrl :'/inline-users.html',
		  })		  
	.when('/create-user'	,
	      { 
		    controller: 'createUserController',
		    templateUrl :'/inline-create-user.html',
		  })
	.when('/edit-user'	,
	      { 
		    controller: 'editUserController',
		    templateUrl :'/inline-create-user.html',
		  })
	.when('/assign-users-company'	,
	      { 
		    controller: 'assignUsersController',
		    templateUrl :'/inline-assign-users-company.html',
		  })
	.when('/create-account-groups'	,
	      { 
		    controller: 'accGroupController',
		    templateUrl :'/inline-create-account-groups.html',
		  })
	.when('/view-account-groups'	,
	      { 
		    controller: 'showAccountGroupsController',
		    templateUrl :'/inline-view-account-groups.html',
		  })	
	.when('/create-ledgers'	,
	      { 
		    controller: 'createLedgerController',
		    templateUrl :'/inline-create-ledger.html',
		  })
	.when('/edit-ledger'	,
	      { 
		    controller: 'editLedgerController',
		    templateUrl :'/inline-create-ledger.html',
		  })		  
	.when('/view-ledgers'	,
	      { 
		    controller: 'ledgerController',
		    templateUrl :'/inline-ledgers.html',
		  })	
	.when('/show-employee'	,
	      { 
		    controller: 'employeesController',
		    templateUrl :'/inline-employees.html',
		  })		  
	.when('/create-employee'	,
	      { 
		    controller: 'createEmployeeController',
		    templateUrl :'/inline-create-employee.html',
		  })
	.when('/edit-employee'	,
	      { 
		    controller: 'editEmployeeController',
		    templateUrl :'/inline-create-employee.html',
		  })
	.when('/show-task'	,
	      { 
		    controller: 'taskController',
		    templateUrl :'/inline-task.html',
		  })		  
	.when('/create-task'	,
	      { 
		    controller: 'createTaskController',
		    templateUrl :'/inline-create-task.html',
		  })
	.when('/edit-task'	,
	      { 
		    controller: 'editTaskiController',
		    templateUrl :'/inline-create-task.html',
		  })		  
	.when('/reports',{template:'This is the Report Route'})
	.otherwise({template:'This is the Report Route'});
	
	
	localStorageServiceProvider
    .setPrefix('myApp')
    .setStorageType('sessionStorage')
    .setNotify(true, true);
	
}]); 


//
app.run(function($rootScope,$location,$http,localStorageService) {
    $rootScope.countries = [ { id:1, name :"India" } , { id:2, name :"Singapore" }, { id:3, name :"US" },{ id:4, name :"UK" }];
	$rootScope.states = [ { id:1, name :"Andhra Pradesh" } , { id:2, name :"Telangana" }];
	
    //Should load Employees from Backend
	//$rootScope.companies = [ {name:'IBM'},{name:'Cohnizant'},{name:'InfoSys'}]; 
	
	/*$http.get(hostname+'/company/getAll').
			then(function(response) {
				$rootScope.companies = response.data;
	});*/

	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
	  //..do something
	  //event.stopPropagation();  //if you don't want event to bubble up 
	  //console.log(" loginedUser : " + localStorageService.get("loggedUser"));
	  //console.log(" current " + current);
	  console.log(" next.templateUrl " + next.templateUrl);
			if ( localStorageService.get("loggedUser") == null || $rootScope.loggedUser == null) {
				 //console.log(" inside if "  + (next.templateUrl == "/inline-logout.html"));
				// no logged user, we should be going to #login
				if ( next.templateUrl == "inline-login.html") {
				  // already going to #login, no redirect needed
				} else {
				  // not going to #login, we should redirect now
				  $location.path( "/login" );
				}
			} else if(next.templateUrl == null){
				$location.path( "/show-company" );
			}
	});
	
	//$location.path("/");
						  
});

app.controller('loginController', function($scope,$rootScope,$location,$http,localStorageService,$window) {
		console.log("localStorageService : " + localStorageService.isSupported);
		
		if(localStorageService.isSupported) {
			//localStorageService.set(key, val);
			//localStorageService.get(key);
        }else{
		  $location.path("login");	
		}
		
	$scope.login = function(user){
		
		
			var dataObj = JSON.stringify(user);
			//$scope.invalidUser = true;
			$http.post(hostname + '/user/login', dataObj, {
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  },
			}).success(function(responseData) {
				  try {
					   console.log("LOgin Response : " + JSON.stringify(responseData));
						if(responseData != null && responseData.username != null){
							localStorageService.set("loggedUser",responseData);
							$rootScope.loggedUser = responseData;
							$rootScope.user = responseData;
							$scope.user = responseData;
							$scope.invalidUser = false;
							$location.path("/show-company");
						}else{
							$scope.invalidUser = true;
						}
				  } catch (err) {
					alert(JSON.stringify(err));
					$scope.invalidUser = true;
				  }
			 }).error(function(data, status, headers, config) {
				console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
				$scope.invalidUser = true;
			  });		
		
		//window.location.href = "#/show-company";
		//$window.location.hash = '#/' + "show-company";
	}
	
	$scope.logout = function(){
		localStorageService.remove("loginedUser");
		localStorageService.clearAll();
		$location.path("login");
	}	
});	


app.controller('logoutController', function($scope,$rootScope,$location,$http,localStorageService,$window) {
	
		localStorageService.remove("loginedUser");
		localStorageService.clearAll();
		$rootScope.loggedUser = null;
		//$location.path("login");	
	
	$scope.logout = function(){
		localStorageService.remove("loginedUser");
		localStorageService.clearAll();
		$rootScope.loggedUser = null;
		$location.path("login");
	}	
});	

//
app.controller('companiesController', function($scope,$rootScope,$location,$http,CompanyService) {

	$scope.company ={}; 
	$rootScope.currentPage = 'companyList';
	$rootScope.curTab = 'companyTab';
	
	console.log(" Before Calling companyService " );
   
     CompanyService.getAllCompanies($scope.user, function(response){
      console.log(" CompanyService Response " + JSON.stringify(response));
	  $rootScope.companies = response;
	  $rootScope.curTab = 'companyTab';
   });
	
	/*$http.get(hostname+'/company/getAll').
			then(function(response) {
				$rootScope.companies = response.data;
				$rootScope.curTab = 'companyTab';
	});	*/	
	
	$scope.createCompany = function(){
		$rootScope.currentPage = 'createCompany';
		$location.path("create-company");
	}
	$scope.editCompany = function(company){
		$rootScope.currentPage = 'editCompany';
		$location.path("edit-company");
		$rootScope.company = company ;
	}
	
	$scope.assignUsers = function(company){
		$rootScope.currentPage = 'assignUsers';
		$location.path("assign-users-company");
		$rootScope.company = company ;
	}	
	
	$scope.performAction = function(company){
		$rootScope.currentPage = 'performAction';
		$rootScope.company = company;
		$location.path("perform-action");
		//$scope.curTab = 'companyTab';
	}
	
	$scope.deleteCompany = function(company){

	   var confirmval = confirm("Are you sure you wish to delete Company ? ");
	   if(!confirmval){ return} ;
	   
			var dataObj = JSON.stringify(company);
			console.log(dataObj);
			$http.delete(hostname + '/company/'+company.id , dataObj, {
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  },
			}).success(function(responseData) {
				  try {
					console.log(JSON.stringify(responseData));
					$rootScope.currentPage = 'companyList';
					//$location.path("/show-company");
					var index = $rootScope.companies.indexOf(company);
					console.log( " remove index : " + index);
                    $rootScope.companies.splice(index, 1);    
				  } catch (err) {
					alert(JSON.stringify(err));
				  }
			 }).error(function(data, status, headers, config) {
				console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
			  });
	}	
	
	
	
	$scope.changeTab = function(tabName){
		console.log("changeTab in company");
		$location.path("show-user");
		$scope.curTab = 'userTab';
	}
});

app.controller('createCompanyController', function($scope,$rootScope,$location,$http) {
	$scope.company ={}; 
	$scope.company.country = 1;	
	$scope.company.state = 1;	
	$scope.company.type =1;
	$scope.optType = "create";
	$scope.company.currencesymbol = "Rs.";
	$scope.submitclick = false;
	
	$scope.createCompany = function(company){
		if(!$scope.companyform.$valid){
			$scope.submitclick = true;
			return;
		}

			var dataObj = JSON.stringify(company);
			$http.post(hostname + '/company/create', dataObj, {
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  },
			}).success(function(responseData) {
				  try {
					console.log(JSON.stringify(responseData));
					$rootScope.currentPage = 'companyList';
					$scope.companies.push(company);
					$location.path("/");
				  } catch (err) {
					alert(JSON.stringify(err));
				  }
			 }).error(function(data, status, headers, config) {
				console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
			  });		
	}
	
});

app.controller('editCompanyController', function($scope,$rootScope,$location,$http) {

    $scope.optType = "edit";
 	$scope.submitclick = false;

	$scope.editCompany = function(company){
		
		if(!$scope.companyform.$valid){
			$scope.submitclick = true;
			return;
		}		
			var dataObj = JSON.stringify(company);
			$http.post(hostname + '/company/create', dataObj, {
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  },
			}).success(function(responseData) {
				  try {
					console.log(JSON.stringify(responseData));
					$rootScope.currentPage = 'companyList';
					//$scope.companies.push(company);
					$location.path("/");
				  } catch (err) {
					alert(JSON.stringify(err));
				  }
			 }).error(function(data, status, headers, config) {
				console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
			  });
	}
	
});

app.controller('performActionController', function($scope,$rootScope,$location) {
	
	$rootScope.currentPage = 'performAction';
	$scope.stockGrpoups = function(company){
		$rootScope.currentPage = 'stockGroups';
		//Back end code to edit Company
		$location.path("/stock-groups");
	}	
	
});

app.controller('stockGroupController', function($scope,$rootScope,$location,$http) {
	$rootScope.currentPage = 'createStockGroups';
	
	$scope.singlegroups = [];
	$scope.singlegroup ={};
    $scope.singlegroup.newgroup	= "";
	$scope.multigroups =[];	
	//Groups data received from backend
	console.log(" Fetching group for Company Id : " + $scope.company.id );
	$http.get(hostname + '/stockgroup/find-by-company/'+$scope.company.id).
		then(function(response) 
		{
			$rootScope.groups = response.data;
			//$scope.groups = response.data;
			console.log(" Groupth Length : " + $scope.groups.length)			
			angular.forEach($scope.groups, function (group) 
			{
				if(group.parent === 1){
				  $scope.singlegroups.push(group);
				}
			});	
		});	
						  



	$scope.setChildrenData = function(selGroup,grplevel){
		
		    var selGrpId = (selGroup != null && selGroup.id != null ) ? selGroup.id : -1;
			var children = [];
			angular.forEach($scope.groups, function (group) {
				 if(group.parent == selGrpId){
					children.push(group);
					//$scope.multigroups[grplevel].children.push(group);
				 }
			});	
			
			console.log("before : "+ $scope.multigroups.length);
			var tempGrps = [];
			for(i=0;i<grplevel; i++){
				
				if($scope.multigroups[i] != null){
					tempGrps[i]  = $scope.multigroups[i];
				}else{
				 tempGrps[i] = {};
				 tempGrps[i].children = [];
				}
			}
			$scope.multigroups = tempGrps;
			if(selGrpId > 0){
				$scope.multigroups[grplevel] = {};
				$scope.multigroups[grplevel].children = children;
			}
		   // $scope.multigroups[grplevel].children.push(children);
			console.log("After :" + $scope.multigroups.length  +"   "+ children);
	}
	
	$scope.addGroup = function(selGroup,grplevel){
		var newgroup = {};
		newgroup.name = selGroup;
		//newgroup.id = $scope.groups.length;
		newgroup.parent = 1;
		newgroup.company = {};
		newgroup.company.id = $scope.company.id;
		
		if(grplevel == 0){
			//$scope.groups.push(newgroup);
		}else if(grplevel == 1){
			newgroup.parent = $scope.singlegroup.selGroup.id;
		}else{
			newgroup.parent = $scope.multigroups[grplevel-2].selGroup.id;
		}		
		
		var dataObj = JSON.stringify(newgroup);
		console.log(dataObj);
		
		$http.post(hostname + '/stockgroup/create', dataObj, {
		  headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		  },
		}).success(function(responseData) {
			console.log("GRP Response : " + responseData.id);
			  try {
                newgroup.id = responseData.id;
					if(grplevel == 0){
						$scope.singlegroups.push(newgroup);
						$scope.groups.push(newgroup);
					}else if(grplevel == 1){
						$scope.multigroups[0].children.push(newgroup);
						$scope.groups.push(newgroup);			
					}else{
						$scope.multigroups[grplevel-1].children.push(newgroup);
						$scope.groups.push(newgroup);			
					}			  
			  } catch (err) {
				console.log(JSON.stringify(err));
			  }
		 }).error(function(data, status, headers, config) {
			console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
		  });		
	

		console.log(newgroup);
	}
    		
						  
});

app.controller('stockItemController', function($scope,$rootScope,$location,$http) {
	$rootScope.currentPage = 'createStockItems';
	
	//Groups data received from backend
	$scope.stockGroups = [];
	$scope.stockGroups[0] = {};	
	$scope.stockGroups[0].children = [];	
	$http.get(hostname + '/stockgroup/find-by-company/'+$scope.company.id).
		then(function(response) 
		{
			$scope.groups = response.data;
			//$scope.groups = response.data;
			console.log(" Groupth Length : " + $scope.groups.length)			
			angular.forEach($scope.groups, function (group) 
			{
				 console.log(" group "  + group.id +"  "+ group.parent );
				if(group.parent === 1){
				  $scope.stockGroups[0].children.push(group);
				}
			});	
		});	

	$scope.setChildrenData = function(selGroup,grplevel){
		
		    var selGrpId = (selGroup != null && selGroup.id != null ) ? selGroup.id : -1;
			var children = [];
			angular.forEach($scope.groups, function (group) {
				 if(group.parent == selGrpId){
					children.push(group);
					//$scope.multigroups[grplevel].children.push(group);
				 }
			});	

			var tempGrps = [];
			for(i=0;i<=grplevel; i++){
				if($scope.stockGroups[i] != null){
					tempGrps[i]  = $scope.stockGroups[i];
				}else{
				 tempGrps[i] = {};
				 tempGrps[i].children = [];
				}
			}
			$scope.stockGroups = tempGrps;
			if(selGrpId > 0 && children.length > 0){
				$scope.stockGroups[grplevel+1] = {};
				$scope.stockGroups[grplevel+1].children = children;
			}
	}
	
	$scope.items = [];
	$scope.items[0] = {'quandity':1 ,'pices':1 };
	$scope.getTotal = function(){
		var total = 0;
		for(var i = 0; i < $scope.items.length; i++){
			var item = $scope.items[i];
			total += (item.quandity * item.pices);
		}
		$scope.grandTotal = total;
		return total;
	}	
	
	$scope.addItem = function(selItem){
		console.log("add item");
		if(!$scope.itemform.$valid){
			$scope.submitclick = true;
			console.log("invalid item form ");
			return;
		}		

	    //selItem.id = null;
	    //selItem.stockGroup = {};
		//selItem.group.id = $scope.stockgroup.selGroup.id;
		//selItem.stockGroup.id = $scope.stockGroups[$scope.stockGroups.length-1].selGroup.id;
		//selItem.group = $scope.stockgroup.selGroup;
	    selItem.stockGroup = $scope.stockGroups[$scope.stockGroups.length-1].selGroup.id;
		selItem.itemTrans = $scope.items;
		
		angular.forEach(selItem.itemTrans,function(itemTrans,index){
		  itemTrans.name = selItem.name +"_" + selItem.shade + "_" + index ;
		  //itemTrans.item = selItem;
		});		
		
		
		var dataObj = JSON.stringify(selItem);
		console.log(dataObj);
		
		$http.post(hostname+'/item/create', dataObj, {
		  headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		  },
		}).success(function(responseData) {
			  try {
		         console.log("Item Created Suucessfully" + responseData);
				 $location.path("/view-stock-items");
			  } catch (err) {
				console.log(JSON.stringify(err));
			  }
		 }).error(function(data, status, headers, config) {
			console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
		  });		
	


	}
		
});


app.controller('showStockItemController', function($scope,$rootScope,$location,$http) {
		$rootScope.currentPage = 'showStockItems';
	    $http.get(hostname + '/item/getAll').
		then(function(response) 
		{
			$scope.items = response.data;
			console.log(" items Length : " + $scope.items.length);
            $rootScope.currentPage = 'showStockItems';			
		});			
});

app.controller('showStockGroupsController', function($scope,$rootScope,$location,$http) {
		$rootScope.currentPage = 'showStockGroups';
        $scope.singlegroups = [];
		console.log(" company.id "  + $scope.company.id );
	    $http.get(hostname + '/stockgroup/find-by-company/'+$scope.company.id).
		then(function(response) 
		{
			$rootScope.groups = response.data;
			//$scope.groups = response.data;
			console.log(" Groupth Length : " + $scope.groups.length)	;
            $rootScope.currentPage = 'showStockGroups';			
		});			
		
		
    /*$scope.groupmap = $scope.groups.map(function(group){ 
		var rObj = {};
		rObj[group.id] = group;
		return rObj;
     });*/

});
