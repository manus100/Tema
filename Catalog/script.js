var catalog = []
var catalogIdx;

class Elev {
    constructor(nume) {
        this.nume = nume;
        this.note = [];
    }
    medie() {
        if (this.note.length === 0) {
            return "";
        }
        var s = 0;
        for (var i = 0; i < this.note.length; i++) {
            s += this.note[i];
        }
        return s / this.note.length;
    }
    addNota(n) {
        this.note.push(parseInt(n));
    }
    sortNote() {
        this.note.sort(function (a, b) { return a - b })
    }

    sortNoteDesc() {
        this.note.sort(function (a, b) { return b - a })
    }

    get nameCapitalized() {
        return this.nume.charAt(0).toUpperCase() + this.nume.slice(1);
    }
}

function addElev() {
    var numeElev = document.querySelector("#nume").value
    if (numeElev.length >= 3) {
        catalog.push(new Elev(numeElev));
        console.log(catalog);

        if (document.querySelector('[name="numeElev"].invalid') !== null) {
            document.querySelector('[name="numeElev"].invalid').classList.remove("invalid");
        }

        draw();

    } else {
        document.querySelector("#nume").classList.add("invalid");
    }
}

function draw() {

    var str = ``
    for (var i = 0; i < catalog.length; i++) {
        str += `
            <tr>
                <td>${catalog[i].nume}</td>
                <td>${catalog[i].medie()}</td>
                <td><input type="button" value="Vezi notele" class="itemBtn" onclick="showNote(${i});"></td>
            </tr>
        `
    }
    document.querySelector("table>tbody").innerHTML = str;
    document.getElementById("elevTable").classList.remove("hidden");
    document.querySelector('[name="numeElev"]').value = "";
}

function showNote(idx) {

    document.getElementById("note_elev_wrapper").classList.remove("hidden");
    document.getElementById("note_elev_wrapper").classList.add("active");
    document.getElementById("lista_elevi_wrapper").classList.add("active");
    document.getElementById('note_elev_wrapper').getElementsByTagName('h1')[0].innerHTML = 'Note elev: ' + catalog[idx].nameCapitalized;
    console.log(document.getElementById('note_elev_wrapper').getElementsByTagName('h1')[0].innerHTML);
    console.log(catalog[idx].nume);

    catalogIdx = idx;
    drawNote();
}

function adaugaNota() {
    let notaEl = document.getElementById("nota");
    let nota = notaEl.value
    if (Number(nota) > 0 && Number(nota) <= 10) {
        catalog[catalogIdx].addNota(nota);
        console.log(catalog);
        if (document.querySelector('[name="notaElev"].invalid') !== null) {
            document.querySelector('[name="notaElev"].invalid').classList.remove("invalid");
        }
        drawNote();
        draw();
    } else {
        notaEl.classList.add("invalid");
    }
    document.querySelector('[name="notaElev"]').value = "";
}

function drawNote() {
    var str = ``
    if (catalog[catalogIdx].note.length > 0) {
        for (var i = 0; i < catalog[catalogIdx].note.length; i++) {
            str += `
            <tr>
                <td>${catalog[catalogIdx].note[i]}</td>
            </tr>
        `
        }
        document.querySelector("#noteTable>tbody").innerHTML = str;
        document.getElementById("noteTable").classList.remove("hidden");
        document.getElementById("msgNota").classList.add("hidden");
    } else {
        document.getElementById("noteTable").classList.add("hidden");
        document.getElementById("msgNota").classList.remove("hidden");
    }
}


function checkIfEnter(elem, event) {
    if (event.keyCode === 13) {
        ((elem.name === 'numeElev') ? addElev() : adaugaNota())
    }
}

function sorteaza(direction, prop) {

    if (prop === 'medie') {
        catalog.sort(function (a, b) {
            if (a.medie() > b.medie()) {
                return ((direction === 'asc') ? 1 : -1);
            } else if (a.medie() < b.medie()) {
                return ((direction === 'asc') ? -1 : 1);
            } else {
                return 0
            }
        });
        draw();
    } else {
        ((direction === 'asc') ? catalog[catalogIdx].sortNote() : catalog[catalogIdx].sortNoteDesc());
        drawNote();
    }
}

function ascundeNote() {
    document.getElementById("note_elev_wrapper").classList.remove("active");
    document.getElementById("note_elev_wrapper").classList.add("hidden");
    document.getElementById("lista_elevi_wrapper").classList.remove("active");
}