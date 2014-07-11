angularApp.controller('mainController', function($scope, $http){
	//Add listeners to components
	refreshCreateTableListeners();
	refreshCreateBtnListeners();
	$scope.newPuzzleName = "Your Puzzle Name Here";
	$scope.height = 5;
	$scope.width = 5;

	$scope.resizePuzzle = function(){
		if($scope.dimForm.$valid){
			$("#puzzArea").html('');
			var newPuzzle = "<tbody>";
			for(var row = 0; row < $scope.height; row++){
				newPuzzle += "<tr>";
				for(var col = 0; col < $scope.width; col++){
					newPuzzle += "<td class='unselected'></td>";
				}
				newPuzzle += "</tr>";
			}
			$("#puzzArea").html(newPuzzle + "</tbody>");
			refreshCreateTableListeners();
		}
	}

	$scope.saveNewPuzzle = function(){
		var puzzArr = new Array();
		var puzzle = document.getElementById('puzzArea');
		toInvalid($("#puzzArea td.unselected"));
		for(var row = 0; row < $scope.height; row++){
			var tempRow = new Array();
			for(var col = 0; col < $scope.width; col++){
				var cell = puzzle.rows[row].cells[col].className;
				if(cell.indexOf("selected") > -1){
					tempRow.push(SELECTED);
				}else{
					tempRow.push(UNSELECTED);
				}
			}
			puzzArr.push(tempRow);
		}
		var puzzData = {
			'name': $scope.newPuzzleName,
			'height': $scope.height,
			'width': $scope.width,
			'data': puzzArr
		};
		$http.post('db/create_puzzle.php', puzzData)
		.success(function(data, status, headers, config)
        {
            alert("Your puzzle was saved!");
        })
        .error(function(data, status, headers, config)
        {
            alert("There was an error saving your puzzle. Please try again later.");
        });
	}
});

angularApp.controller('playController', function($scope){
});

angularApp.controller('aboutController', function($scope){
});