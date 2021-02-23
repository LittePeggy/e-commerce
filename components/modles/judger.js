import {SkuCode} from "./sku-code";

class Judger{

    fenceGroup
    pathDic = []

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this.initPathDic()
    }

    initPathDic(){
        this.fenceGroup.spu.skuList.forEach(sku=>{
            const skuCode = new SkuCode(sku.code)

        })
    }

}

export {
    Judger
}