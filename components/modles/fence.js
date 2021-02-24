import {Cell} from './cell'

class Fence {

    specs
    cells = []
    title
    id

    constructor(specs) {
        this.specs = specs
        this.title = specs[0].key
        this.id = specs[0].key_id
        this.init()
    }

    init(){
       this._initCells()
    }

    _initCells(){
        this.specs.forEach(spec=>{
            if (this.isExistedCell(spec)) {
                return
            }
            const cell = new Cell(spec)
            this.cells.push(cell)
        })
    }

    isExistedCell(spec){
        return this.cells.some(c=>{
           return c.id === spec.value_id
        })
    }

    // pushVlueTitle(title){
    //     this.valueTitle.push(title)
    // }

}

export {
    Fence
}