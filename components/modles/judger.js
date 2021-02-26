import {SkuCode} from "./sku-code";
import {SkuPadding} from "./sku-padding";
import {CellStatus} from '../../core/enum'
import {Joiner} from '../../utils/joiner'

class Judger{

    fenceGroup
    pathDic = []
    skuPadding

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this._initPathDic()
    }

    _initSkuPadding(){
        this.skuPadding = new SkuPadding()
    }

    _initPathDic(){
        this.fenceGroup.spu.sku_list.forEach(sku=>{
            const skuCode = new SkuCode(sku.code)
            this.pathDic.concat(skuCode.totalSegments)
        })
    }

    judger(cell){
        this._changeCurrentCellStatus(cell)
        this.fenceGroup.eachCell((cell, x, y)=>{
            const path = this._findPotentialPath(cell, x, y)
            console.log(path)
        })
    }

    _findPotentialPath(cell, x, y){
        const joiner = new Joiner()
        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            const selected = this.skuPadding.findSelectedCellByX(i)
            if (x === i) {
                // 当前行
                const cellCode = this._getCellCode(cell.spec)
                joiner.join(cellCode)
            } else {
                if (selected) {
                    const selectedCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCode)
                }
            }
        }
        return joiner.getStr()
    }

    _getCellCode(spec){
        return spec.key_id + "-" + spec.value_id
    }

    _changeCurrentCellStatus({cell, x, y}){
        if (cell.status === CellStatus.WAITING) {
            this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED
            this.skuPadding.insertCell(cell, x)
        }

        if (cell.status === CellStatus.SELECTED) {
            this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
            this.skuPadding.removeCell(x)
        }
    }

}

export {
    Judger
}