import {Cell} from './cell'

class SkuPadding {

    padding = []

    constructor () {

    }

    init(sku){
        for (let i = 0; i < sku.specs.length; i++) {
            const cell = new Cell(sku.specs[i])
            this.insertCell(cell, i)
        }
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