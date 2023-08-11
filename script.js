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
		let span2 = document.createElement("span");
		span2.innerHTML = "\u2713";
		span2.classList.add("edit-button")
		li.appendChild(span2);
	}
	inputBox.value = "";
}
listContainer.addEventListener("click", function(e){
	if(e.target.tagName === "LI"){
		e.target.classList.toggle("checked");
	}
	else if(e.target.tagName === "SPAN"){
		e.target.parentElement.remove();
	}
}, false);