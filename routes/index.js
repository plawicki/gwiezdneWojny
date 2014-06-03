exports.login = function (req, res) {

    res.render('login');
}

exports.authorized = function (req, res) {
	var usr = req.user.username;
	console.log(usr);
	res.render('authorized', {user: usr, title: 'Gwiezdne Wojny'});
}