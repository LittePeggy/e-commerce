import {combination} from "../../utils/util";

class SkuCode{

    code
    spuId
    totalSegments = []

    constructor(code) {
        this.code = code
        this.splitToSegments()
    }

    splitToSegments(){
        const spuIdAndSeg = this.code.split("$")
        this.spuId = spuIdAndSeg[0]
        const specCodeArry = spuIdAndSeg[1].split("#")
        for (let i = 1; i <= specCodeArry.length; i++) {
            const segments = combination(specCodeArry, i)
            console.log(segments)
            this.totalSegments.push(segments)
        }
    }

}

export {
    SkuCode
}