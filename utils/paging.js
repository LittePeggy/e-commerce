import {Http} from "./http";

class Paging{

    url
    count
    start
    locker = false
    req
    moreData = true
    accumulator

    constructor(req, count = 10, start = 0){
        this.req = req
        this.count = count
        this.start = start
        this.url = req.url
    }

    /**
     * 获取下一页数据
     */
    async getMoreData(){
        // 判断是否有下一页
        if (!this.moreData){
            return
        }
        // 判断上一个请求是否结束
        if(!this.getLocker()){
            return
        }
        // request
        const data = await this.getActualMoreData()
        // 释放锁
        this.releaseLocker()
        return data;
    }

    async getActualMoreData(){
        let req = this.getCurrentreq()
        let paging = await Http.request(req)
        if(!paging){
            return null;
        }
        if (paging.total === 0){
            return {
                empty: true,
                items: [],
                moreData: false,
                accumulator: []
            };
        }
        this.moreData = Paging._moreData(paging.total_page, paging.page)
        if (this.moreData){
            // 分页计算
            this.start = this.start + this.count
        }
        this._accumulat(paging.items)
        return {
            empty: false,
            items: paging.items,
            moreData: this.moreData,
            accumulator: this.accumulator
        }
    }

    _accumulat(items){
        this.accumulator.concat(items)
    }

    static _moreData(totailPage, pageNum){
        return pageNum < totailPage - 1
    }

    getCurrentreq(){
        let url = this.url
        let param = `start=${this.start}&count=${this.count}`
        if (url.indexOf('?')){
            url += "&" + param
        } else {
            url += "?" + param
        }
        this.req.url = url
        return this.req
    }

    /**
     * 获取锁的状态
     * @returns {boolean}
     */
    getLocker(){
        if(this.locker){
            return false
        }
        this.locker = true
        return true
    }

    /**
     * 释放锁
     */
    releaseLocker(){
        this.locker = false
    }

}

export {
    Paging
}