<?php
// src/PuzzData.php
/**
 *  @Entity @Table(name="puzzdata")
 **/
class PuzzData{
	/** @Id @Column(type="integer") @GeneratedValue **/
	protected $id;
	/**
	* @var Puzzle
	*
	* @ManyToOne(targetEntity="Puzzle")
	* @JoinColumn(name="puzzleId", referencedColumnName="id")
	**/
	protected $puzzleId;
	/** @Column(type="integer") **/
	protected $row;
	/** @Column(type="integer") **/
	protected $col;
	/** @Column(type="boolean") **/
	protected $filled;

	public function getId(){
		return $this->id;
	}

	public function getPuzzleId(){
		return $this->puzzleId;
	}

	public function setPuzzleId(\Puzzle $puzzleId = null){
		$this->puzzleId = $puzzleId;
	}

	public function getRow(){
		return $this->row;
	}

	public function setRow($row){
		$this->row = $row;
	}

	public function getCol(){
		return $this->col;
	}

	public function setCol($col){
		$this->col = $col;
	}

	public function getFilled(){
		return $this->filled;
	}

	public function setFilled($filled){
		$this->filled = $filled;
	}
}