"use strict";
var ELCLASS = {
    "founded": ["btn", "btn-warning"],
    "button": ["btn", "btn-secondary", "btn-copy"],
    "res": ["elements", "flex-nowrap"],
    "row": ["vertical-center"],

}
// Class used to store founded words
class Founded {
    static addToFounded(founded) {
        if (Founded.founded_list.includes(founded))
            return;
        Founded.founded_list.push(founded);
        let d = new Date()
        Founded.founded.appendChild(Founded.getFoundedEl(founded));
        document.cookie = "founded=" + Founded.founded_list.toString() + ";expires=" + d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000)) + ";";
    }

    static getFoundedEl(founded) {
        var innerDiv = document.createElement('div');
        innerDiv.innerHTML = founded;
        innerDiv.classList.add(...ELCLASS['founded']);
        innerDiv.id = "founded-" + founded;
        innerDiv.onclick = function () {
            document.getElementById("word").value = founded
            checkWord()
        };
        return innerDiv
    }

    static addAllToFounded() {
        Founded.founded_list.sort()
        for (let founded of Founded.founded_list) {
            Founded.founded.appendChild(Founded.getFoundedEl(founded));
        }
    }
}

Founded.founded = document.getElementById("founded");
Founded.founded_list = [];

// Class used to display founded solution for word
class Results {



    static getLang() {
        var e = document.getElementById("language");
        return e.value;
    }

    // Create cell element for given data
    static createCell(symbol, number, mass, name, style = "") {
        var cell = document.createElement('div');
        var name_el = document.createElement('div');
        name_el.innerHTML = name;
        name_el.classList.add("name");
        var symbol_el = document.createElement('div');
        symbol_el.innerHTML = symbol;
        symbol_el.classList.add("symbol");
        var number_el = document.createElement('div');
        number_el.innerHTML = number;
        number_el.classList.add("number");
        var mass_el = document.createElement('div');
        mass_el.innerHTML = (Math.round(mass * 1000) / 1000).toString();
        mass_el.classList.add("mass");
        cell.appendChild(number_el);
        cell.appendChild(mass_el);
        cell.appendChild(symbol_el);
        cell.appendChild(name_el);
        cell.classList.add("element");
        if (style) cell.classList.add(style);

        return cell
    }

    // Create cell element from symbol
    static createCellFromSymbol(symbol_str) {
        var symbol_str = symbol_str.charAt(0).toUpperCase() + symbol_str.slice(1);
        var data = Results.chem.getElement(symbol_str);
        var number = data["number"];
        var mass = data["atomic_mass"];
        var name = data[Results.getLang()];
        console.log(document.getElementById("style-name").value)
        var style = document.getElementById("style-name").value
        return Results.createCell(symbol_str, number, mass, name, style);
    }
    static createImage(elements) {
        var innerDiv = document.createElement('div');
        innerDiv.classList.add(...ELCLASS.res);

        for (var el of elements) {
            innerDiv.appendChild(Results.createCellFromSymbol(el));
        }
        return innerDiv;
    }

    static copyToClipboard(element_id) {
        var svg = document.querySelector("#" + element_id);
        html2canvas(svg).then(function (canvas) {
            canvas.toBlob(function (blob) {
                navigator.clipboard
                    .write([
                        new ClipboardItem(
                            Object.defineProperty({}, blob.type, {
                                value: blob,
                                enumerable: true
                            })
                        )
                    ])
                    .then(function () {
                    });
            });
        });
    }

    static prepareDiv(elements) {
        let names = "";
        var innerDiv = document.createElement('div');
        innerDiv.classList.add(...ELCLASS.row);

        let image = Results.createImage(elements)
        image.id = "element" + Math.floor(Math.random() * 100)
        innerDiv.appendChild(image);

        let button = document.createElement("button");
        button.classList.add(...ELCLASS.button)
        button.innerHTML = 'Copy';
        button.onclick = function () {
            Results.copyToClipboard(image.id)
        };
        innerDiv.appendChild(button);
        // Add names
        for (var element of elements) {
            element = element.charAt(0).toUpperCase() + element.slice(1);
            names += Results.chem.getElement(element)["polish_name"] + " ";
        }
        // innerDiv.innerHTML += names;
        return innerDiv;
    }
    static addWord(word, results) {
        Results.clear();
        for (var res of results) {
            var innerDiv = Results.prepareDiv(res);
            Results.results.appendChild(innerDiv);
        }
    }
    static clear() {
        Results.results.innerHTML = "";
    }
}
Results.results = document.getElementById("results");
Results.chem = new Chem();
