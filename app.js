const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post('/', function(req,res) {
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us13.api.mailchimp.com/3.0/lists/02cbfa451f";
    const options = {
        method: "POST",
        auth: "ayushkanyal:33df72303985a8d03a6ad5ea62ecb47b-us13"
    }


    const request = https.request(url, options, function(response){

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    
    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})


// APi Key: 33df72303985a8d03a6ad5ea62ecb47b-us13
// Audience ID: 02cbfa451f