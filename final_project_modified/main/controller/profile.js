function profile(req,res){
  res.json(req.session);
};

export default {profile};