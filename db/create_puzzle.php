<?php
	// create_puzzle.php
	require_once '../bootstrap.php';

	global $em;
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$newPuzzleName = $request->name;
	$newPuzzleHeight = $request->height;
	$newPuzzleWidth = $request->width;
	$puzzleData = $request->data;

	$puzzle = new Puzzle();
	$puzzle->setName($newPuzzleName);
	$puzzle->setHeight($newPuzzleHeight);
	$puzzle->setWidth($newPuzzleWidth);

	try{
		//Write new puzzle to database first to get id
		$em->persist($puzzle);
		$em->flush();
		//Iterate through puzzle data and insert all elements
		//puzzleData[0][0] indicates the top-left corner of the nonogram
		for($row = 0; $row < $newPuzzleHeight; $row++){
			for($col = 0; $col < $newPuzzleWidth; $col++){
				$tempCell = new PuzzData();
				$tempCell->setPuzzleId($puzzle);
				$tempCell->setRow($row);	
				$tempCell->setCol($col);
				$tempCell->setFilled($puzzleData[$row][$col] == 1);
				$em->persist($tempCell);
			}
			$em->flush();
		}
	}catch(Exception $e){
		error_log($e->getMessage());
		$em->getConnection()->rollback();
		$em->close();	
		echo false;
	}
	echo true;
?>