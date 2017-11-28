const initialState = {
    view: "student"
}

const UPDATE_VIEW = "UPDATE_VIEW";

export function updateView(view){
    return {
        type: UPDATE_VIEW,
        payload: view
    }
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case UPDATE_VIEW:
            return Object.assign({}, state, {view: action.payload})
        default:
            return state;
    }
}