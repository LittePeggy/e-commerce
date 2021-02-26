class SkuPadding {

    padding = []

    constructor () {

    }

    insertCell (cell, x) {
        this.padding[x] = cell
    }

    removeCell (x) {
        this.padding[x] = null
    }

    findSelectedCellByX (x) {
        return this.padding[x]
    }

}

export {
    SkuPadding
}