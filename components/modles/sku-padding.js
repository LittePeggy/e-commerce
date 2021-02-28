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

    isSelected(cell, x){
        const paddingCell = this.padding[x]
        if (!paddingCell) {
            return false
        }
        return paddingCell.id === cell.id
    }

}

export {
    SkuPadding
}