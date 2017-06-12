app.controller('taskController', function($scope,$rootScope,$location,$http) {

    $rootScope.task = [];
	$http.get(hostname+'/task/findAll').
			then(function(response) {
				$rootScope.task = response.data;
				$rootScope.curTab = 'taskTab';
	});	
	
	$scope.createTask = function(){
		$rootScope.currentPage = 'createTask';
		$location.path("create-task");//Redirect to Create Page
	}
	$scope.editTask = function(task){
		$rootScope.currentPage = 'editTask';
		$location.path("edit-task");//Redirect to Edit Page
		$rootScope.task = task ;
	}	
	
	
	$rootScope.curTab = 'taskTab';
	console.log("   task Tab ");
	$rootScope.currentPage = "taskList";
	console.log("   currentPage :  " + $rootScope.currentPage);
});	




app.controller('createTaskController', function($scope,$rootScope,$location,$http) {
	$scope.task ={}; 
	$scope.optType = "create";
	$scope.submitclick = false;
	
	$scope.createTask = function(task){
		if(!$scope.taskform.$valid){
			$scope.submitclick = true;
			return;
		}

			var dataObj = JSON.stringify(task);
			$http.post(hostname+'/task/create', dataObj, {
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  },
			}).success(function(responseData) {
				  try {
					console.log(JSON.stringify(responseData));
					$rootScope.currentPage = 'taskList';
					$rootScope.task.push(task);
					$location.path("/show-task");//Redirect to Show Emnpoyee GRID page
				  } catch (err) {
					alert(JSON.stringify(err));
				  }
			 }).error(function(data, status, headers, config) {
				console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
			  });		
	}
	
});


app.controller('editTaskiController', function($scope,$rootScope,$location,$http) {

    $scope.optType = "edit";
 	$scope.submitclick = false;

	$scope.editTask = function(task){
		
		if(!$scope.taskform.$valid){
			$scope.submitclick = true;
			return;
		}		
			var dataObj = JSON.stringify(task);
			$http.post(hostname + '/task/create', dataObj, {
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  },
			}).success(function(responseData) {
				  try {
					console.log(JSON.stringify(responseData));
					$rootScope.currentPage = 'taskList';
					$rootScope.task.push(task);
					$location.path("/show-task");
				  } catch (err) {
					alert(JSON.stringify(err));
				  }
			 }).error(function(data, status, headers, config) {
				console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
			  });
	}
	
});


