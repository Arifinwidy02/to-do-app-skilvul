const router = require('express').Router()
const todoController = require('../controllers/todoController')

router.get('/', (req, res) => {
    res.send('this is to-do-app by @giovannyptr')
})


router.get('/gettodo', todoController.getTask)
router.post('/addtodo', todoController.addTask)
router.get('/getactive', todoController.getActiveTask)
router.get('/getcomplete', todoController.getCompleteTask)
router.put('/edittask/:id', todoController.editTask)
router.delete('/task/:id', todoController.deleteTask)
router.put('/editstatus/:id', todoController.editStatus)


module.exports = router