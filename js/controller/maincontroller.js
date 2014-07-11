angularApp.controller('mainController', function($scope, $http){
	$(".active").removeClass("active");
	$("#createNav").addClass("active");
	//Add listeners to components
	refreshTableListeners();
	refreshCreateBtnListeners();
	$scope.newPuzzleName = "Your Puzzle Name Here";
	$scope.height = 5;
	$scope.width = 5;

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
			refreshCreateTableListeners();
		}
	}

	//Save new puzzle to database
	$scope.saveNewPuzzle = function(){
		var puzzArr = new Array();
		var puzzle = document.getElementById('puzzArea');
		toInvalid($("#puzzArea td.unselected"));
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
	}
});

angularApp.controller('playController', function($scope, $http, $location, $routeParams){
	$(".active").removeClass("active");
	$("#playNav").addClass("active");
	$scope.puzzleId = $routeParams.puzzleId;

	//Setup list of availible puzzles if no puzzle id is given
	if($scope.puzzleId === undefined){
		$scope.puzzleListData = new Array();
		$http.post('db/list_puzzles.php')
		.success(function(data, status, headers, config)
		{
			for(var i = 0; i < data.length; i++){
				var currPuzzle = data[i];
				$scope.puzzleListData.push({
					'id': currPuzzle.id,
					'name': currPuzzle.name,
					'dimensions': currPuzzle.height + "x" + currPuzzle.width
				});
			}
		})
		.error(function(data, status, headers, config)
		{
			alert("There was an error loading puzzles!");
		});
	}else{
		//Attempt to create puzzle if id is given
		$http.post('db/get_puzzle.php', {'id': $scope.puzzleId})
		.success(function(data, status, headers, config)
		{
			if(data){
				$scope.puzzleName = data.name;
				$scope.puzzleHeight = data.height;
				$scope.puzzleWidth = data.width;
				$scope.puzzleData = data.data;

				var hClues = new Array();
				for(var row = 0; row < $scope.puzzleHeight; row++){
					var tempRow = new Array();
					var tempClue = 0;
					for(var col = 0; col < $scope.puzzleWidth; col++){
						var cell = $scope.puzzleData[row][col];
						if(cell){
							tempClue++;
						}else{
							if(tempClue != 0){
								tempRow.push(tempClue);
								tempClue = 0;
							}		
						}
						if(col == $scope.puzzleWidth - 1  && tempClue != 0){
							tempRow.push(tempClue);
						}
					}
					hClues.push(tempRow);
				}
				var wClues = new Array();
				for(var col = 0; col < $scope.puzzleWidth; col++){
					var tempCol = new Array();
					var tempClue = 0;
					for(var row = 0; row < $scope.puzzleHeight; row++){
						var cell = $scope.puzzleData[row][col];
						if(cell){
							tempClue++;
						}else{
							if(tempClue != 0){
								tempCol.push(tempClue);
								tempClue = 0;
							}		
						}
						if(col == $scope.puzzleWidth - 1  && tempClue != 0){
							tempCol.push(tempClue);
						}
					}
					wClues.push(tempCol);
				}
				var maxHbox = maxLength(hClues);
				var maxWbox = maxLength(wClues);
				var totalHeight = $scope.puzzleHeight + maxHbox;
				var totalWidth = $scope.puzzleWidth + maxWbox;

				$("#puzzArea").html('');
				var newPuzzle = "<tbody>";
				for(var row = 0; row < totalHeight; row++){
					newPuzzle += "<tr>";
					for(var col = 0; col < totalWidth; col++){
						if(row < maxHbox && col < maxWbox){
							newPuzzle += "<td class='empty'></td>";
						}else{
							if(row < maxHbox || col < maxWbox){
								newPuzzle += "<td class='clue'></td>";
							}else{
								newPuzzle += "<td class='pcell unselected'></td>";
							}
						}
					}
					newPuzzle += "</tr>";
				}
				$("#puzzArea").html(newPuzzle + "</tbody>");
				refreshTableListeners();
			}else{
				alert("Puzzle not found!");
			}
		})
		.error(function(data, status, headers, config)
		{
			alert("There was an error loading the puzzle!");
		});
	}

	//Define options for puzzle list grid
	$scope.gridOptions = {
		data: 'puzzleListData',
		multiSelect: false,
		columnDefs: [
			{field: "id", visible: false},
			{field: "name", displayName: "Name"},
			{field: "dimensions", displayName: "Dimensions (HxW)", width: 150}],
		selectedItems: []
	};
});

angularApp.controller('aboutController', function($scope){
	$(".active").removeClass("active");
	$("#aboutNav").addClass("active");
});