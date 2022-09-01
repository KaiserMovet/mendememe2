class Results {

    static results = <HTMLInputElement>document.getElementById("results")!
    static founded = <HTMLInputElement>document.getElementById("founded")!
    static founded_list: string[] = []
    static chem = new Chem()

    private static createCell(symbol_str: string) {
        symbol_str = symbol_str.charAt(0).toUpperCase() + symbol_str.slice(1);
        var cell = document.createElement('div');
        var data = Results.chem.getElement(symbol_str)

        var name = document.createElement('div')
        name.innerHTML = data["name"]
        name.classList.add("name")

        var symbol = document.createElement('div')
        symbol.innerHTML = symbol_str
        symbol.classList.add("symbol")

        var number = document.createElement('div')
        number.innerHTML = data["number"]
        number.classList.add("number")

        var mass = document.createElement('div')
        mass.innerHTML = (Math.round(data["atomic_mass"] * 1000) / 1000).toString()
        mass.classList.add("mass")

        cell.appendChild(number)
        cell.appendChild(mass)
        cell.appendChild(symbol)
        cell.appendChild(name)

        cell.classList.add("element")
        return cell
    }

    private static createImage(elements: string[]) {
        var innerDiv = document.createElement('div');
        innerDiv.classList.add("elements")
        for (var el of elements) {
            innerDiv.appendChild(Results.createCell(el))
        }
        return innerDiv
    }


    private static addToFounded(founded: string) {
        if (Results.founded_list.includes(founded)) return

        Results.founded_list.push(founded)
        var innerDiv = document.createElement('div');
        innerDiv.innerHTML = founded
        Results.founded.appendChild(innerDiv);
    }

    private static prepareDiv(elements: string[]) {
        let symbols = ""
        let symbols_with_space = ""
        let names = ""
        for (var element of elements) {
            element = element.charAt(0).toUpperCase() + element.slice(1);
            symbols += element
            symbols_with_space += element + " "
            names += Results.chem.getElement(element)["polish_name"] + " "
        }
        var innerDiv = document.createElement('div');
        innerDiv.innerHTML = symbols + " | " + symbols_with_space + " | " + names;
        innerDiv.appendChild(Results.createImage(elements))
        return innerDiv
    }

    static addWord(word: string, results: string[][]) {
        Results.addToFounded(word)

        Results.clear()
        for (var res of results) {
            var innerDiv = Results.prepareDiv(res)
            Results.results.appendChild(innerDiv);
        }
    }

    static clear() {
        Results.results.innerHTML = ""
    }
}