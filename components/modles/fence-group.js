import {Matrix} from "./matrix";

class FenceGroup{

    skuList

    constructor(skuList) {
        this.skuList = skuList
    }

    _createMatrix(){
        let matrix = []
        this.skuList.forEach(sku=>{
            matrix.push(sku.specs)
        })
        return new Matrix(matrix)
    }
}

export {
    FenceGroup
}