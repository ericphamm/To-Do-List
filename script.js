const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

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
}