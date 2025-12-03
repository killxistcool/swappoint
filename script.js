let offers = JSON.parse(localStorage.getItem("offers") || "[]");

function render() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    offers.forEach(o => {
        const div = document.createElement("div");
        div.innerHTML = `
            <strong>${o.title}</strong><br>
            <p>${o.description}</p>
            <em>Wunsch: ${o.wish}</em><br>
            ${o.image ? `<img src="${o.image}">` : ""}
        `;
        list.appendChild(div);
    });
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
    const file = document.getElementById("imageInput").files[0];

    if (!title || !description || !wish) {
        alert("Bitte alle Felder ausfüllen.");
        return;
    }

    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            saveOffer(reader.result);
        };
        reader.readAsDataURL(file);
    } else {
        saveOffer(null);
    }
}

function saveOffer(image) {
    offers.push({
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        wish: document.getElementById("wish").value,
        image: image
    });

    localStorage.setItem("offers", JSON.stringify(offers));
    closeForm();
    render();
}

render();
