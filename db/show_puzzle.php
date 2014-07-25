<?php
	// show_puzzle.php <id>
	require_once "../bootstrap.php";

	global $em;
	$id = $argv[1];
	$puzzle = $em->find('Puzzle', $id);

	if($puzzle === null){
		echo "Puzzle not found";
		exit(1);
	}

	echo json_encode($puzzle);
?>