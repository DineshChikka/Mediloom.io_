function login(req, res){
  const {email,password} = req.body;
  //perform validation whether email and password are provided
  //in prod probably use joi or some other library
  if(!email || !password){
    return res.status(401).send('Both email and password are required!');
  }
  
  // check if the credentials are correct
  //....
  // assume that the credentials are correct
  
  req.session.clientId = "abcd123",
  req.session.myNum = 5;
  
  res.json('you are now logged in.');
};

export default {login};