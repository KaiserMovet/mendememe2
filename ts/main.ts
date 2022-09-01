function checkWord() {
    let word = (<HTMLInputElement>document.getElementById("word")!).value;
    let check = new WordChecker(word)
    let results = check.results()
    if (results.length > 0) {
        Results.addWord(word, results)
    } else {
        Results.clear()
    }

}

function main() {
    console.log("dziala")
    checkWord()

}

main();
