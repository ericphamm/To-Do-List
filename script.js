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
listContainer.addEventListener("click", function(e){
	if(e.target.tagName === "LI"){
		console.log("here")
		e.target.classList.toggle("checked");
	}
	else if(e.target.tagName === "SPAN"){
		console.log("halo")
		e.target.parentElement.remove();
	}
}, false);