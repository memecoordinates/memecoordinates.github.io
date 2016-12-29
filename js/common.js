document.addEventListener('DOMContentLoaded', function() {
	let _hoverCursor = true, _selectable = false, lineColor = "#000000", _fontSize = 30, _fontFamily = "Roboto", _lineHeight = 1.2;
	let canvas = new fabric.Canvas('canvas', {hoverCursor: "default"});
	let leftAuth = new fabric.Rect({
		left: 0,
		top: 0,
		width: 450,
		height: 450,
		fill: '#f8bbba',
		selectable: _selectable,
		hoverCursor: _hoverCursor
	});
	let rightAuth = new fabric.Rect({
		left: 450,
		top: 0,
		width: 450,
		height: 450,
		fill: '#92d9f7',
		selectable: _selectable,
		hoverCursor: _hoverCursor
	});
	let leftLib = new fabric.Rect({
		left: 0,
		top: 450,
		width: 450,
		height: 450,
		fill: '#c8e4bc',
		selectable: _selectable,
		hoverCursor: _hoverCursor
	});
	let rightLib = new fabric.Rect({
		left: 450,
		top: 450,
		width: 450,
		height: 450,
		fill: '#dfc5de',
		selectable: _selectable,
		hoverCursor: _hoverCursor
	});
	let lineHorizontal = new fabric.Line([0, 0, 900, 0], {
		stroke: lineColor,
		left: 0,
		hoverCursor: _hoverCursor,
		selectable: _selectable,
		top: 450
	});
	let lineVertical = new fabric.Line([0, 900, 0, 0], {
		stroke: lineColor,
		top: 0,
		hoverCursor: _hoverCursor,
		selectable: _selectable,
		left: 450
	});
	let hintLeft = new fabric.Text("Economic\nLeft", { hoverCursor: _hoverCursor, selectable: _selectable, left: 10, fontSize: _fontSize, fontFamily: _fontFamily, lineHeight: _lineHeight });
	let hintRight = new fabric.Text("Economic\nRight", { hoverCursor: _hoverCursor, selectable: _selectable, textAlign: "right", fontSize: _fontSize, left: 750, fontFamily: _fontFamily, lineHeight: _lineHeight });
	let hintAuth = new fabric.Text("Authoritarian", { hoverCursor: _hoverCursor, selectable: _selectable, textAlign: "center", fontSize: _fontSize, top: 10, fontFamily: _fontFamily, lineHeight: _lineHeight });
	let hintLib = new fabric.Text("Libertarian", { hoverCursor: _hoverCursor, selectable: _selectable, textAlign: "center", fontSize: _fontSize, top: 860, fontFamily: _fontFamily, lineHeight: _lineHeight });
	canvas.add(leftAuth, rightAuth, leftLib, rightLib, lineHorizontal, lineVertical, hintLeft, hintRight, hintAuth, hintLib);
	hintAuth.centerH();
	hintLib.centerH();
	hintLeft.centerV();
	hintRight.centerV();
	canvas.moveTo(leftAuth, 1);
	canvas.moveTo(rightAuth, 2);
	canvas.moveTo(leftLib, 3);
	canvas.moveTo(rightLib, 4);
	canvas.moveTo(hintRight, 200);
	canvas.moveTo(hintLeft, 201);
	canvas.moveTo(hintLib, 202);
	canvas.moveTo(hintAuth, 203);
	canvas.moveTo(lineVertical, 204);
	canvas.moveTo(lineHorizontal, 205);
	document.getElementById('file').addEventListener("change", function (e) {
	  var file = e.target.files[0];
	  var reader = new FileReader();
	  reader.onload = function (f) {
	    var data = f.target.result;                    
	    fabric.Image.fromURL(data, function (img) {
	      var oImg = img.set({left: 0, top: 0, angle: 00}).scale(1);
	      canvas.add(oImg);
	      canvas.moveTo(oImg, 8);
	      canvas.moveTo(hintRight, 200);
		  canvas.moveTo(hintLeft, 201);
	      // .renderAll();
	      // var a = canvas.setActiveObject(oImg);
	      // var dataURL = canvas.toDataURL({format: 'png', quality: 1});
	    });
	  };
	  reader.readAsDataURL(file);
	});

	$('#export').on('click',saveImg);
	$('html').keyup(function(e){
	    if(e.keyCode == 46) {
	        deleteObject();
	   	}
	});
	function saveImg(){   
		canvas.deactivateAll(); 
		console.log('экспорт мемса');
		if (!fabric.Canvas.supports('toDataURL')) {
		  alert('Ваш браузер не поддерживает это. Вас порешал рыночек. Наслаждайтесь!');
		}
		else {
		  window.open(canvas.toDataURL('png'));
		}
	}
	function deleteObject() {
        canvas.getActiveObject().remove();
	}    
});
