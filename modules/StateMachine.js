

const machine = {
    initial: "lit",
    states: {
      lit: {
        actions: {
          OFF: "unlit",
          BREAK: "broken",
        },
      },
      unlit: {
        actions: {
          ON: "lit",
          BREAK: "broken",
        },
      },
      begin: {
        actions: {
            ON: "lit",
            OFF: "unlit"
        }
      },
      broken: {},
    },
}


let move = [
    ["moving", "rest"],
    ["rest", "move"]
]

addState("move", [["rest","resting"],["run","running"]])
addState("rest", [["run","running"],["move","moving"]])
addState("run", [["rest","resting"],["move","moving"]])

const addState = (stateName, relations) =>{
    let relations = relations
    relations = relations.map((relation, index)=>{
        let node = toString(relation[0])
        let action = relation[1]
        return (
            {node: action}
        )
    })
    
}

const objectSkeleton  = {
    initial: "state1",
    states:{
        'begin':{
            actions:{
                action1: "state1",
                action2: "state2",
                action3: "state3"
            }
        },
        state1: {
            actions:{
                action1: "state2",
                action2: "state3"
            }
        },
        state2: {
            actions:{
                action1: "state1",
                action2: "state3"
            }
        },
        state3: {
            actions:{
                action1: "state1",
                action2: "state2"
            }
        }
    }
}

// Describes one node and their actions
// Do that for every node
// Set a initial node

export class StateMachine{
    constructor(objectTemplate){
        this.objectTemplate = objectTemplate
    }


    transition(current, to){
        const nextState = this.objectTemplate.states[current].actions?.[to]
        return nextState || current
    }
}


const machineTest = new StateMachine(objectSkeleton)  

let previusState = machineTest.transition('begin', 'action1')
console.log(previusState)



