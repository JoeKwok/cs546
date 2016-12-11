const fs = require('fs');
function myreadfile (filePath) {
	return new Promise((resolve,reject)=> {
		fs.readFile(filePath, "utf-8", (err,data)=> {
			if(err) reject (err);
			resolve (data);
		});
	});
}

const files = ['index.js', 'package.json', 'promise_all.js'];

let fileContentPromises =[];
files.forEach(filename =>{
	fileContentPromises.push(myreadfile(filename)); 
});
console.log(fileContentPromises);
let fileContentPromisesComplete = Promise.all(fileContentPromises);
fileContentPromisesComplete.then(fileContents =>{
	console.log(fileContents);
}).catch(console.log);

