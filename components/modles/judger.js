import {SkuCode} from "./sku-code";
import {CellStatus} from '../../core/enum'

class Judger{

    fenceGroup
    pathDic = []

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this._initPathDic()
    }

    _initPathDic(){
        this.fenceGroup.spu.sku_list.forEach(sku=>{
            const skuCode = new SkuCode(sku.code)
            this.pathDic.concat(skuCode.totalSegments)
        })
    }

    judger(cell){
        this._changeCurrentCellStatus(cell)
        this.fenceGroup.eachCell(this._changeOtherCellStatus)
    }

    _changeOtherCellStatus(cell, x, y) {

    }

    _findPotentialPath(cell, x, y){
        for (let i = 0; i < this.fenceGroup.fences.length; i++) {

        }
    }

    _changeCurrentCellStatus({cell, x, y}){
        if (cell.status === CellStatus.WAITING) {
           this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED
        }

        if (cell.status === CellStatus.SELECTED) {
            this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
        }
    }

}

export {
    Judger
}