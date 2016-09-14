var csv = require('fast-csv');
var fs = require('fs');

var headers = [, , , , ,'Andrew West','Brendan Haskins','Conor Kingston','Elizabeth Szoke','Ian Strouse','Jeffrey Medders','Jory Garrido','Joshua Newsom','Keith Baeten','Kirsten Wedde','Nathan Musselman','Paul Dziemianowicz','Robert Kurtz','Ryan Kane','Samuel Cate','Sean Murray'];
var students = ['Andrew West','Brendan Haskins','Conor Kingston','Elizabeth Szoke','Ian Strouse','Jeffrey Medders','Jory Garrido','Joshua Newsom','Keith Baeten','Kirsten Wedde','Nathan Musselman','Paul Dziemianowicz','Robert Kurtz','Ryan Kane','Samuel Cate','Sean Murray'];
var stream = fs.createReadStream("./g-23-Fullstack-Boulder-mastery-data.csv");

var studentGrades = {};
var count = 0;

students.forEach(function(student){
  studentGrades[student] = 0;
})

var csvStream = csv.fromStream(stream, {headers : headers})
  .on("data", function(data){
    for(var key in data){
      if(studentGrades[key] >= 0 && parseInt(data[key])){
        if(data[key] !== 0){
          count++;
          studentGrades[key] += parseInt(data[key]);
        }
      }
    }
  }).on("end", function(){
    // to account for 'extra credit'
    studentGrades['Ryan Kane'] -= 7;
    studentGrades['Robert Kurtz'] -= 9;
    studentGrades['Ian Strouse'] -= 3;
    studentGrades['Kirsten Wedde'] -= 3;

    var trackedCount = Math.floor((count / 16));
    var rankings = {
      good: [],
      almost: [],
      no: []
    }
    for(var student in studentGrades){
      var gpa = (studentGrades[student] / trackedCount).toFixed(2);
      if(gpa >= 2.8){
        rankings.good.push({
          name: student,
          gpa: gpa
        })
      } else if(gpa >= 2.7){
        rankings.almost.push({
          name: student,
          gpa: gpa
        })
      } else {
        rankings.no.push({
          name: student,
          gpa: gpa
        })
      }
    }
    console.log(rankings);
  })
