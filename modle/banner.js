import {Http} from "../utils/http";

class Banner{
    static bannerB = "b-1";
    static async getLocationB(){
        return await Http.request({
            url: `banner/name/${Banner.bannerB}`
        })
    }
}

export {
    Banner
}