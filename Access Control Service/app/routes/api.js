var User = require('../models/users'); // User List
var ACL = require('../models/access'); // (Group,Role) permissions of CRUD of the metadata type 
var Role = require('../models/role'); //(Group,Role) Id a User belongs to
var Group = require('../models/group'); //Mapping of (Group, Role) to an ID
var jwt = require('jsonwebtoken'); // Import JWT Package
var secret = 'ReallyDifficultToBruteforceSecret'; // Create custom secret for use in JWT

module.exports = function (router) {

    router.post('/add/group', function (req, res) {
        console.log(req.body);
        var group = new Group();

        group.groupName = req.body.groupName;
        group.role = req.body.role;

        group.save(function (err) {
            if (err) {
                res.json({ success: false, message: err }); // Display any other errors with validation
            } else {
                res.json({ success: true, message: 'Success' });
            }
        });
    });

    router.get('/groups', function (req, res) {
        Group.find({}).exec(function (err, groups) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!'
                });
            } else if (!groups) {
                res.json({
                    success: false,
                    message: 'Groups not found'
                }); // Return error
            } else {
                res.json({
                    success: true,
                    groups: groups
                }); // Return users, along with current user's permission
            }
        });
    });

    //
    router.post('/add/acl', function (req, res) {
        console.log(req.body); {
            var acl = new ACL();
            acl.groupRoleId = req.body.groupRoleId;
            acl.itemType = req.body.itemType;
            acl.create = req.body.create;
            acl.read = req.body.read;
            acl.update = req.body.update;
            acl.delete = req.body.delete;
            acl.save(function (err) {
                if (err) {
                    res.json({ success: false, message: err }); // Display any other errors with validation
                } else {
                    res.json({ success: true, message: 'Success' });
                }
            });
        }
    });

    //USER REGISTRATION ROUTE
    router.post('/register', function (req, res) {
        console.log(req.body);
        var user = new User(); // Create new User object
        user.username = req.body.username; // Save username from request to User object
        user.password = req.body.password; // Save password from request to User object
        user.name = req.body.name; // Save name from request to User object

        // Check if request is valid and not empty or null
        if (req.body.username === null || req.body.username === '' || req.body.password === null || req.body.password === '' || req.body.name === null || req.body.name === '') {
            res.json({ success: false, message: 'Ensure username, email, and password were provided' });
        } else {
            // Save new user to database
            user.save(function (err) {
                if (err) {
                    // Check if any validation errors exists (from user model)
                    if (err.errors !== null) {
                        if (err.errors.name) {
                            res.json({ success: false, message: err.errors.name.message }); // Display error in validation (name)
                        } else if (err.errors.username) {
                            res.json({ success: false, message: err.errors.username.message }); // Display error in validation (username)
                        } else if (err.errors.password) {
                            res.json({ success: false, message: err.errors.password.message }); // Display error in validation (password)
                        } else {
                            res.json({ success: false, message: err }); // Display any other errors with validation
                        }
                    } else if (err) {
                        // Check if duplication error exists
                        if (err.code == 11000) {
                            if (err.errmsg[61] == "u") {
                                res.json({ success: false, message: 'That username is already taken' }); // Display error if username already taken
                            } else if (err.errmsg[61] == "e") {
                                res.json({ success: false, message: 'That e-mail is already taken' }); // Display error if e-mail already taken
                            }
                        } else {
                            res.json({ success: false, message: err }); // Display any other error
                        }
                    }
                } else {
                    // Create e-mail object to send to user
                    User.findOne({
                        username: req.body.username
                    }).select('_id').exec(function (err, user) {
                        var userId = user._id;
                        if (err) {
                            res.json({ success: false, message: err }); // Display any other errors with validation
                        } else {
                            let groupRoles = req.body.groupRolesId;
                            groupRoles.forEach(function (groupRole) { groupRole.userId = userId; });
                            Role.collection.insert(groupRoles, function (err) {
                                if (err) {
                                    res.json({ success: false, message: err }); // Display any other errors with validation
                                } else {
                                    res.json({ success: true, message: 'Account registered! ' }); // Send success message back to controller/request
                                }
                            });
                        }
                    });
                }
            });
        }
    });


    //USER AUTHENTICATE 
    router.post('/authenticate', function (req, res) {
        //find the user from the Users List
        User.findOne({
            username: req.body.username
        }).select('name username password').exec(function (err, user) {
            if (err) throw err; 
            //check if user exists then return unsuccessful
            if (!user) {
                res.json({
                    success: false,
                    message: 'Could not authenticate user'
                });
            } else if (user) { //if user exists then perform the following function
                //if password is provided
                if (req.body.password) {
                    //compare "this" password with the password stored in DB 
                    var validPassword = user.comparePassword(req.body.password);
                    //if password is not valid then return Incorrect Password
                    if (!validPassword) {
                        res.json({
                            success: false,
                            message: 'Incorrect Password'
                        });
                    } else {
                        //if password is valid then make user token
                        var token = jwt.sign({
                            _id: user._id, //encode user id and username
                            username: user.username
                        }, secret, {
                                expiresIn: '24h'
                            });
                        //send successful and also the user access token
                        res.json({
                            success: true,
                            message: 'Successful login',
                            token: token
                        });
                    }
                } else {
                    //if password doesn't exist then return No Password provided
                    res.json({
                        success: false,
                        message: 'No Password provided'
                    });
                }

            }
        });
    });

    // Middleware for Routes that checks for token
    router.use(function (req, res, next) {
        // Check for token in body, URL, or headers
        var token = req.body.token || req.body.query || req.headers['x-access-token']; 
        // Check if token is valid and not expired  
        if (token) {
            // Function to verify token
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    // Token has expired or is invalid
                    res.json({ success: false, message: 'Token invalid' }); 
                } else {
                    // Assign to req. variable to be able to use it in next() route ('/me' route)
                    req.decoded = decoded; 
                    next(); // Required to leave middleware
                }
            });
        } else {
            // Return error if no token was provided in the request
            res.json({ success: false, message: 'No token provided' }); 
        }
    });

    // Route to get the currently logged in user    
    router.get('/me', function (req, res) {
        res.send(req.decoded); // Return the token acquired from middleware
    });

//USER AUTHORIZATION
router.post('/authorize', async (req, res) => {
	//get item type, request, and user ID
	var itemType = req.body.itemType;
	var request = req.body.request;
	var userId = req.decoded._id;
	var validRequest = true;
	//check if the request is valid
	if (request === 'create' || request === 'update' || request === 'read' || request === 'delete') {
		validRequest = true;
	}
	//if invalid request then send invalid action
	if (!validRequest) {
		res.json({
			success: false,
			message: 'Action is invaid on the specified Metadata Item'
		});
	} else {
		//find the groups and roles to which the user belongs
		try {
			const groups = await Role.find({
				userId: userId
			});
			//if the user has no group then return invalid user id
			if (!groups) {
				res.json({
					success: false,
					message: 'UserID is invalid'
				});
			} else {
				//for each group and role DO
				var flag = false;
				
				for (let i = 0; i < groups.length; i++) {
					const group = groups[i];
					//check the permission of that request for the given group and role
					const result = await ACL.findOne({
						itemType: itemType,
						groupRoleId: group.groupRoleId
					}).select(request);
					
					//Perform an OR operation with all the groups and roles
					//if any one group,role has access then the user will be granted access
					if(result != null){
						if (request === 'create') {
							flag = flag || result.create;
						} else if (request === 'read') {
							flag = flag || result.read;
						} else if (request === 'update') {
							flag = flag || result.update;
						} else if (request === 'delete') {
							flag = flag || result.delete;
						} else {
							flag = false;
						}
					}
				}
				//return the response
				//if access is true
				if (flag) {
					res.json({
						success: true,
						message: 'Authorized to access'
					});
				} else {
					//if access is false
					res.json({
						success: false,
						message: 'Unauthorized to perform that action on the specified Metadata'
					});
				}
			}
		} catch (error) {
			console.log(error);
		}
	}
})

    return router;
};