// Проект 2. RPG баттл

const readlineSync = require('readline-sync');

const Monster = {
    Health: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0,     // ходов на восстановление
            "cooldownCounter": 0 // счетчик блокировки удара
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3,
            "cooldownCounter": 0
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2,
            "cooldownCounter": 0
        },
    ]
}

const Evstafi_mag = {
	Health: undefined,
	name: "Евстафий",
	moves: [
            {
                "name": "Удар боевым кадилом",
                "physicalDmg": 2,
                "magicDmg": 0,
                "physicArmorPercents": 0,
                "magicArmorPercents": 50,
                "cooldown": 0,
                "cooldownCounter": 0
            },
            {
                "name": "Вертушка левой пяткой",
                "physicalDmg": 4,
                "magicDmg": 0,
                "physicArmorPercents": 0,
                "magicArmorPercents": 0,
                "cooldown": 4,
                "cooldownCounter": 0
            },
            {
                "name": "Каноничный фаербол",
                "physicalDmg": 0,
                "magicDmg": 5,
                "physicArmorPercents": 0,
                "magicArmorPercents": 0,
                "cooldown": 3,
                "cooldownCounter": 0
            },
            {
                "name": "Магический блок",
                "physicalDmg": 0,
                "magicDmg": 0,
                "physicArmorPercents": 100,
                "magicArmorPercents": 100,
                "cooldown": 4, 
                "cooldownCounter": 0
            },
        ]

}

// Уменьшает счетчик блокировки удара после каждого сражения
function decreaseСooldownCounter() {

	for (let i = 0; i < Monster.moves.length; i++) {
		Monster.moves[i]["cooldownCounter"] = Monster.moves[i]["cooldownCounter"]-1;
	}

	for (let i = 0; i < Evstafi_mag.moves.length; i++) {
		Evstafi_mag.moves[i]["cooldownCounter"] = Evstafi_mag.moves[i]["cooldownCounter"]-1;
	}
}

// Выбирает ход монстра случайно из доступных
function MonsterMoveSelection() {
	let available_moves_index = [];

	for (let i = 0; i < Monster.moves.length; i++) {
		if (Monster.moves[i]["cooldownCounter"] <= 0) {
			available_moves_index.push(i);
		}
	}
	const random_move = available_moves_index[Math.floor(Math.random() * available_moves_index.length)];
	return random_move;
}

// Доступные ходы Евстафия
function EvstafiMagMoveAvailable() {
	let available_moves_index = [];

	for (let i = 0; i < Evstafi_mag.moves.length; i++) {
		if (Evstafi_mag.moves[i]["cooldownCounter"] <= 0) {
			available_moves_index.push(i);
		}
	}
	return available_moves_index;
}

function outputMoveinformation(fighter, selected_move_index) {
	console.log(fighter.name, 'выбрал удар: ', fighter.moves[selected_move_index]["name"]);
	console.log('Физический урон удара ',  fighter.moves[selected_move_index]["physicalDmg"]);
	console.log('Магический урон удара ',  fighter.moves[selected_move_index]["magicDmg"]);
	console.log('Физическая защита ', fighter.moves[selected_move_index]["physicArmorPercents"], '%');
	console.log('Магическая защита ', fighter.moves[selected_move_index]["magicArmorPercents"], '%');
	console.log('здоровье бойца перед боем ', fighter.Health);
}

function start() {
	console.log('Добро пожаловать в игру RPG баттл');
	const readlineSync = require('readline-sync');

	let game_difficulty = undefined;
	while (!['1', '2', '3'].includes(game_difficulty)) {
		console.log('Выберите сложность игры (начальное здоровье Евстафия): ');
		console.log('1 высокая (здоровье 10)');
		console.log('2 средняя (здоровье 20)');
		console.log('3 низкая (здоровье 30)');

    	game_difficulty = readlineSync.question('');
	    if (game_difficulty === '1') {
	        Evstafi_mag.Health = 10;
	    } else if (game_difficulty === '2') {
	    	Evstafi_mag.Health = 20;
	    } else if (game_difficulty === '3') {
	    	Evstafi_mag.Health = 30;
	    }
	}

	let stroke_counter = 1
	while ((Evstafi_mag.Health > 0) &&  (Monster.Health > 0)) {
		console.log('=========================================');
		console.log('Ход номер ', stroke_counter);
		stroke_counter++;
		// Номер удара монстра
		monster_move_counter = MonsterMoveSelection();
		// Вывод информации об ударе монстра
		outputMoveinformation(Monster, monster_move_counter);

		Evstafi_possible_moves = EvstafiMagMoveAvailable();

		let evstafi_move_number = -1; 
		while (!Evstafi_possible_moves.includes(evstafi_move_number)) {
			console.log('Введите номер удара из возможных: ', Evstafi_possible_moves);
			try {
				evstafi_move_number = Number(readlineSync.question(''));
			} catch(error) {
				console.log(error)
			}
		}
		
		// Вывод информации об ударе Евстафия
		outputMoveinformation(Evstafi_mag, evstafi_move_number);

		// Уменьшает счетчик блокировки удара после каждого сражения
		decreaseСooldownCounter();

		// Устанавливаем счетчики блокировки удара после выбора удара
		Monster.moves[monster_move_counter]["cooldownCounter"] = Monster.moves[monster_move_counter]["cooldown"];
		Evstafi_mag.moves[evstafi_move_number]["cooldownCounter"] = Evstafi_mag.moves[evstafi_move_number]["cooldown"];

		// Расчет урона Евстафия
		//магический
		let mag_dam_Evstafi = Monster.moves[monster_move_counter]["magicDmg"];
		if (mag_dam_Evstafi > 0) {
			mag_dam_Evstafi = mag_dam_Evstafi - (Evstafi_mag.moves[evstafi_move_number]["magicArmorPercents"]/100)*mag_dam_Evstafi;
		}
		//физический
		let phys_dam_Evstafi = Monster.moves[monster_move_counter]["physicalDmg"];
		if (phys_dam_Evstafi > 0) {
			phys_dam_Evstafi = phys_dam_Evstafi - (Evstafi_mag.moves[evstafi_move_number]["physicArmorPercents"]/100)*phys_dam_Evstafi;
		}
		// общий урон
		let general_damage_Evstafi_mag = mag_dam_Evstafi + phys_dam_Evstafi;
		Evstafi_mag.Health = (Evstafi_mag.Health - general_damage_Evstafi_mag).toFixed(3);
		console.log("Евстафий-маг здоровье ", Evstafi_mag.Health);
		
		// Расчет урона Лютого монстра
		let mag_dam_monster = Evstafi_mag.moves[evstafi_move_number]["magicDmg"];
		if (mag_dam_monster > 0) {
			mag_dam_monster = mag_dam_monster - (Monster.moves[monster_move_counter]["magicArmorPercents"]/100)*mag_dam_monster;
		}

		let phys_dam_monster = Evstafi_mag.moves[evstafi_move_number]["physicalDmg"];
		if (phys_dam_monster > 0) {
			phys_dam_monster = phys_dam_monster - (Monster.moves[monster_move_counter]["physicArmorPercents"]/100)*phys_dam_monster;
		}

		let gen_dam_monster = mag_dam_monster + phys_dam_monster;
		Monster.Health = (Monster.Health - gen_dam_monster).toFixed(3);
		console.log("Монстр здоровье ", Monster.Health);

		if (Monster.Health <= 0) {
			console.log('Вы победили!');
			break;
		} else if (Evstafi_mag.Health <= 0) {
			console.log('Вы проиграли!');
			break;
		}

	}
}

start();