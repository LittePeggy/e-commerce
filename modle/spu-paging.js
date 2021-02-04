import {Paging} from "../utils/paging";

class SpuPaging{

    static getSpuPaging(){
        return new Paging({
            url: `spu/latest`
        }, 3)
    }
}

export {
    SpuPaging
}