var x = 0;
function countPost() {
    document.querySelector("#counter").innerHTML = x += 1;

}
let y = 0;
let chars = document.querySelector("#chars");
let message = document.querySelector("#message");
let infoTxt = document.querySelector("#blck");
message.addEventListener("keypress", countChar);
function countChar() {
    chars.innerHTML = y += 1;
    if (y > 600) {
        infoTxt.innerHTML = "För många tecken!"
        infoTxt.style.color = "red";
    }
}

console.log("funkar fint")
let gBooks = [];

function savePost() {

    localStorage.setItem("post", JSON.stringify(gBooks));
}

window.addEventListener('load', function () {
    loadPost();
    gBooks.forEach(renderPost);
});


function loadPost() {
    gBooks = JSON.parse(localStorage.getItem("post"));

    if (!gBooks) {                                            // gör så gBooks blir en tom array och inte null eller undefined
        gBooks = [];
        localStorage.setItem("post", JSON.stringify(gBooks));
    }
}

function renderPost(book) {
    let dispFld = document.querySelector("#display");
    let testcont = document.createElement("div");
    testcont.id = book.id;
    let x = document.createElement("IMG");
    x.setAttribute("src", "bjarne.png");
    x.setAttribute("width", "50");
    x.setAttribute("height", "42");
    let holder = document.createElement("div");
    let answerBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    let favBtn = document.createElement("button");
    answerBtn.className = "smick";
    deleteBtn.className = "smick";
    favBtn.className = "smick";
    x.className = "avatar";
    answerBtn.appendChild(document.createTextNode("Svara"));
    deleteBtn.appendChild(document.createTextNode("Radera"));
    favBtn.appendChild(document.createTextNode("Smultron"));
    holder.className = "holder";
    let inputVle = book.book;
    //let inputVle = document.querySelector("#message").value;
    let inpName = book.sender;
    testcont.appendChild(x);
    let span = document.createElement("div");
    var d = new Date();
    let fine = d.toLocaleDateString() + " - " + d.toLocaleTimeString();
    span.innerHTML = fine;
    holder.appendChild(span);
    let bold = document.createElement("b");
    bold.className = "bold";
    bold.appendChild(document.createTextNode(" Bjarne"));
    holder.appendChild(bold);
    holder.appendChild(document.createTextNode(" P29 från Stockholm i Stockholm"));
    holder.appendChild(document.createElement("br"));
    holder.appendChild(document.createTextNode("    " + inputVle + inpName));
    testcont.appendChild(holder);
    testcont.appendChild(answerBtn);
    testcont.appendChild(deleteBtn);
    testcont.appendChild(favBtn);
    dispFld.appendChild(testcont);
    favBtn.setAttribute("onclick", "fav(" + book.id + ")")
    deleteBtn.onclick = removeItem;
    countPost();
}
let inputFld = document.querySelector("#message");
let inputVle = document.querySelector("#message").value;
let inpName = document.querySelector("text");
let inpBtn = document.querySelector("#submit");


inpBtn.addEventListener("click", function () {
    let book = {
        id: Date.now(),
        favourite: false,
        book: document.querySelector("#message").value,
        sender: document.querySelector("#text").value,
        date: Date()
    }
    gBooks.push(book);
    renderPost(book);
    savePost();
});
function fav(bkid) {
    let favItem = document.getElementById(bkid).childNodes[1];
    favItem.classList.toggle("test");
};

function removeItem(e) {
    var idToRemove = e.target.parentElement.id;
    e.target.parentElement.remove();
    var i;
    var index;
    for (i = 0; i < gBooks.length; i++) {
        if (gBooks[i].id == idToRemove) {
            index = i;
        }
    }
    document.querySelector("#counter").innerHTML = x -= 1;
    gBooks.splice(index, 1);
    savePost();
}

