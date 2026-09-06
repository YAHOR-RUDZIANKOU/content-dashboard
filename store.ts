const store ={
    state: 0,

    increment() {
        this.state++;
    },
    decrement() {
        this.state--;
    }
}

export function dispatch(action: { type: "increment" | "decrement" }) {
    if(action.type === "increment") {
        store.increment();
    } else if(action.type === "decrement") {
        store.decrement();
    }
}

export const ationIncrement = {
    type: "increment",
}

export const ationDecrement = {
    type: "decrement",
}


