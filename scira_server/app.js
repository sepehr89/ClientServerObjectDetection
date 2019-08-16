const http = require('http');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "sciratest"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var url = require('url');
// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {  
    // Set a response type of plain text for the response
    res.writeHead(200, {'Content-Type': 'application/json'});

    var q = url.parse(req.url, true).query;
 
    var sql =  "INSERT INTO detections(descriptions, thing, confidence, xcoord, ycoord) VALUES ("+con.escape(q.obje)+","+con.escape(q.thing)+","+con.escape(q.confidence)+","+con.escape(q.xcoord)+","+con.escape(q.ycoord)+");";
  con.query(sql, function (err, result,fields) {
    if (err) throw err;
    console.log(result);
	
	res.end(JSON.stringify(result));
	
  });
 // con.end();
 
});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');