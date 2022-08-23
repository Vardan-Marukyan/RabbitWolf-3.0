	const btnStart = document.querySelector("#button_strat")
	const board = document.querySelector(".board")
	const status = document.querySelector(".status")
	const boardDiv = document.querySelector(".boardDiv")
	const startAgain = document.querySelector("#startAgain")
	const h1 = document.querySelector("#h1")

	let matrix = []
	const BOX_SIZE = 63
	const FREE_CELL = 0
	const RABBIT_CELL = 1
	const WOLF_CELL = 2
	const HOME_CELL = 3
	const BAN_CELL = 4
	
	const gameimg = {
		[RABBIT_CELL] : {
			name: "rabbit",
			src: "img/rabbit.png"
		},

		[WOLF_CELL] : {
			name: "wolf",
			src: "img/gamewolf.png",
			wolfmove: [FREE_CELL, RABBIT_CELL]
		},
		[BAN_CELL]:{
			name: "ban",
			src: "img/ban.png"
		},
		[HOME_CELL]:{
			name: "home",
			src: "img/home.png"
		}
	}

function  getselectValue(){
	const selectValue = document.querySelector("#play_select").value
	return selectValue
}

function getMatrix(value){
	for(let i = 0; i < value; i++){
		matrix[i] = []
		for(let j = 0; j < value; j++){
			matrix[i][j] = FREE_CELL
		}
	}
}

function getRandomCell(){
	const x = Math.floor(Math.random() * getselectValue())
	const y = Math.floor(Math.random() * getselectValue())
	return (matrix[x][y] === FREE_CELL) ? [x , y] : getRandomCell()
}

function getRabbit(arrRabbitXY){
	const [x,y] = [arrRabbitXY[0],arrRabbitXY[1]]
	matrix[x][y] = RABBIT_CELL
}

function getHome(arrHomeXY){
	const [x,y] = [arrHomeXY[0],arrHomeXY[1]]
	matrix[x][y] = HOME_CELL
}

function getWolf(value){
	const wolfQuantity = (value <= 9) ? Math.ceil(value * value / 100 * 10) : Math.ceil(value * value / 100 * 6) 
	for(let i = 0; i < wolfQuantity; i++){
		const arr = getRandomCell()
		const [x,y] = [arr[0], arr[1]]
		matrix[x][y] = WOLF_CELL
	}
}

function getBan(value){
	const banQuantity = (value <= 9) ? Math.ceil(value * value / 100 * 6) : Math.ceil(value * value / 100 * 4) 
	for(let i = 0; i < banQuantity; i++){
		const arr = getRandomCell()
		const [x,y] = [arr[0], arr[1]]
		matrix[x][y] = BAN_CELL
	}
}

function boxSize(value){
	const size = value
	const boxWidth = size * BOX_SIZE
	board.style.width = boxWidth + "px"
}

function createDiv(value){
	board.innerHTML = ""
	let boardNomber = 0
	for (let i = 0; i < value; i++){
		for(let j = 0; j < value; j++){
			const div = document.createElement("div")
			div.id = `cell${boardNomber}`
			board.appendChild(div)
			boardNomber++
		}
	}
}

function createImg(value){
	let divNomber = 0
	for (let i = 0 ; i < value; i++){
		for(let j = 0; j < value; j++){
			if(matrix[i][j] != FREE_CELL){
				const img = document.createElement("img")
				img.src = gameimg[matrix[i][j]].src
				img.name = gameimg[matrix[i][j]].name
				serchDiv = document.querySelector(`#cell${divNomber}`)
				serchDiv.appendChild(img)
			}
			divNomber++
		}
	}
}

function RabbitCoordinate(value){
	for(let i = 0; i < value; i++){
		for(let j = 0; j< value; j++){
			if(matrix[i][j] == RABBIT_CELL){
				return [i, j]
			}
		}
	}
}

function getButtonPressedRabbit(arrCoordinateRabbit,value){
	let [y, x] = [arrCoordinateRabbit[0], arrCoordinateRabbit[1]]
	if(event.code === "ArrowUp"){
		y -= 1
		if(y === -1){
			y = value - 1
		}
	}
	if(event.code === "ArrowDown"){
		y += 1
		if(y > value -1){
			y = 0
		}
	}
	if(event.code === "ArrowLeft"){
		x -= 1
		if(x === -1){
			x = value - 1
		}
	}
	if(event.code === "ArrowRight"){
		x += 1
		if(x > value - 1){
			x = 0
		}
	}
	return [y, x]
}

function rabbitMove(arrCoordinateRabbit,arrCoordinateRabbitBefore){
	let [yBefore, xBefore] = [arrCoordinateRabbitBefore[0], arrCoordinateRabbitBefore[1]]
	let [y, x] = [arrCoordinateRabbit[0], arrCoordinateRabbit[1]]
	if(matrix[y][x] == FREE_CELL ){
		matrix[yBefore][xBefore] = FREE_CELL
		matrix[y][x] = RABBIT_CELL
	}
	if(matrix[y][x] === WOLF_CELL){
		boardDiv.style.display = "none"
		status.style.display = "block"
	}
	if(matrix[y][x] === HOME_CELL ){
		boardDiv.style.display = "none"
		status.style.display = "block"
		h1.innerHTML = "YOU WON"
	}
	}
	
	
	function wolfCoordinate(value){
	let wolfXY = []
	let wolfQuantity = 0
	for(let i = 0; i < value; i++){
		for(let j =0; j < value; j++){
			if(matrix[i][j] === WOLF_CELL){
				wolfXY[wolfQuantity] = [i,j]
				wolfQuantity++
			}
		}
	}
	return wolfXY
	}
	
	function getButtonPressedWolf(arrWolfXY,arrRabbitXY){
	let [rabbitX, rabbitY] = [arrRabbitXY[1], arrRabbitXY[0]]
	let wolfArr = []
	for(let i = 0; i < arrWolfXY.length; i++){
		let random = Math.floor(Math.random() * 2)
		let [wolfX,wolfY] = [arrWolfXY[i][1], arrWolfXY[i][0]]
		if(random === 0){
			if(wolfY < rabbitY){
				wolfY +=1
			}
			if(wolfY > rabbitY){
				wolfY -=1
			}
		}else{
			if(wolfX < rabbitX){
				wolfX +=1
			}
			if(wolfX > rabbitX){
				wolfX -=1
			}
		}
		wolfArr[i] = [wolfY,wolfX]
	}
	return wolfArr
	}
	
	function homeCoordinate(value){
	for(let i = 0; i< value; i++){
		for(let j =0 ; j < value; j++){
			if(matrix[i][j] === HOME_CELL){
				return [i,j]
			}
		}
	}	
	}
	
	function wolfMove(arrCoordinateWolf, arrCoordinateWolfBefore){
	for(let i = 0; i < arrCoordinateWolf.length; i++){
		let [wolfX,wolfY] = [arrCoordinateWolf[i][1],arrCoordinateWolf[i][0]]
		let [wolfXBefore,wolfYBefore] = [arrCoordinateWolfBefore[i][1], arrCoordinateWolfBefore[i][0]]
		if(matrix[wolfY][wolfX] === FREE_CELL){
			matrix[wolfYBefore][wolfXBefore] = FREE_CELL
			matrix[wolfY][wolfX] = WOLF_CELL
		}
		if(matrix[wolfY][wolfX] === RABBIT_CELL){
			boardDiv.style.display = "none"
			status.style.display = "block"
		}
	}
	}
	
	
	function start(){
	getMatrix(getselectValue())
	boxSize(getselectValue())
	getRabbit(getRandomCell())
	getHome(getRandomCell())
	getWolf(getselectValue())
	getBan(getselectValue())
	createDiv(getselectValue())
	createImg(getselectValue())
	}
	
	btnStart.addEventListener("click", function(){
	start()
	})
	
	document.addEventListener("keyup", function(){	
	rabbitMove(getButtonPressedRabbit(RabbitCoordinate(getselectValue()),getselectValue()),RabbitCoordinate(getselectValue()))
	wolfMove(getButtonPressedWolf(wolfCoordinate(getselectValue()), RabbitCoordinate(getselectValue())), wolfCoordinate(getselectValue()))
	createDiv(getselectValue())
	createImg(getselectValue())
	})
	
	
	startAgain.addEventListener("click", function(){
	boardDiv.style.display = "flex"
	status.style.display = "none"
	h1.innerHTML = "Game Over"
	start()
	})