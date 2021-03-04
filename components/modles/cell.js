import {CellStatus} from '../../core/enum'

class Cell{
    id
    title
    status = CellStatus.WAITING
    spec

    constructor(spec) {
        this.id = spec.value_id
        this.title = spec.value
        this.spec = spec
    }

    getCellCode(){
        return this.spec.key_id + "-" + this.spec.value_id
    }

}

export {
    Cell
}