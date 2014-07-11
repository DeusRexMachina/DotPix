var mousedown = false;

//0-unselected 1-selected 2-invalid
var cellType = 0;
var UNSELECTED = 0;
var SELECTED = 1;
var INVALID = 2;

//Current puzzle width and height
var puzzWidth = 5;
var puzzHeight = 5;

$(document).ready(function(){
	$(".navPg").click(function(e){
		$(".active").removeClass("active");
		$(this).addClass("active");
	});
});

function refreshTableListeners(){
	$("#puzzArea td").mousedown(function(e){
		var cell = $(this);
		mousedown = true;
		if(cell.hasClass("selected")){
			toInvalid(cell);
			cellType = INVALID;
		}else{
			if(cell.hasClass("invalid")){
				toUnselected(cell);
				cellType = UNSELECTED;
			}else{
				if(cell.hasClass("unselected")){
					toSelected(cell);
					cellType = SELECTED;
				}
			}
		}
		return false;
	});
	$("#puzzArea td").mouseup(function(e){
		mousedown = false;
		return false;
	});
	$("#puzzArea").mouseleave(function(e){
		mousedown = false;
		return false;
	});
	$("#puzzArea td").mouseover(function(e){
		var cell = $(this);
		if(mousedown){
			if(cellType == INVALID){
				toInvalid(cell);
			}else{
				if(cellType == UNSELECTED){
					toUnselected(cell);
				}else{
					if(cellType == SELECTED){
						toSelected(cell);
					}
				}
			}
		}
		return false;
	});
}

function refreshCreateBtnListeners(){
	$("#zoomout").click(function(e){
		if($("#puzzArea td").hasClass("zoomout")){
			$("#puzzArea td").removeClass("zoomout");
		}else{
			$("#puzzArea td").addClass("zoomout");
		}
	});
	//Calculate clues to current puzzle
	$("#calc").click(function(e){
		var rowArr = new Array();
		var colArr = new Array();
		var puzzle = document.getElementById('puzzArea');
		//convert unselected to invalid due to selected detection method
		toInvalid($("#puzzArea td.unselected"));
	});

	$("#clear").click(function(e){
		toUnselected($("#puzzArea td"));
	});
}

function toInvalid(th){
	th.removeClass("selected unselected");
	th.addClass("invalid");
	th.html('<span class="glyphicon glyphicon-remove" />');
}

function toSelected(th){
	th.removeClass("unselected invalid");
	th.addClass("selected");
	th.html('');
}

function toUnselected(th){
	th.removeClass("invalid selected");
	th.addClass("unselected");
	th.html('');
}