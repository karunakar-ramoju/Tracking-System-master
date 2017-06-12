
app.controller('ledgerController', function($scope,$rootScope,$location,$http) {
	$rootScope.ledgers = [];
	$rootScope.currentPage = 'viewLedgers';
	$http.get(hostname + '/ledger/findAll').
	then(function(response) 
	{
		$rootScope.ledgers = response.data;
		//$scope.groups = response.data;
		console.log(" Ledgers Length : " + $scope.ledgers.length)			
	});	

	$scope.editLedger = function(ledger){
		$rootScope.currentPage = 'editLedger';
		console.log( " Edit ledger");
		$rootScope.ledger = ledger ;
		$scope.optType = "edit";
		$location.path("edit-ledger");
	}
	
});	


app.controller('createLedgerController', function($scope,$rootScope,$location,$http) {

	$scope.ledger = {};
	$scope.optType = "create";
	$scope.submitclick = false;
	$rootScope.currentPage = 'createLedgers';
	console.log(" createLedgers company.id "  + $scope.company.id );
	$http.get(hostname + '/accgroup/find-by-company/'+$scope.company.id).
	then(function(response) 
	{
		$scope.groups = response.data;
		//$scope.groups = response.data;
		console.log(" createLedgers Group Length : " + $scope.groups.length)			
	});	
	
	$scope.createLedger = function(ledger){
		if(!$scope.ledgerform.$valid){
			$scope.submitclick = true;
			return;
		}
		var groupId = ledger.accGroup.id;		
		ledger.accGroup = {};
		ledger.accGroup.id = groupId;
		//ledger.accGroup.id = ledger.groupid;
			var dataObj = JSON.stringify(ledger);
			console.log( dataObj );
			$http.post(hostname+'/ledger/create', dataObj, {
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  },
			}).success(function(responseData) {
				  try {
					console.log(JSON.stringify(responseData));
					$rootScope.currentPage = 'ledgerList';
					//$rootScope.ledgers.push(ledger);
					$location.path("/view-ledgers");
				  } catch (err) {
					console.log(JSON.stringify(err));
				  }
			 }).error(function(data, status, headers, config) {
				console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
			  });		
	}	
	
});	


app.controller('editLedgerController', function($scope,$rootScope,$location,$http) {

    $scope.optType = "edit";
 	$scope.submitclick = false;
    //$scope.ledger.groupid = $scope.ledger.accGroup.id;
	
	$http.get(hostname + '/accgroup/find-by-company/'+$scope.company.id).
	then(function(response) 
	{
		$scope.groups = response.data;
		//$scope.groups = response.data;
		console.log(" createLedgers Group Length : " + $scope.groups.length)			
	});	
	
	$scope.editLedger = function(ledger){
		
		if(!$scope.ledgerform.$valid){
			$scope.submitclick = true;
			return;
		}	
			var groupId = ledger.accGroup.id;		
		    ledger.accGroup = {};
			ledger.accGroup.id = groupId;
			
			var dataObj = JSON.stringify(ledger);
			console.log( " editLedger : " + dataObj);
			$http.post(hostname + '/ledger/create', dataObj, {
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  },
			}).success(function(responseData) {
				  try {
					console.log(JSON.stringify(responseData));
					$rootScope.currentPage = 'viewLedgers';
					//$rootScope.ledgers.push(user);
					$location.path("/view-ledgers");
				  } catch (err) {
					alert(JSON.stringify(err));
				  }
			 }).error(function(data, status, headers, config) {
				console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
			  });
	}
	
});

	