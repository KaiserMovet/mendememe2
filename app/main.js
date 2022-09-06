"use strict";
function checkWord() {
    let word = document.getElementById("word").value;
    let check = new WordChecker(word);
    let results = check.results();
    if (results.length > 0) {
        Results.addWord(word, results);
    }
    else {
        Results.clear();
    }
}
function main() {
    Results.founded_list = document.cookie
        .split('; ')
        .find((row) => row.startsWith('test2='))
        ?.split('=')[1].split(',');
    if (isNaN(Results.founded_list)) {
        Results.founded_list = [];
    }
    Results.addAllToFounded();
    checkWord();
}
main();
