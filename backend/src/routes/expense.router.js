const express = require('express');
const expensecontroller=require('../controller/expense.controller')
const multer = require('multer');
const auth = require('../middleware/auth.middleware');

const upload=multer({storage:multer.memoryStorage()})
const router=express.Router();

router.post('/add',auth,upload.single("file"), expensecontroller.addexpense);
router.patch('/update/:id',auth,upload.single("file"),expensecontroller.updateexpense)
router.delete('/delete/:id',auth,expensecontroller.deleteExpense)
router.get('/',auth,expensecontroller.getexpenses)
router.get('/:id',auth,expensecontroller.getexpense)


module.exports=router;