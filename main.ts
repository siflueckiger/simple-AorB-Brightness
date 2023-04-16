function init_arrays () {
    SOLUTIONS = [
    "A",
    "B",
    "B",
    "A",
    "A"
    ]
    ALL_GAME_NUMBERS = [
    0,
    1,
    2,
    3,
    4
    ]
}
function wrong_answer () {
    actual_level = 0
    user_input = "X"
    basic.clearScreen()
    basic.showIcon(IconNames.No)
    init_arrays()
    get_random_gamenumber()
    basic.pause(200)
    for (let Index = 0; Index <= ALL_GAME_NUMBERS.length; Index++) {
        serial.writeLine("ALL_GAME_NUM: " + ALL_GAME_NUMBERS[Index] + " | SOLUTIONS: " + SOLUTIONS[Index])
    }
}
function user_wins_the_game () {
    basic.showIcon(IconNames.Happy)
    basic.pause(1000)
}
function correct_answer () {
    actual_level += 1
    user_input = "X"
    basic.clearScreen()
    basic.showIcon(IconNames.Yes)
    ALL_GAME_NUMBERS.removeAt(actual_gamenumber)
    SOLUTIONS.removeAt(actual_gamenumber)
    get_random_gamenumber()
    for (let Index = 0; Index <= ALL_GAME_NUMBERS.length; Index++) {
        serial.writeLine("ALL_GAME_NUM: " + ALL_GAME_NUMBERS[Index] + " | SOLUTIONS: " + SOLUTIONS[Index])
    }
    basic.pause(200)
}
function show_level () {
    if (actual_gamenumber == 0) {
        basic.showLeds(`
            # # # . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    } else if (actual_gamenumber == 1) {
        basic.showLeds(`
            . . . . .
            . . # # #
            . . . . .
            . . . . .
            . . . . .
            `)
    } else if (actual_gamenumber == 2) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # # #
            . . . . .
            . . . . .
            `)
    } else if (actual_gamenumber == 3) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # # # . .
            . . . . .
            `)
    } else if (actual_gamenumber == 4) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            # # # . .
            `)
    } else {
    	
    }
}
input.onButtonPressed(Button.A, function () {
    user_input = "A"
})
input.onButtonPressed(Button.B, function () {
    user_input = "B"
})
function get_random_gamenumber () {
    random_index = randint(0, ALL_GAME_NUMBERS.length - 1)
    actual_gamenumber = ALL_GAME_NUMBERS[random_index]
    serial.writeLine("actual_game_num: " + actual_gamenumber)
}
let random_index = 0
let actual_gamenumber = 0
let ALL_GAME_NUMBERS: number[] = []
let SOLUTIONS: string[] = []
let actual_level = 0
let user_input = ""
init_arrays()
get_random_gamenumber()
user_input = "X"
actual_level = 0
let MAX_LEVELS = 3
basic.forever(function () {
    if (actual_level < MAX_LEVELS) {
        show_level()
        if (user_input == "A") {
            serial.writeLine("user pressed: " + user_input)
            if (SOLUTIONS[random_index] == user_input) {
                correct_answer()
            } else {
                wrong_answer()
            }
        } else if (user_input == "B") {
            serial.writeLine("user pressed: " + user_input)
            if (SOLUTIONS[random_index] == user_input) {
                correct_answer()
            } else {
                wrong_answer()
            }
        } else {
            basic.pause(100)
        }
    } else {
        user_wins_the_game()
    }
    basic.pause(500)
})
