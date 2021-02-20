class Fence {

    specs
    valueTitle = []

    constructor(specs) {
        this.specs = specs
    }

    init(){
        this.specs.forEach(spec=>{
            this.pushVlueTitle(spec.value)
        })
    }

    pushVlueTitle(title){
        this.valueTitle.push(title)
    }



}

export {
    Fence
}