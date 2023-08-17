const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const resetImage = document.getElementById("reset");

function AddTask() {
	if(inputBox.value === ''){
		alert("Please write something!");
	}
	else{
		let li = document.createElement("li");
		li.innerHTML = inputBox.value;
		listContainer.appendChild(li);
		let span = document.createElement("span");
		span.innerHTML = "\u00D7";
		li.appendChild(span);
	}
	inputBox.value = "";
	saveList();
}
listContainer.addEventListener("click", function(e){
	if(e.target.tagName === "LI"){
		e.target.classList.toggle("checked");
		saveList();
	}
	else if(e.target.tagName === "SPAN"){
		e.target.parentElement.remove();
		saveList()
	}
}, false);

function saveList(){
	localStorage.setItem("data", listContainer.innerHTML);
}
function showList(){
	listContainer.innerHTML = localStorage.getItem("data");
}
showList();

resetImage.addEventListener("click", clearList)

function clearList(){
	listContainer.innerHTML = "";
	localStorage.clear();
}
