//de skarpe parenterser i variablen viser at det er et array
let retter = [];

document.addEventListener("DOMContentLoaded", hentJson);

//funktion som henter Json filen
async function hentJson() {
	let jsonData = await fetch("menu.json");
	retter = await jsonData.json();
	vis(retter, "Menu");
	lavFilter();
}

function vis(retter, overskrift) {
	console.log("vis retter");
	let temp = document.querySelector("[data-rettemplate]");
	let dest = document.querySelector("[data-liste]");
	dest.innerHTML = "";
	document.querySelector("[data-overskrift]").textContent = overskrift;
	document.querySelector("#popup").style.pointerEvents = "none"; // slå mus fra

	//loop som kloner template
	retter.forEach(ret => {
		let klon = temp.cloneNode(true).content;
		klon.querySelector("[data-navn]").textContent = ret.navn;
		klon.querySelector("[data-billede]").src = "imgs/small/" + ret.billede + "-sm.jpg";
		klon.querySelector("[data-billede]").alt = "Billede af " + ret.navn;
		klon.querySelector("[data-kortbeskrivelse]").textContent = ret.kortbeskrivelse;
		klon.querySelector("[data-pris]").textContent = ret.pris + ",- kr";
		klon.querySelector("[data-ret]").addEventListener("click", () => {
			visModal(ret)

		});
		dest.appendChild(klon);
	})
	//fade ind og ud
	document.querySelectorAll("article").forEach(a => {
		a.getBoundingClientRect(); // kun hvis det ikke virker uden
		a.style.transition = "all 1s";
		a.style.opacity = "1";
	})
}

function visModal(ret) {
	document.querySelector("#popup").style.opacity = "1";
	document.querySelector("#popup").style.pointerEvents = "auto"; // slå mus til
	document.querySelector("[data-titel]").textContent = ret.navn;
	document.querySelector("[data-singleImg]").src = "imgs/medium/" + ret.billede + "-md.jpg";
	document.querySelector("[data-singleImg]").alt = "Billede af " + ret.navn;
	document.querySelector("[data-beskrivelse]").textContent = ret.langbeskrivelse;
	document.querySelector("[data-pris]").textContent = ret.pris + ",- kr";
	document.querySelector("[data-button]").addEventListener("click", closeModal);
}

function closeModal() {
	console.log("luk modal funktion");
	document.querySelector("#popup").style.pointerEvents = "none"; // slå mus fra
	document.querySelector("#popup").style.opacity = "0";

}

function lavFilter() {
	console.log("filter");
	let forretter = retter.filter(ret => ret.kategori == "forretter");
	let hovedretter = retter.filter(ret => ret.kategori == "hovedretter");
	let sideorders = retter.filter(ret => ret.kategori == "sideorders");
	let desserter = retter.filter(ret => ret.kategori == "desserter");
	let drikkevarer = retter.filter(ret => ret.kategori == "drikkevarer");

	//sorter retter efter kategori
	document.querySelector("#filter-alle").addEventListener("click", () => {
		vis(retter, "Menu");
	});
	document.querySelector("#filter-forretter").addEventListener("click", () => {
		vis(forretter, "Forretter");
	});
	document.querySelector("#filter-hovedretter").addEventListener("click", () => {
		vis(hovedretter, "Hovedretter");
	});
	document.querySelector("#filter-sideorders").addEventListener("click", () => {
		vis(sideorders, "Sideorders");
	});
	document.querySelector("#filter-desserter").addEventListener("click", () => {
		vis(desserter, "Desserter");
	});
	document.querySelector("#filter-drikkevarer	").addEventListener("click", () => {
		vis(drikkevarer, "Drikkevarer");
	});
}

function toggleMenu() {
	document.querySelector(".burger").classList.toggle("change");
	document.querySelector("nav").classList.toggle("show");
}
document.querySelector(".burger").addEventListener("click", toggleMenu);
document.querySelector("nav").addEventListener("click", toggleMenu);
