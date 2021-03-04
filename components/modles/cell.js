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
        return spec.key_id + "-" + spec.value_id
    }

}

export {
    Cell
}