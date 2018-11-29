var start_wrapper = document.querySelector("#start_wrapper");
var start = document.querySelector("#start");
var level = document.querySelector("#level");
var num = document.querySelector("#number");
//监听start的点击事件
start.addEventListener("click", function() {
	//点击start后，隐藏封面
	start_wrapper.style.display = "none";
	//切换level
	level.style.left = "-375px";
	level.style.transition = "all 0.7s ease-out";
})
// 动画过渡
level.addEventListener("transitionend", function() {
	level.style.transition = "none"
	level.style.left = "375px";
	//创建新的圆
	innerHtml();
	flag = true;
	if(i >= 2 || flag == false) {
		flag = true;
		level.style.animation = "toleft 1.2s "
	}
})
//level的animate结束时
level.addEventListener("animationend", function() {
	level.style.animation = "none"
})

var flag = true;

function change(el) {
	if(flag == true) {
		flag = false;
		var Son = document.querySelectorAll(".buildSon");
		console.log(Son[i - 1], Son.length)
		if((i - 1) == this.id) {
			//number关数加1
			num.innerText = Number(num.innerText) + 1;
			//切换level
			level.style.left = "0px";
			level.style.transition = "all 0.7s ease-out"
		} else {
			Son[Son.length - 1].addEventListener("animationend", function() {
				alert('游戏结束');
				over.style.display = "block";
			})
			Son[Son.length - 1].style.animation = "flash 2s";
		}
	}
}
// 游戏开始，每局数量加一
again.addEventListener("click", function() {
	over.style.display = "none"
	start_wrapper.style.display = "block"
	num.innerText = "1"
	container.innerHTML = ""
	level.style.left = "0px"
	i = 0;
})

//获取目标
var box = document.getElementById("box")
var container = document.querySelector("#container");
var i = 0;
var arrD = [],
	arrX = [],
	arrY = [];

//创建新圆点
function innerHtml() {
	//创建随机数
	var d = Math.floor(Math.random() * 50 + 10); //直径d范围（10-50）
	var x = Math.floor(Math.random() * 375); //x轴范围（0-375）
	var y = Math.floor(Math.random() * 600); //y轴范围（0-600）

	//在container中创建新的圆
	container.innerHTML += `<div class="buildSon" id=${i}><div>`
	var Son = document.getElementsByClassName("buildSon");
	for(let k = 0; k < Son.length; k++) {
		Son[k].onclick = change;
	}

	check(d, x, y);

	function check(d, x, y) {
		var condition1 = x + d > 375 || y + d > 600;
		var condition2 = "";
		for(let a = 0; a < arrD.length; a++) {
			if((arrX[a] < x + d) & (x < arrX[a] + arrD[a]) & (arrY[a] < y + d) & (y < arrY[a] + arrD[a])) {
				condition2 = true;
				a = arrD.length; //终止遍历
			} else {
				condition2 = false;
			}
		}
		if(condition1 || condition2) {
			//重置随机数
			var d = Math.floor(Math.random() * 50 + 10); //直径d范围（10-60）
			var x = Math.floor(Math.random() * 375); //x轴范围（0-350）
			var y = Math.floor(Math.random() * 600); //y轴范围（0-600）
			check(d, x, y);
		} else {
			//合格随机数赋值
			Son[i].style.width = d + "px";
			Son[i].style.height = d + "px";
			Son[i].style.left = x + "px";
			Son[i].style.top = y + "px";
			//点击次数累加
			i++;
			arrD.push(d);arrX.push(x);arrY.push(y);
		}
	}
};