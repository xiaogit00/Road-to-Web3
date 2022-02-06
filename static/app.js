
//**********************************************
//*             Declarations On Page Load
//**********************************************
//Define Search NFT by name as a DOM object 'search'
let search = document.getElementById("searchNFT");

//Define array placeholder to put all NFT data from API
let nftGlobalData = []

// window.search = search; // Put the element in window so we can access it easily later
// search.id = "search"; // This is for the CSS
search.autocomplete = "off"; // Disable browser autocomplete
search.setAttribute("onkeyup","searchDB(this);");

//HIDES BOTH DISPLAY
const fetchedNFT = document.getElementById("fetchedNFT");
const fetchedAdditionalNFT = document.getElementById("fetchedAdditionalNFT");


//**********************************************
//*             API calls
//**********************************************
// Call Async function to fetch all API data
getNFTData()

//**********************************************
//*             Event Handlers
//**********************************************
const form = document.getElementById('form')
form.onsubmit = submit;



//**********************************************
//*             Function Definitions
//**********************************************

async function getNFTData() {
	const endPoints = [
		'http://localhost:8080/api/nft-eth',
		'http://localhost:8080/api/nft-avax',
		'http://localhost:8080/api/nft-polygon'
	]
	for (let i = 0; i < endPoints.length; i++) {
		try {
			const res = await axios.get(endPoints[i])
			nftGlobalData.push(res.data)
		} catch (err) {
			console.error(err)
		}
	}

	console.log(nftGlobalData)
}



function submit(event) {
	event.preventDefault();
	const contractAddress = event.target[0].name
	const tokenID = event.target[1].value
	const chainID = event.target[2].value
	console.log(event.target[0].name) // this returns contractID
	console.log(event.target[1].value) // this returns tokenID
	console.log(event.target[2].value) //this returns chainID
	getNFTMetaData(contractAddress, tokenID, chainID)
		.then(res => {
			document.getElementById('fetchedNFTImage').src = res.data.items[0].nft_data[0].external_data.image_512
			document.getElementById('fetchedTokenID').innerHTML = tokenID
			document.getElementById('fetchedOwnedBy').innerHTML = res.data.items[0].nft_data[0].owner
			document.getElementById('fetchedOriginalOwner').innerHTML = res.data.items[0].nft_data[0].original_owner
			fetchedNFT.style.display = 'block'
			console.log(res.data)
		})
		.catch(err => console.log(err))

}

async function getNFTMetaData(contractAddress, tokenID, chainID) {
	const metaDataEndpoint = `https://api.covalenthq.com/v1/${chainID}/tokens/${contractAddress}/nft_metadata/${tokenID}/?quote-currency=USD&format=JSON&key=ckey_53d9f55e830446a3b8cedcd9ab9`
	try {
		const res = await axios.get(metaDataEndpoint)
		return res.data
	} catch (err) {
		console.error(err)
	}
}
// Search & dropdown function
function searchDB(elem) {
	console.log("hello from within search function of app.js")
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
		// for (let item in db) {
		// 	// Join the db elements in one string
		// 	let str = [item.toLowerCase(), db[item][0].toLowerCase(), db[item][1].toLowerCase()].join();
		// 	// If exists, create an item (button)
		// 	if (str.indexOf(elem.value) !== -1) {
		// 		let opt = document.createElement("button");
		// 		opt.setAttribute("onclick","insertValue(this);")
		// 		opt.innerHTML = db[item][0];
		// 		selector.appendChild(opt);
		// 		empty = false;
		// 	}
		// }

		nftGlobalData.map(chainData => {
			chainData.data.items.map(collection => {

				if (collection.collection_name !== null ) {
					let str = collection.collection_name.toLowerCase()
					if (str.indexOf(elem.value) !== -1) {
						let opt = document.createElement("button");
						opt.setAttribute("onclick","insertValue(this);")
						opt.innerHTML = collection.collection_name;
						opt.id = collection.collection_address
						selector.appendChild(opt);
						empty = false;
					}
				}

			})
		})
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
	console.log("hello from within insertValue function")
	window.searchNFT.classList.remove("dropdown"); //this targets the element with 'search' as id.
	window.searchNFT.value = elem.innerHTML;
	window.searchNFT.name = elem.id;
	// console.log("contract address selected is:", window.search.name)
	elem.parentNode.parentNode.removeChild(elem.parentNode);
}
