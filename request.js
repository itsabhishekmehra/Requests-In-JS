const axios = require('axios');     //axios ki help se requests nodejs me kam krti hai
const ng_course_url = 'https://api.merakilearn.org/courses';
const fs = require('fs');         // file system bhi humko require krna padta hai files use krne k lie
const readline = require("readline-sync");   // ye readline module bhi humko impourt krna padta hai input karane k lie
let exerciseData;

if (fs.existsSync("./courses.json") == true){   // jab JSON file me pehle se data hoga to ye if code ka part chalega
    const cachedata = require("./courses.json")
    if (cachedata.length>0) {
        for (i=0; i<cachedata.length; i++){
            console.log(cachedata[i]["id"], ":- ",cachedata[i].name);  // ye yaha se courses ki list print ho jaegi and numbering b ho jaegi
        }
    }
    if (fs.existsSync("./courses.json") == true){
    let Entercourseid = Number(readline.question("Enter the Course id: "));
    console.log(cachedata[Entercourseid]);
    axios.get(`https://api.merakilearn.org/courses/${Entercourseid}/exercises`).then((exerData)=>{
        exerciseData = exerData.data.course.exercises;
        console.log(exerciseData,"Exercise data...\n\n\n\n");
        let enterExerId = Number(readline.question("Enter the exercise id: "));
        for(var j=0; j<exerciseData.length; j++){
            if (exerciseData[j]["id"] == enterExerId){
                console.log(exerciseData[j]);   // yaha se child exercise ka data print ho jaega
            }
        }
    }).catch((err) => {
        console.log(err,"Error hai bhai! \n\n");
    })
}
} else{          // ye code tab chalega, jab JSON file me data na ho and humko API call karke us JSON file me data write karwana ho
    axios.get(ng_course_url).then((data) => {
    const courseData = data.data;
    const parsedData = JSON.stringify(courseData)
    console.log(courseData, "parsedData");
    fs.writeFile('courses.json', parsedData, (err) =>{
        if(err) {
            console.log(err)
        } else {
            console.log("Data written Successfully");
        }
    })
}).catch((err) => { 
    console.log(err, "hello err\n");
})
}