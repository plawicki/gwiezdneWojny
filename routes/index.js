exports.login = function (req, res) {

    res.render('login');
}

exports.authorized = function (req, res) {
	var usr = req.user.username;
	var type = req.body.type;
	res.render('authorized', {user: usr, title: 'Gwiezdne Wojny', type: type});
}