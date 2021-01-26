import {Http} from "../utils/http";

class Category{
    static async getLoncationC(){
        return await Http.request({
            url: "category/grid/all"
        })
    }
}

export {
    Category
}