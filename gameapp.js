document.addEventListener('DOMContentLoaded',() => {
	const gridDisp = document.querySelector('.grid')
	const scoreDisp = document.getElementById('score')
	const resultDisp = document.getElementById('result')
	let boxes = []
	const width = 4
	let score = 0

	const button = document.getElementById("music");
	const audio = document.querySelector("audio");

	button.addEventListener("click", () => {
	  if (audio.paused) {
	    audio.volume = 1;
	    audio.play();
	    
	  } else {
	    audio.pause();
	  }
	});


	var loader;

	function loadNow(opacity) {
		document.getElementById("loader").style.background = "black url('https://media.giphy.com/media/eJ4j2VnYOZU8qJU3Py/giphy.gif') no-repeat center center"
	    if (opacity <= 0) {
	        displayContent();
	    } else {
	        loader.style.opacity = opacity;
	        window.setTimeout(function() {
	            loadNow(opacity - 1);
	        }, 5000);
	    }
	}

	function displayContent() {
	    loader.style.display = 'none';
	    document.getElementById('content').style.display = 'block';
	}

	loader = document.getElementById('loader');



	function dispBoard(){
		for(let i=0;i<width*width;i++){
			box = document.createElement('div')
			box.innerHTML = 0
			gridDisp.appendChild(box)
			boxes.push(box)
		}
		generate()
		generate()
	}
	dispBoard()

	function generate(){
		randNumb = Math.floor(Math.random() * boxes.length)
		if(boxes[randNumb].innerHTML == 0){
			boxes[randNumb].innerHTML = 2;
			gameEnd()
		}
		else generate()
	}
	
	function victoryswal(){
		    event.preventDefault();
		    swal({
					  icon: "images/win.gif",
					  // backdrop: `
					  //   rgba(0,0,123,0.4)
					  //   url("images/nyan-cat.gif")
					  //   left top
					  //   no-repeat
					  // `
		     })
		    return;
	}

	function gameWin() {
		for(let i=0; i<boxes.length; i++){
			if(boxes[i].innerHTML == 2048){
				resultDisp.innerHTML = 'You WIN'
				document.removeEventListener('keyup',control)
				setTimeout(() => clear, 1000)
			}
		}
	}

	function defeatswal(){
		    event.preventDefault();
		    swal({
					  icon: "images/lose.gif",
					  // backdrop: `
					  //   rgba(0,0,123,0.4)
					  //   url("images/nyan-cat.gif")
					  //   left top
					  //   no-repeat
					  // `
		     })
		    return;
	}

	function gameEnd() {
		let countZeros = 0
		for(let i=0; i<boxes.length; i++){
			if(boxes[i].innerHTML == 0)
				countZeros++;
		}
		if(countZeros === 0){
			defeatswal();
			document.removeEventListener('keyup',control)
			setTimeout(() => clear(), 1000)
			loadNow(1);
		}
	}

	function clear(){
		clearInterval(myTimer)
	}

	function goRight(){
		for(let i=0; i<16; i++){
			if(i%4==0){
				let totalOne = boxes[i].innerHTML
				let totalTwo = boxes[i+1].innerHTML
				let totalThree = boxes[i+2].innerHTML
				let totalFour = boxes[i+3].innerHTML
				let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
				let filteredRow = row.filter(num=>num)
				let missing = 4 - filteredRow.length
				let zeros = Array(missing).fill(0)
				let newRow = zeros.concat(filteredRow)
				boxes[i].innerHTML = newRow[0]
				boxes[i+1].innerHTML = newRow[1]
				boxes[i+2].innerHTML = newRow[2]
				boxes[i+3].innerHTML = newRow[3]
			}
		}
	}

	function goLeft(){
		for(let i=0; i<16; i++){
			if(i%4==0){
				let totalOne = boxes[i].innerHTML
				let totalTwo = boxes[i+1].innerHTML
				let totalThree = boxes[i+2].innerHTML
				let totalFour = boxes[i+3].innerHTML
				let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
				let filteredRow = row.filter(num=>num)
				let missing = 4 - filteredRow.length
				let zeros = Array(missing).fill(0)
				let newRow = filteredRow.concat(zeros)
				boxes[i].innerHTML = newRow[0]
				boxes[i+1].innerHTML = newRow[1]
				boxes[i+2].innerHTML = newRow[2]
				boxes[i+3].innerHTML = newRow[3]
			}
		}
	}

	function goUp(){
		for(let i=0; i<4; i++){
			let totalOne = boxes[i].innerHTML
			let totalTwo = boxes[i+width].innerHTML
			let totalThree = boxes[i+(width*2)].innerHTML
			let totalFour = boxes[i+(width*3)].innerHTML
			let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
			let filteredColumn = row.filter(num=>num)
			let missing = 4 - filteredColumn.length
			let zeros = Array(missing).fill(0)
			let newColumn = filteredColumn.concat(zeros)
			boxes[i].innerHTML = newColumn[0]
			boxes[i+width].innerHTML = newColumn[1]
			boxes[i+(width*2)].innerHTML = newColumn[2]
			boxes[i+(width*3)].innerHTML = newColumn[3]
		}
	}

	function goDown(){
		for(let i=0; i<4; i++){
			let totalOne = boxes[i].innerHTML
			let totalTwo = boxes[i+width].innerHTML
			let totalThree = boxes[i+(width*2)].innerHTML
			let totalFour = boxes[i+(width*3)].innerHTML
			let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
			let filteredColumn = row.filter(num=>num)
			let missing = 4 - filteredColumn.length
			let zeros = Array(missing).fill(0)
			let newColumn = zeros.concat(filteredColumn)
			boxes[i].innerHTML = newColumn[0]
			boxes[i+width].innerHTML = newColumn[1]
			boxes[i+(width*2)].innerHTML = newColumn[2]
			boxes[i+(width*3)].innerHTML = newColumn[3]
		}
	}

	function mergeRow(){
		for(let i=0;i<15;i++){
			if(boxes[i].innerHTML === boxes[i+1].innerHTML){
				let combinedTotal = parseInt(boxes[i].innerHTML) + parseInt(boxes[i+1].innerHTML)
				boxes[i].innerHTML = combinedTotal
				boxes[i+1].innerHTML = 0
				score += combinedTotal
				scoreDisp.innerHTML = score
			}
		}
		gameWin()
	}

	function mergeColumn(){
		for(let i=0;i<12;i++){
			if(boxes[i].innerHTML === boxes[i+width].innerHTML){
				let combinedTotal = parseInt(boxes[i].innerHTML) + parseInt(boxes[i+width].innerHTML)
				boxes[i].innerHTML = combinedTotal
				boxes[i+width].innerHTML = 0
				score += combinedTotal
				scoreDisp.innerHTML = score
			}
		}
		gameWin()
	}

	function control(e){
		if(e.keyCode === 37)
			keyLeft()
		else if(e.keyCode === 38)
			keyUp()
		else if(e.keyCode === 39)
			keyRight()
		else if(e.keyCode === 40)
			keyDown()
		var audio = new Audio('Audio/minecraft_click.mp3');
		audio.volume = 1;
    audio.play();
	}
	document.addEventListener('keyup',control)

	function keyRight(){
		goRight()
		mergeRow()
		goRight()
		generate()
	}

	function keyLeft(){
		goLeft()
		mergeRow()
		goLeft()
		generate()
	}

	function keyUp(){
		goUp()
		mergeColumn()
		goUp()
		generate()
	}

	function keyDown(){
		goDown()
		mergeColumn()
		goDown()
		generate()
	}

	function addColours() {
    for (let i=0; i < boxes.length; i++) {
      if (boxes[i].innerHTML == 0){ boxes[i].style.backgroundColor = 'white'
      	boxes[i].style.color = 'white'}
      else if (boxes[i].innerHTML == 2) boxes[i].style.backgroundColor = '#eee4da'
      else if (boxes[i].innerHTML  == 4) boxes[i].style.backgroundColor = '#ede0c8' 
      else if (boxes[i].innerHTML  == 8) boxes[i].style.backgroundColor = '#f2b179' 
      else if (boxes[i].innerHTML  == 16) boxes[i].style.backgroundColor = '#f59563' 
      else if (boxes[i].innerHTML  == 32) boxes[i].style.backgroundColor = '#f67c5f' 
      else if (boxes[i].innerHTML == 64) boxes[i].style.backgroundColor = '#f65e3b' 
      else if (boxes[i].innerHTML == 128) boxes[i].style.backgroundColor = '#edcf72' 
      else if (boxes[i].innerHTML == 256) boxes[i].style.backgroundColor = '#edcc61' 
      else if (boxes[i].innerHTML == 512) boxes[i].style.backgroundColor = '#edc850' 
      else if (boxes[i].innerHTML == 1024) boxes[i].style.backgroundColor = '#edc53f' 
      else if (boxes[i].innerHTML == 2048) boxes[i].style.backgroundColor = '#edc22e'
      if (boxes[i].innerHTML == 0) boxes[i].style.color = 'white'
      else boxes[i].style.color = 'black'
    	}
	}
	addColours()

	var myTimer =setInterval(addColours, 50)

	function resetfn(){
		for(let i=0;i<boxes.length;i++)
			boxes[i].innerHTML = 0;
		scoreDisp.innerHTML = 0;
		generate()
		generate()
		addColours()
	}

	function forfeitfn(){
		resetfn();
		location.href = 'http://localhost/project/homeindex.html';
	}

	document.getElementById("reset").addEventListener("click",resetfn);

	document.getElementById("forfeit").addEventListener("click",forfeitfn);

	let elem = document.getElementsByClassName("grid");
	let full = document.getElementById("full");
	full.addEventListener("click", () => {
	  if (!document.fullscreenElement) {
	    if (elem.requestFullscreen) {
		    elem.requestFullscreen();
		  } else if (elem.webkitRequestFullscreen) { /* Safari */
		    elem.webkitRequestFullscreen();
		  } else if (elem.msRequestFullscreen) { /* IE11 */
		    elem.msRequestFullscreen();
		  }
	  } else {
	    if (document.exitFullscreen) {
		    document.exitFullscreen();
		  } else if (document.webkitExitFullscreen) { /* Safari */
		    document.webkitExitFullscreen();
		  } else if (document.msExitFullscreen) { /* IE11 */
		    document.msExitFullscreen();
		  }
	  }
	});


	document.querySelector('#screenshot').addEventListener("click", function() {
        html2canvas(document.querySelector('.container-1'), {
            onrendered: function(canvas) {
                // document.body.appendChild(canvas);
              return Canvas2Image.saveAsPNG(canvas);
            }
        });
    });

})

