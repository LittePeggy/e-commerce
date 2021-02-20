class Matrix{
    m
    constructor(matrix) {
        this.m = matrix
    }

    get rowNum(){
        return this.m.length;
    }

    get colNum(){
        return this.m[0].length;
    }

    /**
     * 封装的目的：减少双层for循环的编写
     * @param cb
     */
    forEach(cb){
        for (let j = 0; j < this.colNum; j++) {
            for (let i = 0; i < this.rowNum; i++) {
                const element = this.m[i][j]
                // 生成器写法
                cb(element, i, j)
            }
        }
    }

    transpose(){
        const desArry = []
        for (let j = 0; j < this.colNum; j++){
            desArry[j] = []
            for(let i = 0; i < this.rowNum; i++){
                desArry[j][i] = this.m[i][j]
            }
        }
        return desArry
    }
}

export {
    Matrix
}