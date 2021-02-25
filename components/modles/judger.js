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
        this._changeCellStatus(cell)
    }

    _changeCellStatus(cell){
        if (cell.status === CellStatus.WAITING) {
            cell.status = CellStatus.SELECTED
        }

        if (cell.status === CellStatus.SELECTED) {
            cell.status = CellStatus.WAITING
        }
    }

}

export {
    Judger
}