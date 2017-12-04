const axios = require('axios');

const initialState = {
    view: "middle",
    questions: [],
    name: ''
}

const UPDATE_VIEW = "UPDATE_VIEW";
const GET_QUESTIONS = "GET_QUESTIONS";
const UPDATE_NAME = "UPDATE_NAME"

export function updateView(view){
    return {
        type: UPDATE_VIEW,
        payload: view
    }
}

export function getQuestions(){
    const request = axios.get('/api/getquestions')
                    .then(response => {
                        return response.data
                    }).catch(err => console.log('err getquestions', err))
    return {
        type: GET_QUESTIONS,
        payload: request
    }

}

export function updateName(name){
    return {
        type: UPDATE_NAME,
        payload: name
    }
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case UPDATE_VIEW:
            return Object.assign({}, state, {view: action.payload})
        case GET_QUESTIONS + "_FULFILLED":
            return Object.assign({}, state, {questions: action.payload})
        case UPDATE_NAME:
            return Object.assign({}, state, {name: action.payload})
        default:
            return state;
    }
}