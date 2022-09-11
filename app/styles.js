class Styles {

    static changeStyle(style) {
        document.getElementById("style-name").value = style;
        checkWord();

    }

    static init() {
        var styles = ["breakingbad", "breakingbad2", "red"]
        for (let style of styles) {
            let cell = Results.createCell("H", 1, 1, style, style)
            cell.setAttribute("onclick", `Styles.changeStyle('${style}')`)
            Styles.collection.appendChild(cell)
        }
    }
}

Styles.collection = document.getElementById("styles-collection")