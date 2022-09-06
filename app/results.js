"use strict";
var ELCLASS = {
    "founded": ["btn", "btn-warning"],
    "button": ["btn", "btn-secondary"],
    "res": ["elements", "flex-nowrap"],
}

class Results {
    static createCell(symbol_str) {
        symbol_str = symbol_str.charAt(0).toUpperCase() + symbol_str.slice(1);
        var cell = document.createElement('div');
        var data = Results.chem.getElement(symbol_str);
        var name = document.createElement('div');
        name.innerHTML = data["name"];
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
    static addToFounded(founded) {
        if (Results.founded_list.includes(founded))
            return;
        Results.founded_list.push(founded);
        var innerDiv = document.createElement('div');
        innerDiv.innerHTML = founded;
        innerDiv.classList.add(...ELCLASS['founded']);
        innerDiv.onclick = function () {
            document.getElementById("word").value = founded
            checkWord()
        };
        Results.founded.appendChild(innerDiv);
    }

    static copyToClipboard(element_id) {
        console.log(document)
        var svg = document.querySelector("#" + element_id);
        console.log("#" + element_id)
        console.log(svg)
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
                        console.log("Copied to clipboard");
                    });
            });
        });
    }

    static prepareDiv(elements) {
        let symbols = "";
        let symbols_with_space = "";
        let names = "";
        for (var element of elements) {
            element = element.charAt(0).toUpperCase() + element.slice(1);
            symbols += element;
            symbols_with_space += element + " ";
            names += Results.chem.getElement(element)["polish_name"] + " ";
        }
        var innerDiv = document.createElement('div');
        innerDiv.innerHTML = symbols + " | " + symbols_with_space + " | " + names;
        let image = Results.createImage(elements)
        image.id = "element" + Math.floor(Math.random() * 100)
        innerDiv.appendChild(image);

        let button = document.createElement("button");
        button.classList.add(...ELCLASS.button)
        button.innerHTML = "Copy to clipboard";
        button.onclick = function () {
            Results.copyToClipboard(image.id)
        };
        innerDiv.appendChild(button);


        return innerDiv;
    }
    static addWord(word, results) {
        Results.addToFounded(word);
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
Results.founded = document.getElementById("founded");
Results.founded_list = [];
Results.chem = new Chem();
