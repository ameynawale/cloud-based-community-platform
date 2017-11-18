var ejs = require("ejs");
var mysql = require('./mysql');


function signin(req,res) {

	ejs.renderFile('./views/signin1.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}

function signup(req,res) {

    ejs.renderFile('./views/SignUp.ejs',function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
}

function afterCreateCommunity(req,res) {

    var postUser="insert into communities (community,purpose,status) values ('"+req.param("community")+"','"+req.param("purpose")+"',1) where username='"+req.param("username")+"'";
    console.log("Query is:"+postUser);

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            ejs.renderFile('./views/FirstComReq.ejs', { data: results } , function(err, result) {
                // render on success
                if (!err) {
                    res.end(result);
                }
                // render or error
                else {
                    res.end('An error occurred');
                    console.log(err);
                }
            });
        }
    },postUser);
}


function afterSignIn(req,res)
{
	// check user already exists
	var getUser="select * from communities where username='"+req.param("inputUsername")+"' and password='" + req.param("inputPassword") +"'";
	console.log("Query is:"+getUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login");
				if(results[0].isSuperAdmin)
				{
                    ejs.renderFile('./views/SAhomepage.ejs', {data: results}, function (err, result) {
                        // render on success
                        if (!err) {
                            res.end(result);
                        }
                        // render or error
                        else {
                            res.end('An error occurred');
                            console.log(err);
                        }
                    });
                }
                else
                {
                    if(results[0].status === 2)
                    {
                        ejs.renderFile('./views/GAComReqSent.ejs', {data: results}, function (err, result) {
                            // render on success
                            if (!err) {
                                res.end(result);
                            }
                            // render or error
                            else {
                                res.end('An error occurred');
                                console.log(err);
                            }
                        });
                    }
                    else
                    {
                        ejs.renderFile('./views/GAComActivated.ejs', {data: results}, function (err, result) {
                            // render on success
                            if (!err) {
                                res.end(result);
                            }
                            // render or error
                            else {
                                res.end('An error occurred');
                                console.log(err);
                            }
                        });
                    }
                }
			}
			else {    
				
				console.log("Invalid Login");
				ejs.renderFile('./views/failLogin.ejs',function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
		}  
	},getUser);
}


function getCommunities(req,res)
{
    var getCommunityList="select community,contact from communities";
    console.log("Query is:"+getCommunityList);

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length > 0){
                ejs.renderFile('./views/newhomepage.ejs', { data: results } , function(err, result) {
                    // render on success
                    if (!err) {
                        res.end(result);
                    }
                    // render or error
                    else {
                        res.end('An error occurred');
                        console.log(err);
                    }
                });
            }
            else {

                ejs.renderFile('./views/failLogin.ejs',function(err, result) {
                    // render on success
                    if (!err) {
                        res.end(result);
                    }
                    // render or error
                    else {
                        res.end('An error occurred');
                        console.log(err);
                    }
                });
            }
        }
    },getCommunityList);
}

function activateCommunity(req,res)
{
    var getCommunityList="select community,purpose from communities where status=2";
    console.log("Query is:"+getCommunityList);

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length > 0){
                ejs.renderFile('./views/ActivateCommunity.ejs', { data: results } , function(err, result) {
                    // render on success
                    if (!err) {
                        res.end(result);
                    }
                    // render or error
                    else {
                        res.end('An error occurred');
                        console.log(err);
                    }
                });
            }
            else {

                ejs.renderFile('./views/failLogin.ejs',function(err, result) {
                    // render on success
                    if (!err) {
                        res.end(result);
                    }
                    // render or error
                    else {
                        res.end('An error occurred');
                        console.log(err);
                    }
                });
            }
        }
    },getCommunityList);
}


function afterSignUp(req,res)
{
	// check user already exists
	var postUser="insert into communities (firstname,lastname,username,password,contact,isSuperAdmin,community,purpose,status) values ('"+req.param("firstname")+"','"+req.param("lastname")+"','"+req.param("inputUsername")+"','"+req.param("inputPassword")+"','"+req.param("contact")+"',0,'"+req.param("community")+"','"+req.param("purpose")+"',2)";
	console.log("Query is:"+postUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			/*mysql.fetchData(function (err, results) {
				if(err){
					throw err;
				}
				else{*/
                    ejs.renderFile('./views/FirstComReq.ejs', { data: results } , function(err, result) {
                        // render on success
                        if (!err) {
                            res.end(result);
                        }
                        // render or error
                        else {
                            res.end('An error occurred');
                            console.log(err);
                        }
				})
		/*		}}
            ,"select username from communities where username='"+req.param("inputUsername")+"'")
		}*/
	}},postUser);
}

function activatedSuccessfully(req,res)
{
    // check user already exists
    var postUser="update communities set status=1 where community='"+req.param("community")+"'";
    console.log("Query is:"+postUser);

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            /*mysql.fetchData(function (err, results) {
                if(err){
                    throw err;
                }
                else{*/
            ejs.renderFile('./views/CommunityActivated.ejs', { data: results } , function(err, result) {
                // render on success
                if (!err) {
                    res.end(result);
                }
                // render or error
                else {
                    res.end('An error occurred');
                    console.log(err);
                }
            })
            /*		}}
                ,"select username from communities where username='"+req.param("inputUsername")+"'")
            }*/
        }},postUser);
}

function getAllUsers(req,res)
{
	var getAllUsers = "select * from users";
	console.log("Query is:"+getAllUsers);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				
				var rows = results;
				var jsonString = JSON.stringify(results);
				var jsonParse = JSON.parse(jsonString);
				
				console.log("Results Type: "+(typeof results));
				console.log("Result Element Type:"+(typeof rows[0].emailid));
				console.log("Results Stringify Type:"+(typeof jsonString));
				console.log("Results Parse Type:"+(typeof jsString));
				
				console.log("Results: "+(results));
				console.log("Result Element:"+(rows[0].emailid));
				console.log("Results Stringify:"+(jsonString));
				console.log("Results Parse:"+(jsonParse));
				
				ejs.renderFile('./views/successLogin.ejs',{data:jsonParse},function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
			else {    
				
				console.log("No users found in database");
				ejs.renderFile('./views/failLogin.ejs',function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
		}  
	},getAllUsers);
}

exports.signin=signin;
exports.signup=signup;
exports.afterSignIn=afterSignIn;
exports.getAllUsers=getAllUsers;
exports.afterSignUp=afterSignUp;
exports.afterCreateCommunity=afterCreateCommunity;
exports.activatedSuccessfully=activatedSuccessfully;
exports.getCommunities=getCommunities;
exports.activateCommunity=activateCommunity;