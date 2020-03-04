// Проект 1. Быки и коровы

const readlineSync = require('readline-sync');
// Максимальное количество попыток
const number_of_attempts = 6;

function randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return Math.abs(rand);
    }

/**
    * Генерирует случайное число из len цифр в диапазоне от min до max
    *
    * param min  минимальное число (начало диапазона)
    * param max  максимальное число (конец диапазона)
    * param countDigits  кол-во цифр в числе
    */
function generateRandomNumber(min = 0, max = 9, countDigits) {
    let digitsArray = [];

    while (digitsArray.length < countDigits) {
        let digit = randomInteger(min, max);

        if (!digitsArray.includes(digit)) {
            digitsArray.push(digit);
        }

        if (digitsArray[0] === 0) {
            digitsArray = [];
        }
    }
    return digitsArray;
}

function findRepeat(arr) {
    const hash = new Map();
    const result = [];
    // If repeat the value is false, if no repeat the value is true
    for (let i = 0; i < arr.length; i++) {
    	if (hash.get(arr[i]) === undefined) {
    		hash.set(arr[i], true);
    	} else {
    		const value = hash.get(arr[i]);
      		if (value) {
        		hash.set(arr[i], !value);
        	}
    	}
    }
    
    hash.forEach((v, k) => {
    	if (!v)
    		result.push(k);
    });
    return result;
}

function compareArrays(arr_1,arr_2) {

	let number_matched_digits_coinciding_place = 0;
	let coinciding_place = [];

	let number_matched_digits_wrong_place = 0;
	let wrong_place = [];

	arr_1.forEach(element => {
		if (arr_2.indexOf(element)!==-1) {
			console.log(element);
			if (arr_2.indexOf(element) === arr_1.indexOf(element)) {
                number_matched_digits_coinciding_place++;
                coinciding_place.push(element);
            } else {
            	number_matched_digits_wrong_place++;
            	wrong_place.push(element);
            }
		}
	})
	console.log('Cовпавших цифр на своих местах', number_matched_digits_coinciding_place, " ", coinciding_place);
	console.log('Cовпавших цифр не на своих местах', number_matched_digits_wrong_place, " ", wrong_place);

	if ((number_matched_digits_coinciding_place == arr_1.length) && (arr_1.lenth == arr_2.lenth)) {
		console.log("Вы выиграли! Числа совпадают.");
		return true;
	} else { 
		return false;
	}
}


function start() {

	let attempt_counter = 0;
	let attempt_result = false;

	// Количество цифр в загаданном числе
	let quantity_of_digits_in_number = randomInteger(3, 6);

	// Загаданное число
	let guessed_number = generateRandomNumber(0, 9, quantity_of_digits_in_number);

	console.log('Добро пожаловать в игру "Быки и коровы"');
	
	while ((attempt_counter < number_of_attempts) && (attempt_result == false) ) {

	    console.log('Попытка номер ', attempt_counter);
		console.log('Введите число размером от 3-х до 6-ти символов, без повторений: ');
		
		const user_number = readlineSync.question('');
		let user_number_array = (""+user_number).split("").map(Number);
		
		// повторяющиеся знаки в числе
		let repeated = findRepeat(user_number_array);

	    if ((/^\d+$/.test(user_number)) 
	    	&& (user_number.length <= 6) 
	    	&& (user_number.length >= 3) 
	    	&& (repeated.length == 0)) {

	    	attempt_counter++;
	    	attempt_result = compareArrays(user_number_array, guessed_number);

	    } else {
	    	console.log('Неправильный ввод');
	    }
	}
}

start();