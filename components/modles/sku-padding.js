import {Cell} from './cell'

class SkuPadding {

    padding = []
    size

    constructor (size) {
        this.size = size
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

    isIntact () {
        for (let i = 0; i < this.size; i++) {
            if (this._isEmptyPart(i)){
                return false
            }
        }
        return true
    }

    _isEmptyPart (index) {
        return this.padding[index]?false:true
    }

}

export {
    SkuPadding
}