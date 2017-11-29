const axios = require('axios');

const initialState = {
    view: "middle",
    questions: []
}

const UPDATE_VIEW = "UPDATE_VIEW";
const GET_QUESTIONS = "GET_QUESTIONS";

export function updateView(view){
    return {
        type: UPDATE_VIEW,
        payload: view
    }
}

export function getQuestions(){
    const request = axios.get('/api/questions')
                    .then(response => {
                        console.log(response.data)
                    })
    return {
        type: GET_QUESTIONS,
        payload: request
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