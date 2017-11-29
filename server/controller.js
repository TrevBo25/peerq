module.exports = {
    addQuestion(req, res){
        console.log('hit');
        const db = req.app.get('db');
        const { name, question} = req.body;
        db.add_question([name, question])
        .then( response => {
            res.status(200).send("Question submitted");
        }).catch( err => console.log('addquestion', err));
    },
    getQuestions(req, res){
        console.log('hot');
        const db = req.app.get('db');
        db.get_questions()
        .then(response => {
            res.status(200).json(response)
        }).catch( err => console.log('err getquestions', err))
    }
}