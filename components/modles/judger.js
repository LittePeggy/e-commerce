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
        this._initSkuPadding()
    }

    _initSkuPadding(){
        const spceLength = this.fenceGroup.fences.length
        this.skuPadding = new SkuPadding(spceLength)
        const defaultSku = this.fenceGroup.getDefaultSku()
        if (!defaultSku) {
            return
        }
        this.skuPadding.init(defaultSku)
        this.skuPadding.padding.forEach(c=>{
            this.fenceGroup.setCellStatusByCellId(c.id, CellStatus.SELECTED)
        })
        this.judger(null, null, null, true)
    }

    _initPathDic(){
        this.fenceGroup.spu.sku_list.forEach(sku=>{
            const skuCode = new SkuCode(sku.code)
            this.pathDic = this.pathDic.concat(skuCode.totalSegments)
        })
    }

    judger(cell, row, col, isInit=false){
        if (!isInit) {
            this._changeCurrentCellStatus(cell, row, col)
        }
        this.fenceGroup.eachCell((cell, x, y)=>{
            const path = this._findPotentialPath(cell, x, y)
            if (!path) {
                return
            }
            if (this._isInDict(path)) {
                this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING)
            } else {
                this.fenceGroup.setCellStatusByXY(x, y, CellStatus.FORBIDDEN)
            }
        })
    }

    _isInDict(path){
        return this.pathDic.includes(path)
    }

    _findPotentialPath(cell, x, y){
        const joiner = new Joiner("#")
        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            const selected = this.skuPadding.findSelectedCellByX(i)
            if (x === i) {
                // 当前行
                if ( this.skuPadding.isSelected(cell, i) ) {
                    return null
                }
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

    _changeCurrentCellStatus(cell, x, y){
        if (cell.status === CellStatus.WAITING) {
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.SELECTED)
            this.skuPadding.insertCell(cell, x)
        }
        else if (cell.status === CellStatus.SELECTED) {
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING)
            this.skuPadding.removeCell(x)
        }
    }

    isSkuIntact () {
        return this.skuPadding.isIntact()
    }

    getDeterminateSku(){
        const skuCode = this.skuPadding.getSkuCode();
        const sku = this.fenceGroup.getSkuByCode(skuCode);
        return sku
    }

    getCurrentValues(){
        return this.skuPadding.getCurrentSpecValues()
    }

    getMissingKeysTitle() {
        const missingKeysIndex = this.skuPadding.getMissingSpeckeysIndex()
        return missingKeysIndex.map(i=>{
            return this.fenceGroup.fences[i].title
        })
    }
}

export {
    Judger
}