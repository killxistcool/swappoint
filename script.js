let offers = JSON.parse(localStorage.getItem("offers") || "[]");
let currentCategory = "Alle";

function render() {
    const list = document.getElementById("list");
    const search = document.getElementById("searchInput").value.toLowerCase();

    list.innerHTML = "";

    offers
        .filter(o =>
            (currentCategory === "Alle" || o.category === currentCategory) &&
            (o.title.toLowerCase().includes(search) || o.description.toLowerCase().includes(search))
        )
        .forEach(o => {
            const div = document.createElement("div");
            div.className = "card";

            div.innerHTML = `
                ${o.image ? `<img src="${o.image}">` : `<img src="https://via.placeholder.com/300x200">`}
                <div class="card-content">
                    <h3>${o.title}</h3>
                    <p>${o.description}</p>
                    <p class="card-category">${o.category}</p>
                    <strong>Wunsch: ${o.wish}</strong>
                </div>
            `;

            list.appendChild(div);
        });
}

function filterCategory(cat) {
    currentCategory = cat;
    render();
}

function openForm() {
    document.getElementById("formModal").style.display = "block";
}

function closeForm() {
    document.getElementById("formModal").style.display = "none";
}

function addOffer() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const wish = document.getElementById("wish").value;
    const category = document.getElementById("category").value;
    const file = document.getElementById("imageInput").files[0];

    if (!title || !description || !wish) {
        alert("Bitte alles ausfüllen.");
        return;
    }

    if (file) {
        const reader = new FileReader();
        reader.onload = () => saveOffer(title, description, wish, category, reader.result);
        reader.readAsDataURL(file);
    } else {
        saveOffer(title, description, wish, category, null);
    }
}

function saveOffer(t, d, w, c, img) {
    offers.push({ title: t, description: d, wish: w, category: c, image: img });
    localStorage.setItem("offers", JSON.stringify(offers));
    closeForm();
    render();
}

render();
