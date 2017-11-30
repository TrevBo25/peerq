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
    },
    help(req,res){
        console.log('het');
        const db = req.app.get('db');
        const {id} = req.body;
        db.help_question([id])
        .then(response => {
            res.status(200).send('helping!')
        }).catch( err => console.log('help', err))
    },
    remove(req, res){
        console.log('hut');
        const db = req.app.get('db');
        const {id} = req.body;
        db.delete_question([id])
        .then(response => {
            res.status(200).send('remove')
        }).catch( err => console.log('remove', err))
    }
}