<?php
	// create_puzzle.php
	require_once '../bootstrap.php';

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$newPuzzleName = $request->name;
	$newPuzzleHeight = $request->height;
	$newPuzzleWidth = $request->width;

	$puzzle = new Puzzle();
	$puzzle->setName($newPuzzleName);
	$puzzle->setHeight($newPuzzleHeight);
	$puzzle->setWidth($newPuzzleWidth);

	try{
		global $em;
		$em->persist($puzzle);
		$em->flush();
	}catch(Exception $e){
		$em->getConnection()->rollback();
		$em->close();	
		echo false;
	}
	echo true;
?>