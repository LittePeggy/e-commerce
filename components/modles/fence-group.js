import {Matrix} from "./matrix";
import {Fence} from "./fence";

class FenceGroup{

    spu
    skuList = []
    fences = []

    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }

    initFences1(){
        const matrix = this._createMatrix(this.skuList)
        let fences = []
        let currentJ = -1
        matrix.each((element, i, j)=>{
            if (currentJ !== j){
                currentJ = j
                fences[j] = this._createFence()
            }
            fences[j].pushVlueTitle(element.value)
        })
        console.log(fences)
    }

    initFences(){
        const matrix = this._createMatrix(this.skuList)
        const AT = matrix.transpose()
        AT.forEach(r=>{
            const fence = new Fence(r)
            fence.init()
            this.fences.push(fence)
        })
    }

    getSkuByCode(skuCode){
        const fullCode = this.spu.id + "$" + skuCode
        const sku = this.spu.sku_list.find(s=>s.code === fullCode)
        return sku ? sku : null
    }

    getDefaultSku(){
        const defaultSkuId = this.spu.default_sku_id
        return this.skuList.find(s => s.id === defaultSkuId)
    }

    setCellStatusByXY(x, y, status){
        this.fences[x].cells[y].status = status
    }

    setCellStatusByCellId(cellId, status){
        this.eachCell((cell, i, j)=>{
            if (cell.id === cellId) {
                cell.status = status
            }
        })
    }

    eachCell(cb) {
        for (let i = 0; i < this.fences.length; i++) {
            for (let j = 0; j < this.fences[i].cells.length; j++) {
                const cell = this.fences[i].cells[j]
                cb(cell, i, j)
            }
        }
    }


    _createFence(){
        const fence = new Fence()
        return fence
    }

    _createMatrix(skuList){
        let m = []
        skuList.forEach(sku=>{
            m.push(sku.specs)
        })
        return new Matrix(m)
    }
}

export {
    FenceGroup
}