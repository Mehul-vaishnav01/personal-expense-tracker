const expensemodel=require('../model/expense.model');
const {uploadfile}=require('../service/storage.services');

async function addexpense(req,res) {
    try{

        const {title,amount,category}=req.body;
        const file=req.file;
    
        const result=await uploadfile(file.buffer.toString('base64'));
    
        const addedexpanse=await expensemodel.create({
            title,
            category,
            amount,
            uri:result.url,
            user: req.user.id
        })
    
        res.status(201).json({
            message:"Expense added sucessfully",
            addedexpanse,
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

async function updateexpense(req,res) 
{

    try
    {
        const {id}=req.params;
        const newExpense = req.body ; //new updated expense 

        

        if (req.file) {
            const result = await uploadfile(req.file.buffer.toString('base64'));
            newExpense.uri = result.uri ;
        }


        const updated = await expensemodel.findByIdAndUpdate( id , newExpense , {new : true}  ) ;
        

       res.status(200).json({
        message:"Updated Successfully" ,
        updated,
            })
    }
    catch(err)
    {
        res.status(400).json({
            message:"There was an error updating the Expense",err ,
        })
    }
}
    
async function deleteExpense(req,res){
    const {id}=req.params;

    const deleted=await expensemodel.findByIdAndDelete(id);
    res.status(200).json({message:"Expance deleted sucessfully",
        deleted,

    });

}

async function getexpenses(req,res) {
    try{
        const expenses=await expensemodel.find({
            user:req.user.id
        }).sort({date:-1});

        res.status(200).json({
            expenses
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
async function getexpense(req, res) {

    try {

        const { id } = req.params;

        const expense = await expensemodel.findOne({
            _id: id,
            user: req.user.id
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            message: "Expense fetched successfully",
            expense
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
}


module.exports={addexpense,updateexpense,deleteExpense,getexpenses,getexpense}