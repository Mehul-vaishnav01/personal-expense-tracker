const express = require('express');
const expensecontroller=require('../controller/expense.controller')
const multer = require('multer');

const upload=multer({storage:multer.memoryStorage()})
const router=express.Router();

router.post('/add',upload.single("file"), expensecontroller.addexpense);
router.patch('/update/:id',upload.single("file"),expensecontroller.updateexpense)
router.delete('/delete/:id',expensecontroller.deleteExpense)

module.exports=router;