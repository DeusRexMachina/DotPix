<?php
	// create_puzzle.php
	require_once "bootstrap.php";

	$newPuzzleName = $argv[1];
	$newPuzzleHeight = $argv[2];
	$newPuzzleWidth = $argv[3];

	$puzzle = new Puzzle();
	$puzzle->setName($newPuzzleName);
	$puzzle->setHeight($newPuzzleHeight);
	$puzzle->setWidth($newPuzzleWidth);

	$entityManager->persist($puzzle);
	$entityManager->flush();

	echo "Created Puzzle with ID " . $puzzle->getId() . "\n";
?>