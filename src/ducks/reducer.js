const axios = require('axios');

const initialState = {
    view: "middle",
    questions: [],
    name: '',
    score: 0,
    highscores: []
}

const UPDATE_VIEW = "UPDATE_VIEW";
const GET_QUESTIONS = "GET_QUESTIONS";
const UPDATE_NAME = "UPDATE_NAME";
const GET_SCORES = "GET_SCORES";
const GET_USER_SCORE = "GET_USER_SCORE"

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

export function getUserScore(name){
    const request = axios.get(`/api/getuserscore/${name}`)
                    .then(response => {
                        console.log(response);
                        return response.data
                    })
    return {
        type: GET_USER_SCORE,
        payload: request
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
        case GET_SCORES + "_FULFILLED":
            return Object.assign({}, state, {highscores: action.payload})
        case GET_USER_SCORE + "_FULFILLED":
            return Object.assign({}, state, {score: action.payload})
        default:
            return state;
    }
}