angularApp.controller('mainController', function($scope, $http){
	$(".active").removeClass("active");
	$("#createNav").addClass("active");
	//Add listeners to components
	refreshCreateBtnListeners();
	$scope.newPuzzleName = "Your Puzzle Name Here";
	$scope.height = 5;
	$scope.width = 5;
	$("#puzzArea").html('');
	var newPuzzle = "<tbody>";
	for(var row = 0; row < $scope.height; row++){
		newPuzzle += "<tr>";
		for(var col = 0; col < $scope.width; col++){
			newPuzzle += "<td class='pcell unselected'></td>";
		}
		newPuzzle += "</tr>";
	}
	$("#puzzArea").html(newPuzzle + "</tbody>");
	refreshTableListeners();

	//Resize puzzle to given dimensions
	$scope.resizePuzzle = function(){
		if($scope.dimForm.$valid){
			$("#puzzArea").html('');
			var newPuzzle = "<tbody>";
			for(var row = 0; row < $scope.height; row++){
				newPuzzle += "<tr>";
				for(var col = 0; col < $scope.width; col++){
					newPuzzle += "<td class='pcell unselected'></td>";
				}
				newPuzzle += "</tr>";
			}
			$("#puzzArea").html(newPuzzle + "</tbody>");
			refreshTableListeners();
		}
	};

	//Save new puzzle to database
	$scope.saveNewPuzzle = function(){
		var puzzArr = new Array();
		var puzzle = document.getElementById('puzzArea');
		//transcribe table into 2d array
		for(var row = 0; row < $scope.height; row++){
			var tempRow = new Array();
			for(var col = 0; col < $scope.width; col++){
				var cell = puzzle.rows[row].cells[col].className;
				if(cell.indexOf("selected") > -1 && cell.indexOf("unselected") < 0){
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
	};
});