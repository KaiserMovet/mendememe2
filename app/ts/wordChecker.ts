class WordChecker {

    word: string
    chem: Chem
    constructor(word: string) {
        this.word = word.toLowerCase()
        this.chem = new Chem()
    }

    iteration(word: string) {
        let possibilites: string[] = []
        for (var symbol of this.chem.getSymbols()) {
            if (word.startsWith(symbol)) {
                possibilites.push(symbol)
            }
        }
        let full_list: string[][] = []
        for (var possibility of possibilites) {
            let symbol_len = possibility.length
            let new_word = word.slice(symbol_len)
            if (!new_word) {
                full_list.push([possibility])
                break
            }
            let new_word_possibilites = this.iteration(new_word)
            for (var new_possibility of new_word_possibilites) {
                let one_line: string[] = [possibility].concat(new_possibility)
                full_list.push(one_line)
            }
        }
        return full_list
    }

    results() {
        return this.iteration(this.word)
    }

}