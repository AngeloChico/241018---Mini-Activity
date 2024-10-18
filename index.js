const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getStudentInput() {
    return new Promise((resolve) => {
        rl.question("Enter the student's name: ", (name) => {
            rl.question("Enter the student's grades, separated by commas: ", (gradesInput) => {
                let grades = gradesInput.split(",").map(Number);
                let status = "pass";
                resolve([name, grades, status]);
            });
        });
    });
}

async function main() {
    let studentGrades = [];
    let numberOfStudents;

    numberOfStudents = await new Promise((resolve) => {
        rl.question("Enter the number of students: ", (input) => {
            resolve(parseInt(input));
        });
    });

    for (let i = 0; i < numberOfStudents; i++) {
        studentGrades.push(await getStudentInput());
    }

    studentGrades.forEach((student) => {
        let name = student[0];
        let grades = student[1];
        let averageGrade = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
        student[2] = averageGrade < 70 ? "fail" : "pass";
        console.log(`${name}'s average grade is ${averageGrade.toFixed(2)}.`);
    });

    let updatedStudentGrades = studentGrades.map((student) => {
        let name = student[0];
        let grades = student[1];
        let averageGrade = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
        let status = averageGrade < 70 ? "fail" : "pass";
        return [name, grades, status];
    });

    console.log("Updated Student Grades:", updatedStudentGrades);

    let totalGrades = updatedStudentGrades.reduce((sum, student) => {
        let grades = student[1];
        return sum + grades.reduce((gradeSum, grade) => gradeSum + grade, 0);
    }, 0);

    let numberOfGrades = updatedStudentGrades.reduce((count, student) => count + student[1].length, 0);

    let classAverage = totalGrades / numberOfGrades;

    console.log(`The class average is ${classAverage.toFixed(2)}.`);

    rl.close();
}

main();
