import {Cell} from './cell'
import {Joiner} from '../../utils/joiner'

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

    getSkuCode(){
        const joiner = new Joiner("#")
        this.padding.forEach(cell=>{
            joiner.join(cell.getCellCode())
        })
        return joiner.getStr()
    }

    getCurrentSpecValues () {
        const values = this.padding.map(cell=>{
            return cell ? cell.spec.value : null
        })
        return values
    }

    getMissingSpeckeysIndex () {
        const missingkeysIndex = []
        for (let i = 0; i < this.size; i++){
            if (!this.padding[i]) {
                missingkeysIndex.push(i)
            }
        }
        return missingkeysIndex
    }

    _isEmptyPart (index) {
        return this.padding[index]?false:true
    }

}

export {
    SkuPadding
}