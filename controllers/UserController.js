const catchAsync = require('../utils/catchAsync');
const User = require('../Schemas/userSchema');

module.exports.signUp = catchAsync((req, res) => {
    res.render("pages/signUp")
});

module.exports.createUser = catchAsync(async (req, res, next) => {
        const{fname,lname, username, password} = req.body;
        const user = new User({fname: fname, lname: lname, username: username});
        const id = user.id;
        const registeredUser = await User.register(user, password)
        res.redirect(`/${id}/dashboard`)
});
module.exports.editUserForm = async (req,res) => {
    const {id} = req.params;
    const user = await User.findById(id)
    res.render('pages/edit', {user})
}
module.exports.editUser = catchAsync(async(req,res)=>{
    const {id} = req.params;
    const user = await User.findOneAndUpdate(id, req.body)
    await user.save()
    console.log(user)
})

module.exports.dashboard = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('pages/dashboard', { user });
});

module.exports.signIn = (req, res) => {
    res.render('pages/signIn')
};

module.exports.login = (req,res) => {
    res.redirect("/")
}
    


