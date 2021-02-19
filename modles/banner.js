import {Http} from "../utils/http";

class Banner{
    static bannerB = "b-1";
    static bannerG = "b-2";

    static async getLocationB(){
        return await Http.request({
            url: `banner/name/${Banner.bannerB}`
        })
    }

    static async getLocationG(){
        return await Http.request({
            url: `banner/name/${Banner.bannerG}`
        })
    }

}

export {
    Banner
}