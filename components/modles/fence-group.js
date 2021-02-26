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