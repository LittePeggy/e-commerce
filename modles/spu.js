import {Http} from "../utils/http";

class Spu{

    static async getSpuDetail(id) {
        return await Http.request({
            url: `spu/id/${id}/detail`
        })
    }

    static isNoSpece (spu) {
        if (spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0) {
            return true
        }
        return false
    }

}

export {
    Spu
}