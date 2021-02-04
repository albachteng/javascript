/* prompt: 
   
  Write a program that performs an HTTP GET request to a URL provided to you  
  as the first command-line argument. Collect all data from the server (not  
  just the first "data" event) and then write two lines to the console  
  (stdout).  
   
  The first line you write should just be an integer representing the number  
  of characters received from the server. The second line should contain the  
  complete String of characters sent by the server.  */ 

const http = require('http'),
    url = process.argv[2];
    bl = require('bl'); // buffer list api 

// two methods to complete this, I will try both - first is using response.end()
// and is very similar to the last program, except it waits to print to the console

// http.get(url, (response) => {
//     let data = '';
//     let counter = 0;
//     response.setEncoding('utf8');
//     response.on('data', (chunk) => {
//         data += chunk;
//         counter += chunk.length;
//     });
//     response.on('error', (err) => {
//         console.log(`Error: ${err}`);
//     });
//     response.on('end', () => {
//         console.log(counter);
//         console.log(data);
//     });
// });

http.get(url, (response) => {
    response.pipe(bl((err, data) => {
        if (err) { // bl simply pipes the data into the response
            return console.log(err); 
        }
        data = data.toString();
        console.log(data.length);
        console.log(data);
    }));
});