// Проект 3. Викторина

const readlineSync = require('readline-sync');
const fs = require('fs');

let filenames = ['question1', 'question2', 'question3', 'question4', 
'question5', 'question6', 'question7', 'question8'];

function randomNames(outArray) {
	let inArray = outArray;
	let random_names = [];
	for (let i = 0; i < 5; i++) {
		let index = Math.floor(Math.random() * inArray.length);
    	let rand = inArray[index];
    	inArray.splice(index, 1);
        random_names.push(rand);
    }
    return random_names;
}

let selected_filenames = randomNames(filenames);

let number_correct_answers = 0;
for (let i = 0; i < selected_filenames.length; i++) {

	const data = fs.readFileSync(selected_filenames[i], 'utf8');
	const questionArray = data.toString().replace(/\r\n/g,'\n').split('\n');

	let correct_answer_number = questionArray[1];

	console.log('Ответьте на вопрос:');
	console.log(questionArray[0]);
	console.log('Варианты ответов:');
	for (let qcounter = 2; qcounter < questionArray.length; qcounter++) {
		console.log(questionArray[qcounter]);
	}
	console.log('Введите номер ответа:');
	const user_answer = readlineSync.question('');
	if (user_answer == questionArray[1]) {
		number_correct_answers++;
	}
}

console.log('Количество правилных ответов: ', number_correct_answers);