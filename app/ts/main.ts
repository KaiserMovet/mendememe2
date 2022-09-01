function prepareDiv(elements: string[]) {
    let chem = new Chem()
    let symbols = ""
    let symbols_with_space = ""
    for (var element of elements) {
        element = element.charAt(0).toUpperCase() + element.slice(1);
        symbols += element
        symbols_with_space += element + " "
    }
    var innerDiv = document.createElement('div');
    innerDiv.innerHTML = symbols + " | " + symbols_with_space;
    return innerDiv
}

function addToFounded(founded: string) {
    let founded_div = (<HTMLInputElement>document.getElementById("founded")!)
    var innerDiv = document.createElement('div');
    innerDiv.innerHTML = founded
    founded_div.appendChild(innerDiv);
}

function checkWord() {
    let word = (<HTMLInputElement>document.getElementById("word")!).value;
    let check = new WordChecker(word)
    let results = check.results()
    if (results) {
        addToFounded(word)
    }
    let result_div = (<HTMLInputElement>document.getElementById("results")!)
    result_div.innerHTML = ""
    for (var res of results) {
        var innerDiv = prepareDiv(res)
        result_div.appendChild(innerDiv);
    }
}

function main() {
    console.log("dziala")
    let chem: Chem = new Chem()
}

main();
