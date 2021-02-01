import {Paging} from "../utils/paging";

class SpuPaging{

    static async getSpuPaging(){
        const paging = new Paging({
            url: `spu/latest`
        }, 3)

        return await paging.getMoreData();
    }
}

export {
    SpuPaging
}