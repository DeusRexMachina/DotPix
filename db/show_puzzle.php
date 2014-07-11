<?php
	// show_puzzle.php <id>
	require_once "bootstrap.php";

	$id = $argv[1];
	$puzzle = $entityManager->find('Puzzle', $id);

	if($puzzle === null){
		echo "Puzzle not found";
		exit(1);
	}

	echo sprintf("-%s\n", $puzzle->getName());
?>