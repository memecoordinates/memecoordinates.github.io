document.addEventListener('DOMContentLoaded', function() {
	let _hoverCursor = true, _selectable = false, lineColor = "#000000", _fontSize = 30, _fontFamily = "Roboto", _lineHeight = 1.2, sideSize = 480, _lockScalingFlip = true;
	let canvas = new fabric.Canvas('canvas', {hoverCursor: "default"});
	let leftAuth = new fabric.Rect({
		left: 0,
		top: 0,
		width: sideSize,
		height: sideSize,
		fill: '#f8bbba',
		selectable: _selectable,
		hoverCursor: _hoverCursor
	});
	let rightAuth = new fabric.Rect({
		left: sideSize,
		top: 0,
		width: sideSize,
		height: sideSize,
		fill: '#92d9f7',
		selectable: _selectable,
		hoverCursor: _hoverCursor
	});
	let leftLib = new fabric.Rect({
		left: 0,
		top: sideSize,
		width: sideSize,
		height: sideSize,
		fill: '#c8e4bc',
		selectable: _selectable,
		hoverCursor: _hoverCursor
	});
	let rightLib = new fabric.Rect({
		left: sideSize,
		top: sideSize,
		width: sideSize,
		height: sideSize,
		fill: '#dfc5de',
		selectable: _selectable,
		hoverCursor: _hoverCursor
	});
	let lineHorizontal = new fabric.Line([0, 0, sideSize*2, 0], {
		stroke: lineColor,
		left: 0,
		hoverCursor: _hoverCursor,
		selectable: _selectable,
		top: sideSize
	});
	let lineVertical = new fabric.Line([0, sideSize*2, 0, 0], {
		stroke: lineColor,
		top: 0,
		hoverCursor: _hoverCursor,
		selectable: _selectable,
		left: sideSize
	});
	for (let i = 0; i < 20; i++) {
		if (i == 10) {continue;}
		let newLine = new fabric.Line([0, (sideSize/10)*i, sideSize*2, (sideSize/10)*i], {
			strokeDashArray: [5, 5],
			stroke: 'rgba(255, 255, 255, 0.33)',
			selectable: false,
			hoverCursor: _hoverCursor
		});
		canvas.add(newLine);
		canvas.moveTo(newLine, 5);
	}
	for (let i = 0; i < 20; i++) {
		if (i == 10) {continue;}
		let newLine = new fabric.Line([(sideSize/10)*i, 0, (sideSize/10)*i, sideSize*2], {
			strokeDashArray: [5, 5],
			stroke: 'rgba(255, 255, 255, 0.33)',
			selectable: false,
			hoverCursor: _hoverCursor
		});
		canvas.add(newLine);
		canvas.moveTo(newLine, 5);
	}
	
	let hintLeft = new fabric.Text("Economic\nLeft", { hoverCursor: _hoverCursor, selectable: _selectable, left: 10, fontSize: _fontSize, fontFamily: _fontFamily, lineHeight: _lineHeight });
	let hintRight = new fabric.Text("Economic\nRight", { hoverCursor: _hoverCursor, selectable: _selectable, textAlign: "right", fontSize: _fontSize, left: 815, fontFamily: _fontFamily, lineHeight: _lineHeight });
	let hintAuth = new fabric.Text("Authoritarian", { hoverCursor: _hoverCursor, selectable: _selectable, textAlign: "center", fontSize: _fontSize, top: 10, fontFamily: _fontFamily, lineHeight: _lineHeight });
	let hintLib = new fabric.Text("Libertarian", { hoverCursor: _hoverCursor, selectable: _selectable, textAlign: "center", fontSize: _fontSize, top: 925, fontFamily: _fontFamily, lineHeight: _lineHeight });
	canvas.add(leftAuth, rightAuth, leftLib, rightLib, lineHorizontal, lineVertical, hintLeft, hintRight, hintAuth, hintLib);
	hintAuth.centerH();
	hintLib.centerH();
	hintLeft.centerV();
	hintRight.centerV();
	canvas.moveTo(leftAuth, 1);
	canvas.moveTo(rightAuth, 2);
	canvas.moveTo(leftLib, 3);
	canvas.moveTo(rightLib, 4);
	canvas.moveTo(lineVertical, 5);
	canvas.moveTo(lineHorizontal, 6);

	document.getElementById('file').onchange = function handleImage(e) {
	for (var i = 0; i < e.target.files.length; i++) {
		var reader = new FileReader();
			  reader.onload = function (event) { console.log('fdsf');
			      var imgObj = new Image();

			              imgObj.src = event.target.result;
		        imgObj.onload = function () {
		            // start fabricJS stuff

		            var image = new fabric.Image(imgObj);
		            image.set({
		                angle: 0,
		                padding: 0,
		                cornersize: 0, 
		                lockScalingFlip: _lockScalingFlip, 
		                centeredScaling: true, 
		                lockUniScaling: true
		            });
		            //image.scale(getRandomNum(0.1, 0.25)).setCoords();
		            canvas.add(image);
		            
		            canvas.moveTo(image, 80);
		            canvas.moveTo(hintRight, 200);
		           	canvas.moveTo(hintLeft, 201);
		           	canvas.moveTo(hintLib, 202);
		            canvas.moveTo(hintAuth, 203);
		            canvas.deactivateAll();
		        }

		    }
		    reader.readAsDataURL(e.target.files[i]);
	}
}

	$('#export').on('click',saveImg);
	$('html').keyup(function(e){
	    if(e.keyCode == 46) {
	        deleteObject();
	   	}
	});
	canvas.on('object:moving', function (e) {
	        let obj = e.target;
	        if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
	            return;
	        }        
	        obj.setCoords();        
	        if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
	            obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
	            obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
	        }
	        if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
	            obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
	            obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
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
		if(canvas.getActiveGroup()) {
			canvas.getActiveGroup().forEachObject(function(o){ canvas.remove(o) }); 
			canvas.discardActiveGroup().renderAll();
		} else {
			canvas.getActiveObject().remove(); 
		}
		
	}    
});
