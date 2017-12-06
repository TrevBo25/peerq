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
        const {id, mname} = req.body;
        db.help_question([id, mname])
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
    },
    getHighscores(req, res){
        const db = req.app.get('db');
        db.get_scores()
        .then(response => {
            res.status(200).json(response);
        }).catch(err => console.log('gethighscores', err))
    },
    updateScore(req, res){
        const db = req.app.get('db');
        const {name} = req.body;
        console.log(name);
        db.check_score([name])
        .then(response => {
            if(response.length > 0){
                var newScore = response.score + 1;
                db.update_score([name, newScore])
                .then(response => {
                    res.status(200).send('successfully updated the score')
                }).catch(err => console.log(err, 'updatescore'))
            } else {
                db.create_score([name, 1])
                .then( response => {
                    res.status(200).send('successfully created user in hs')
                }).catch(err => console.log(err, 'createscore'))
            }
        })
    },
    getUserScore(req, res){

    }
}