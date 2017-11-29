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
    console.log('getquestions');
    const request = axios.get('/api/getquestions')
                    .then(response => {
                        console.log(response.data)
                        return response.data
                    }).catch(err => console.log('err getquestions', err))
    return {
        type: GET_QUESTIONS,
        payload: request
    }

}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case UPDATE_VIEW:
            return Object.assign({}, state, {view: action.payload})
        case GET_QUESTIONS + "_FULFILLED":
            return Object.assign({}, state, {questions: action.payload})
        default:
            return state;
    }
}