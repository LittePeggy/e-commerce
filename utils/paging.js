import {Http} from "./http";

class Paging{

    url
    count
    start
    locker = false
    req
    moreData = true

    constructor(req, count = 10, start = 0){
        this.req = req
        this.count = count
        this.start = start
        this.url = req.url
    }

    /**
     * 获取下一页数据
     */
    getMoreData(){
        // 判断上一个请求是否结束
        if(!this.getLocker()){
            return
        }
        // request
        this.getActualMoreData()
        // 释放锁
        this.releaseLocker()
    }

    getActualMoreData(){
        let req = this.getCurrentreq()
        let paging = Http.request(req)
        if(!paging){
            return null;
        }
        if (paging.total === 0){
            return {
                items: [],
                moreData: false
            };
        }
        if (paging.page < paging.total_page - 1){
            // 分页计算
            this.countPaging()
        } else {
            this.moreData = false
        }
        return {
            items: paging.items,
            moreData: this.moreData
        }
    }

    countPaging(){
        this.start = this.start + this.count
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