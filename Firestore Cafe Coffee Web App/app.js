const cafelist = document.querySelector(".cafe-list");
const cafesubmit = document.querySelector(".add-cafe");

function renderCafe(cafe) {
    let li = document.createElement("li");
    let name = document.createElement("span");
    let city = document.createElement("span");
    let cross = document.createElement("div");

    li.setAttribute("data-id", cafe.id);
    name.textContent = cafe.data().name;
    city.textContent = cafe.data().city;
    cross.textContent = "x";

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);
    cafelist.appendChild(li);

    cross.addEventListener("click", function(event) {
        event.stopPropagation();

        let id = event.target.parentElement.getAttribute("data-id");
        db.collection("cafe").doc(id).delete();
    });
}

db.collection("cafe").orderBy("name").onSnapshot(function(snapshot) {
    let changes = snapshot.docChanges();
    changes.forEach(function(change) {
        if(change.type == "added") {
            renderCafe(change.doc);
        } else if(change.type == "removed") {
            let li = document.querySelector("[data-id=" + change.doc.id + "]");
            cafelist.removeChild(li);
        }
    });
});

cafesubmit.addEventListener("submit", function(event) {
    event.preventDefault();

    db.collection("cafe").add({
        name: cafesubmit['cafe-alias'].value,
        city: cafesubmit['cafe-location'].value
    });

    cafesubmit['cafe-alias'].value = '';
    cafesubmit['cafe-location'].value = '';
});