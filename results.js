"use strict";
var ELCLASS = {
    "founded": ["btn", "btn-warning"],
    "button": ["btn", "btn-secondary"],
    "res": ["elements", "flex-nowrap"],
    "row": ["container", "vertical-center"],

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

    static createCell(symbol_str) {
        symbol_str = symbol_str.charAt(0).toUpperCase() + symbol_str.slice(1);
        var cell = document.createElement('div');
        var data = Results.chem.getElement(symbol_str);
        var name = document.createElement('div');
        name.innerHTML = data[Results.getLang()];
        name.classList.add("name");
        var symbol = document.createElement('div');
        symbol.innerHTML = symbol_str;
        symbol.classList.add("symbol");
        var number = document.createElement('div');
        number.innerHTML = data["number"];
        number.classList.add("number");
        var mass = document.createElement('div');
        mass.innerHTML = (Math.round(data["atomic_mass"] * 1000) / 1000).toString();
        mass.classList.add("mass");
        cell.appendChild(number);
        cell.appendChild(mass);
        cell.appendChild(symbol);
        cell.appendChild(name);
        cell.classList.add("element");

        return cell;
    }
    static createImage(elements) {
        var innerDiv = document.createElement('div');
        innerDiv.classList.add(...ELCLASS.res);

        for (var el of elements) {
            innerDiv.appendChild(Results.createCell(el));
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
