const axios = require('axios');

const initialState = {
    view: "middle",
    questions: [],
    tname: '',
    score: 0,
    highscores: []
}

const UPDATE_VIEW = "UPDATE_VIEW";
const GET_QUESTIONS = "GET_QUESTIONS";
const UPDATE_NAME = "UPDATE_NAME";
const UPDATE_SCORE = "UPDATE_SCORE";
const GET_SCORES = "GET_SCORES";

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

export function getScores(){
    const request = axios.get('/api/highscores')
                    .then(response => {
                        return response.data
                    }).catch(err => console.log('err getscores', err))

    return {
        type: GET_SCORES,
        payload: request
    }
}

export function updateName(name){
    return {
        type: UPDATE_NAME,
        payload: name
    }
}

export function updateScore(score){
    return {
        type: UPDATE_SCORE,
        payload: score
    }
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case UPDATE_VIEW:
            return Object.assign({}, state, {view: action.payload})
        case GET_QUESTIONS + "_FULFILLED":
            return Object.assign({}, state, {questions: action.payload})
        case UPDATE_NAME:
            return Object.assign({}, state, {tname: action.payload})
        case UPDATE_SCORE:
            return Object.assign({}, state, {score: action.payload})
        case GET_SCORES + "_FULFILLED":
            return Object.assign({}, state, {highscores: action.payload})
        default:
            return state;
    }
}