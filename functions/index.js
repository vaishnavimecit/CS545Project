const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
var hbs = require('handlebars');
const admin = require('firebase-admin');

//import { doSocialSignIn } from "../firebaseFunc";

const app = express();
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine', 'hbs');


// //For local run
// var serviceAccount = require("./serviceAcc.json");
// admin.initializeApp({
// credential: admin.credential.cert(serviceAccount),
// databaseURL: "https://friendlychat1-vg.firebaseio.com"
// });

//For web hosting
admin.initializeApp(functions.config().firebase); 

async function getFirestore(){

    const firestore_con  = await admin.firestore();
    const writeResult = firestore_con.collection('form_data').doc('test').get()
    .then(doc => {
      if (!doc.exists) { console.log('No such document!'); }
      else {return doc.data();}})
    .catch(err => { console.log('Error getting document', err);});

    return writeResult

}

async function insertFormData(request){
  const writeResult = await admin.firestore().collection('form_data').add(
    {firstname: request.body.ques,
      lastname: request.body.ans
      }
    )
.then(function() {console.log("Document successfully written!");})
.catch(function(error) {console.error("Error writing document: ", error);});
}

async function insertLoginData(request){
  const writeResult1 = await admin.firestore().collection('login').add(
    {uname: request.body.uname,
      pwd: request.body.psw
      }
    )
.then(function() {console.log("Document successfully written!");})
.catch(function(error) {console.error("Error writing document: ", error);});
}

app.post('/insert_data',async (request,response) =>{
    var insert = await insertFormData(request);
    response.render('createquiz');
    response.sendStatus(200);
});

app.post('/action_page',async (request,response) =>{
    var insert = await insertLoginData(request);
    response.render('index');
    response.sendStatus(200);
});

app.get('/iconic',async (request,response) =>{
    response.render('IconicFood');
});
app.get('/classes',async (request,response) =>{
    response.render('OnlineClasses');
});
app.get('/outside',async (request,response) =>{
    response.render('OutsideInside');
});
app.get('/museum',async (request,response) =>{
    response.render('VirtualMuseums');
});

app.get('/createquiz',async (request,response) =>{
    var db_result = await getFirestore();
    response.render('createquiz',{
        db_result
    });
    response.render('createquiz');
});

app.get('/login',async (request,response) =>{
    // try {
    //   await doSocialSignIn(provider);
    // } catch (error) {}
    response.render('login');
//     return (
//     <div>
//       <img
//         onClick={() => socialSignOn("google")}
//         alt="google signin"
//         src="/imgs/btn_google_signin.png"
//       />
//     </div>
//   );
});

app.get('/faq',async (request,response) =>{
    response.render('FAQ');
});

app.get('/activities',async (request,response) =>{
    response.render('Activities');
});


app.get('/flash',async (request,response) =>{
    response.render('flash');
});

app.get('/', async (request, response) => {
    //var user_count = system.functions.processes("USER").length();
    response.render('index');
});

exports.app = functions.https.onRequest(app);