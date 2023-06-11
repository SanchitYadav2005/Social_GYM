const catchAsync = require('../utils/catchAsync');
const User = require('../Schemas/userSchema');

module.exports.signUp = catchAsync((req, res) => {
    res.render("pages/signUp")
});

module.exports.createUser = catchAsync(async (req, res, next) => {
        res.send(req.body)
});

module.exports.dashboard = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('pages/dashboard', { user });
});

module.exports.signIn = (req, res) => {
    res.render('pages/signIn')
};

module.exports.loginUser = (req,res) => {
    res.send(req.body)
}
    


