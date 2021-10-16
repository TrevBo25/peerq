const rewire = require("rewire")
const Mentor = rewire("./Mentor")
const mapStateToProps = Mentor.__get__("mapStateToProps")
// @ponicode
describe("mapStateToProps", () => {
    test("0", () => {
        let callFunction = () => {
            mapStateToProps({ questions: ["99577-0727", 107050, 75017], name: "George", score: 10.0, highscores: 1 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            mapStateToProps({ questions: ["09498-0048", "99577-0727", "99577-0727"], name: "Anas", score: -29.45, highscores: 100 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            mapStateToProps({ questions: ["99577-0727", "99577-0727", "99577-0727"], name: "Edmond", score: 0.0, highscores: -5.48 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            mapStateToProps({ questions: [107050, 107050, "09498-0048"], name: "George", score: -0.5, highscores: -100 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            mapStateToProps({ questions: [75017, "09498-0048", "09498-0048"], name: "Anas", score: 0.0, highscores: -100 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            mapStateToProps(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
