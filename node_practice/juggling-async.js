/* prompt: 

This problem is the same as the previous problem (HTTP COLLECT) in that  
  you need to use http.get(). However, this time you will be provided with  
  three URLs as the first three command-line arguments.  
   
  You must collect the complete content provided to you by each of the URLs  
  and print it to the console (stdout). You don't need to print out the  
  length, just the data as a String; one line per URL. The catch is that you  
  must print them out in the same order as the URLs are provided to you as  
  command-line arguments.  

*/ 

const http = require('http'),
      bl = require('bl'); 
      url1 = process.argv[2],
      url2 = process.argv[3],
      url3 = process.argv[4]; 

http.get(url1, (response) => {
  response.pipe(bl((err, data) => {
      if (err) { 
          return console.log(err); 
      }
      data = data.toString();
      console.log(data);
      http.get(url2, (response) => {
        response.pipe(bl((err, data1) => {
          if (err) {
            return console.log(err);
          }
          data1 = data1.toString();
          console.log(data1); 
          http.get(url3, (response) => {
            response.pipe(bl((err, data2) => {
              if (err) {
                console.log(err); 
              }
              data2 = data2.toString();
              console.log(data2);
            }))
          })
        }))
      })
  }));
});