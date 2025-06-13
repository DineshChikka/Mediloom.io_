import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import profileController from '../controller/profile.js';
import * as userController from '../controller/mainController.js';
import authenticate from '../middleware/sessionActiveAuthenticate.js';

const router = express.Router();
import bodyParser from 'body-parser';
import { log } from 'console';
router.use(bodyParser.urlencoded({ extended: true }));


// Replicate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// router.post('/login', authController.login);

// all the routes after this middleware are protected and can only be accessed if the user is logged in.

// router.use(authenticate);
// router.get('/profile',profileController.profile);

// router.get('/', (req, res) => {
//   if (req.session.user) {
//     res.render('displayStuffPage.ejs', { user: req.session.user}); // Render EJS template with user details
//   } else {
//     res.render('displayStuffPage.ejs', { user: null }); // Render template with no user details
//   }
// });
//This route is used to diplay any sort of error.
// router.get('/errorDisplay',(req,res)=>{
//   const message = req.query.message || req.session.message || null;
//     req.session.message = null; // Clear the session message after use
//     res.render('errorDisplayPage.ejs', { message });
// })

// This route displays the registration page
// router.get('/registerPage',(req,res)=>{
//   const message = req.query.message || req.session.message || null;
//     req.session.message = null; // Clear the session message after use
//     res.render('register.ejs', { message });
// })

// This route displays the login page
// router.get('/loginPage',(req,res)=>{
//   // console.log(req.session);
//   const message = req.query.message || req.session.message || null;
//     req.session.message = null; // Clear the session message after use
//     res.render('login.ejs', { message });
// })

// router.get('/login', (req, res) => {
//   res.redirect('/login');
// });


// This route is used to give permission to doctor to access patient's files as soon as he (doctor) logs in.
// router.get('/doctorDocumentAccessPermission',authenticate,(req,res)=>{
//   if(req.session.role === "Doctor/Medical Professional"){
//   const message = req.query.message || req.session.message || null;
//     req.session.message = null; // Clear the session message after use
//   res.render('doctorAccessPermissionPage.ejs',{ message })
//   }
//   else{
//     res.status(403).send('Invalid Access'); // Return status code 403 and message
//   }
// });

// After a doctor logs in and gets permission from the patient, this route is used to display the doctor dashboard
// router.get('/doctorDashboard',authenticate,(req,res)=>{
//   if(req.session.role === "Doctor/Medical Professional"){
//     const message = req.query.message || req.session.message || null;
//       req.session.message = null;
//   res.render('doctorDashboardPage.ejs',{message})
//   }
//   else{
//     res.status(403).send('Invalid Access'); // Return status code 403 and message
//   }
// });

// After a hospital admin logs in, this route is used to display the hospital admin dashboard
// router.get('/adminDashboard', authenticate, (req,res)=>{
//   if(req.session.role === "Hospital Admin"){
//     const message = req.query.message || req.session.message || null;
//       req.session.message = null; // Clear the session message after use
//   res.render('adminDashboard.ejs',{ message });
//   }
//   else{
//     res.status(403).send('Invalid Access'); // Return status code 403 and message
//   }
// });

// router.post('/upload',authenticate, userController.uploadDocument);




// After a civilian logs in, this route is used to display the document access page
// router.get('/documentAccess', authenticate, (req, res) => {
//   if(req.session.role === "Civilian"){
//     const message = req.query.message || req.session.message || null;
//     req.session.message = null; // Clear the session message after use
//     res.render('documentAccessPage.ejs',{ message });
//   }
//   else{
//     res.status(403).send('Invalid Access'); // Return status code 403 and message
//   }
// });


router.get('/', (req, res) => {
  if (req.session.user) {
    res.render('displayStuffPage.ejs', { user: req.session.user}); // Render EJS template with user details
  } else {
    res.render('displayStuffPage.ejs', { user: null }); // Render template with no user details
  }
});


router.get('/login', (req, res) => {
  res.redirect('/login');
});

router.get('/profile',authenticate,userController.getProfile);

router.get('/status',userController.checkAuthStatus);

router.get('/documents/:fileId/view',authenticate,userController.documentFetch);

router.get("/documentsInfoFetch",authenticate,userController.documentsInfoFetch);


router.get("/hospital-doctors", authenticate, userController.getApprovedDoctors);

router.get('/hospital-resources', authenticate, userController.getHospitalResources);


router.post('/hospital-resources', authenticate, userController.saveOrUpdateHospitalResources);

router.post("/hospital-doctors", authenticate, userController.addApprovedDoctor);

const storage = multer.memoryStorage(); // Store files in memory for now
const upload = multer({ storage });

router.post('/upload',authenticate,upload.fields([{ name: 'prescriptionFiles', maxCount: 10 },{ name: 'testResultFiles', maxCount: 10 }]),userController.uploadDocument);

router.post('/logout', authenticate, userController.logoutUser);

router.post("/generate-otp",authenticate,userController.sendOtpMessage);

router.post("/verify-otp", authenticate,userController.verifyOtp);

router.post('/registerUser', userController.registerUser);

router.post('/loginUser', userController.loginUser);

router.post('/sendCustomTemplateMessage',authenticate, userController.sendCustomTemplateMessage);



router.delete("/hospital-doctors/:doc_id", authenticate, userController.deleteApprovedDoctor);


router.delete('/hospital-resources/:id', authenticate, userController.deleteHospitalResource);

export default router;