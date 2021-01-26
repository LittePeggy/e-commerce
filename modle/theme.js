import {config} from "../config/config";
import {Http} from "../utils/http";

class Theme {

    static locationA = "t-1"
    static locationE = "t-2"
    static locationF = "t-3"
    static locationH = "t-4"

    themes = []

    async getThemeAll(){
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
        const themes = await Http.request({
            url: `theme/by/names`,
            data: {
                names
            }
        })
        this.themes = themes
    }

    async getHomeLocationA(){
        return this.themes.find(t => t.name === Theme.locationA)
    }

    async getHomeLocationE(){
        return this.themes.find(t => t.name === Theme.locationE)
    }

    async getHomeLocationF(){
        return this.themes.find(t => t.name === Theme.locationF)
    }

    static getThememSpuList(name){
        return Http.request({
            url: `theme/name/${name}/with_spu`
        })
    }

    static getLocationESpuList(){
        return Theme.getThememSpuList(Theme.locationE)
    }
}

export {
    Theme
}