import {SkuCode} from "./sku-code";

class Judger{

    fenceGroup
    pathDic = []

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this.initPathDic()
    }

    initPathDic(){
        this.fenceGroup.spu.sku_list.forEach(sku=>{
            const skuCode = new SkuCode(sku.code)

        })
    }

}

export {
    Judger
}