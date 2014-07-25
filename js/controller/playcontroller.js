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

				//Calculate row clues
				var wClues = new Array();
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
					wClues.push(tempRow);
				}
				//Calculate column clues
				var hClues = new Array();
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
						if(row == $scope.puzzleHeight - 1  && tempClue != 0){
							tempCol.push(tempClue);
						}
					}
					hClues.push(tempCol);
				}
				//Determine dimensions of puzzle table with attached clues
				var maxHbox = maxLength(hClues);
				var maxWbox = maxLength(wClues);
				var totalHeight = $scope.puzzleHeight + maxHbox;
				var totalWidth = $scope.puzzleWidth + maxWbox;

				//Construct puzzle table
				$("#puzzArea").html('');
				var newPuzzle = "<tbody>";
				for(var row = 0; row < totalHeight; row++){
					newPuzzle += "<tr>";
					for(var col = 0; col < totalWidth; col++){
						if(row < maxHbox && col < maxWbox){
							//Dead space
							newPuzzle += "<td class='empty'></td>";
						}else{
							if(row < maxHbox || col < maxWbox){
								if(row >= maxHbox){
									//Row Clues
									if(wClues[row - maxHbox][col] != -1){
										newPuzzle += "<td class='clue'>" + wClues[row - maxHbox][col] + "</td>";
									}else{
										newPuzzle += "<td class='clue'></td>";
									}
								}else{
									//Column Clues
									if(hClues[col - maxWbox][row] != -1){
										newPuzzle += "<td class='clue'>" + hClues[col - maxWbox][row] + "</td>";
									}else{
										newPuzzle += "<td class='clue'></td>";
									}
								}
							}else{
								//Interactive area
								newPuzzle += "<td class='pcell unselected'></td>";
							}
						}
					}
					newPuzzle += "</tr>";
				}
				$("#puzzArea").html(newPuzzle + "</tbody>");

				//Style table and attach listeners
				$(".puzzle td.pcell:nth-of-type(5n+" + maxWbox + "):not(:last-child)").css({
					'border-right-width': '2px',
					'border-right-color': '#398eb5'
				});
				$(".puzzle tr:nth-child(5n+" + maxHbox + "):not(:last-child) td.pcell").css({
					'border-bottom-width': '2px',
					'border-bottom-color': '#398eb5'
				});
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