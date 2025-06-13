function authenticate(req, res, next) {
  if (!req.session || !req.session.user) {
    console.warn('Unauthorized access attempt:', req.originalUrl);
    req.session.message = "No live session found. Please login again.";
    return res.status(401).json({ 
      success: false, 
      message: 'Session expired. Login Again bhjafdbhfhfhbfhsfdhsfda.', 
      redirect: '/login' 
    });
  }
  next();
}

export default authenticate;
