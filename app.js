const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log(req.body.fname);

  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME: lname,
      },
    }]
  };

  

  var jsonData = JSON.stringify(data);

  

  //7c0be5c90399dcbe93eeed14cb82a357-us11
  // cb2e5f3e54

  const url = "https://us11.api.mailchimp.com/3.0/lists/cb2e5f3e54";

  const options = {
    method: "POST",
    auth: "hammed:7c0be5c90399dcbe93eeed14cb82a357-us11"
  };

  const request = https.request(url, options, function (response) {
     
    if( response.statusCode === 200 )
      {
          res.sendFile(__dirname+"/success.html");
      }
      else
      {
          res.sendFile(__dirname+"/failure.html");
      }


    // response.on("data", function (data) {
    //   console.log(data)
    // });
  });

  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT || 3000, function () {
  console.log("server started");
});
