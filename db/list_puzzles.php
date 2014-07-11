<?php
	// list_puzzles.php
	require_once "../bootstrap.php";

	global $em;
	$puzzleRepository = $em->getRepository('Puzzle');
	$puzzles = $puzzleRepository->findAll();

	$puzzleList = array();
	foreach($puzzles as $puzzle){
		array_push($puzzleList,array(
			'id' => $puzzle->getId(),
			'name' => $puzzle->getName(),
			'height' => $puzzle->getHeight(),
			'width' => $puzzle->getWidth()
		));
	}
	echo json_encode($puzzleList);
?>