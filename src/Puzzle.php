<?php
// src/Puzzle.php
/**
 *  @Entity @Table(name="puzzle")
 **/
class Puzzle{
	/** @Id @Column(type="integer") @GeneratedValue **/
	protected $id;
	/** @Column(type="string") **/
	protected $name;
	/** @Column(type="integer") **/
	protected $height;
	/** @Column(type="integer") **/
	protected $width;

	public function getId(){
		return $this->id;
	}

	public function getName(){
		return $this->name;
	}

	public function setName($name){
		$this->name = $name;
	}

	public function getHeight(){
		return $this->height;
	}

	public function setHeight($height){
		$this->height = $height;
	}

	public function getWidth(){
		return $this->width;
	}

	public function setWidth($width){
		$this->width = $width;
	}
}