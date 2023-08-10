const router = require('express').Router();


//TODO - add middleware for Guest accounts
router.post('/register', async (req,res) => {
try {
    if(req.body.password.trim() == '' || req.body.email.trim() == ''){
        throw new Error ('Email and password are required');
    }

    //TODO - create Register fn in services
    // const result = await register(req.body.username, req.body.email.trim().toLowerCase(),req.body.password.trim());
    // res.status(201).json(result);
} catch (err) {
    
}
});