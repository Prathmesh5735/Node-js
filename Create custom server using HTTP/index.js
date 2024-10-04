const fs = require("fs");
const http = require('http');

// Function to get data from the JSON file
const datafromjson = (res, type) => {
    fs.readFile("./db.json", 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.end("Error reading data");
            return;
        }
        const jsonData = JSON.parse(data);
        res.end(JSON.stringify(jsonData[type]));
    });
};

// Function to add data to the JSON file
const adddatatojson = (res, type, newData) => {
    fs.readFile("./db.json", 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.end("Error reading data");
            return;
        }
        let jsonData = JSON.parse(data);
        
        // Check if the type exists in the JSON data
        if (!jsonData[type]) {
            jsonData[type] = [];
        }
        
        // Append new data to the specified type
        jsonData[type].push(newData);

        // Write the updated data back to the file
        fs.writeFile("./db.json", JSON.stringify(jsonData, null, 2), 'utf-8', (err) => {
            if (err) {
                console.log(err);
                res.end("Error writing data");
                return;
            }
            res.end("Data added successfully");
        });
    });
};

const server = http.createServer((req, res) => {
    if (req.url === "/home" && req.method === "GET") {
        res.end("Welcome This is Home Page");
    } 
    else if (req.url === "/about" && req.method === "GET") {
        res.end("This is About Page");
    } 
    else if (req.url === "/getproductdata" && req.method === "GET") {
        datafromjson(res, 'products');
    } 
    else if (req.url === "/user" && req.method === "GET") {
        datafromjson(res, 'user');
    } 
    else if (req.url === "/addproduct" && req.method === "POST") {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        
        req.on('end', () => {
            body = Buffer.concat(body).toString();
            const newProduct = JSON.parse(body);
            
            adddatatojson(res, 'products', newProduct);
        });
    } 
    else {
        res.end('404 Not Found');
    }
});

server.listen(3030, () => {
    console.log("Server is running on port 3030");
});
