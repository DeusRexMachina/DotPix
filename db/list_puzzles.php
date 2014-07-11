<?php
	// list_puzzles.php
	require_once "bootstrap.php";

	$puzzleRepository = $entityManager->getRepository('Puzzle');
	$puzzles = $puzzleRepository->findAll();

	foreach($puzzles as $puzzle){
		echo sprintf("-%s\n", $puzzle->getName());
	}
?>