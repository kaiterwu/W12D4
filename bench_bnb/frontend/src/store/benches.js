import csrfFetch from "./csrf";

const RECEIVE_BENCH = 'benches/receiveBench'
const RECEIVE_BENCHES = 'benches/receiveBenches'


export const receiveBench = bench =>({
    type: RECEIVE_BENCH,
    bench
})

export const receiveBenches = benches =>({
    type: RECEIVE_BENCHES,
    benches
})
//thunk actions
export const fetchBenches = ()=>async dispatch =>{
    const res = await csrfFetch('api/benches')

    if (res.ok){
       const benches = await res.json()
        dispatch(receiveBenches(benches))
    }
}

export const fetchBench = benchId =>async dispatch =>{
    const res = await csrfFetch(`api/benches/${benchId}`)

    if (res.ok){
       const bench = await res.json()
        dispatch(receiveBench(bench))
    }
}

export const createBench = bench =>async dispatch =>{
    const res = await csrfFetch(`api/benches/`,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },  
        body: JSON.stringify(bench)
    })

    if (res.ok){
       const bench = await res.json()
        dispatch(receiveBench(bench))
    }
}

const benchesReducer = (state = {},action)=>{
    switch(action.type){
        case RECEIVE_BENCHES:
            return {...action.benches}
        case RECEIVE_BENCH:
            return {...state,[action.bench.id]:action.bench}
        default: 
            return state 
    }
}

export default benchesReducer