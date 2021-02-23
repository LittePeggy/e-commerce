import {Cell} from './cell'

class Fence {

    specs
    cells = []

    constructor(specs) {
        this.specs = specs
    }

    init(){
        this.specs.forEach(spec=>{
            const cell = new Cell(spec)
            this.cells.push(cell)
        })
    }

    // pushVlueTitle(title){
    //     this.valueTitle.push(title)
    // }

}

export {
    Fence
}