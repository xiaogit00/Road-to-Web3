const db = {
	"03067":["Bake Rolls 100g","snack"],
	"04089":["Potato Chips 70g","snack"],
	"05612":["Ice Coffee 100ml","drink"],
	"07740":["Sparkling Water 1.5l","drink"]
}

// Create input element - via the input tag name
// let search = document.createElement("input");

let search = document.getElementsByTagName("input");
// window.search = search; // Put the element in window so we can access it easily later
// search.id = "search"; // This is for the CSS
search.autocomplete = "off"; // Disable browser autocomplete
search[0].setAttribute("onkeyup","searchDB(this);");
// window.onload = function() {
// 	document.body.appendChild(search);
// }

// Search & dropdown function
function searchDB(elem) {
	let selector = document.getElementById("selector");
	// Check if input is empty
	if (elem.value.trim() !== "") {
		elem.classList.add("dropdown"); // Add dropdown class (for the CSS border-radius)
		// If the selector div element does not exist, create it
		if (selector == null) {
			selector = document.createElement("div");
			selector.id = "selector";
			elem.parentNode.appendChild(selector);
			// Position it below the input element
			selector.style.left = elem.getBoundingClientRect().left + "px";
			selector.style.top = elem.getBoundingClientRect().bottom + "px";
			selector.style.width = elem.getBoundingClientRect().width + "px";
		}
		// Clear everything before new search
		selector.innerHTML = "";
		// Variable if result is empty
		let empty = true;
		for (let item in db) {
			// Join the db elements in one string
			let str = [item.toLowerCase(), db[item][0].toLowerCase(), db[item][1].toLowerCase()].join();
			// If exists, create an item (button)
			if (str.indexOf(elem.value) !== -1) {
				let opt = document.createElement("button");
				opt.setAttribute("onclick","insertValue(this);")
				opt.innerHTML = db[item][0];
				selector.appendChild(opt);
				empty = false;
			}
		}
		// If result is empty, display a disabled button with text
		if (empty == true) {
			let opt = document.createElement("button");
			opt.disabled = true;
			opt.innerHTML = "No results";
			selector.appendChild(opt);
		}
	}
	// Remove selector element if input is empty
	else {
		if (selector !== null) {
			selector.parentNode.removeChild(selector);
			elem.classList.remove("dropdown");
		}
	}
}

// Function to insert the selected item back to the input element
function insertValue(elem) {
	window.search.classList.remove("dropdown");
	window.search.value = elem.innerHTML;
	elem.parentNode.parentNode.removeChild(elem.parentNode);
}