<?php
	// get_puzzle.php <id>
	require_once "../bootstrap.php";

	global $em;
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$info = $em->getRepository('Puzzle')->findOneBy(array('id' => $request->id));
	$data = $em->getRepository('PuzzData')->findBy(array('puzzleId' => $request->id));

	if($info === null){
		echo false;
	}else{
		$puzzle = array('name' => $info->getName(),
			'height' => $info->getHeight(),
			'width' => $info->getWidth());
		$dataArr = array(array());
		foreach($data as $cell){
			$dataArr[$cell->getRow()][$cell->getCol()] = $cell->getFilled();
		}
		$puzzle['data'] = $dataArr;
		echo json_encode($puzzle);
	}
?>