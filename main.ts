/**
 * game_state play geht ca. 1000 ms eine Schlaufe
 */
function init_arrays () {
    SOLUTIONS = [
    "A",
    "B",
    "A",
    "B",
    "B",
    "B",
    "A",
    "A",
    "A",
    "B"
    ]
    ALL_GAME_NUMBERS = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
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
    if (false) {
        for (let Index = 0; Index <= ALL_GAME_NUMBERS.length; Index++) {
            serial.writeLine("ALL_GAME_NUM: " + ALL_GAME_NUMBERS[Index] + " | SOLUTIONS: " + SOLUTIONS[Index])
        }
    }
}
function user_looses_game () {
    music.startMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once)
    led.setBrightness(255)
    basic.showIcon(IconNames.Skull)
    basic.pause(3000)
    music.stopMelody(MelodyStopOptions.All)
    game_state = "wait"
}
function user_wins_the_game () {
    music.stopMelody(MelodyStopOptions.All)
    music.playMelody("F G A - C5 - - - ", 999)
    led.setBrightness(255)
    basic.showIcon(IconNames.Happy)
    basic.pause(3500)
    game_state = "wait"
}
function correct_answer () {
    actual_level += 1
    user_input = "X"
    basic.clearScreen()
    basic.showIcon(IconNames.Yes)
    ALL_GAME_NUMBERS.removeAt(actual_gamenumber)
    SOLUTIONS.removeAt(actual_gamenumber)
    get_random_gamenumber()
    if (false) {
        for (let Index = 0; Index <= ALL_GAME_NUMBERS.length; Index++) {
            serial.writeLine("ALL_GAME_NUM: " + ALL_GAME_NUMBERS[Index] + " | SOLUTIONS: " + SOLUTIONS[Index])
        }
        basic.pause(200)
    }
}
function show_level () {
    if (actual_gamenumber == 0) {
        basic.showLeds(`
            . # # . .
            # # # . .
            . # # # #
            . # # # .
            . . . . .
            `)
    } else if (actual_gamenumber == 1) {
        basic.showLeds(`
            . . # # .
            . . # # #
            # # # # .
            . # # # .
            . . . . .
            `)
    } else if (actual_gamenumber == 2) {
        basic.showLeds(`
            . # # . .
            # # # . .
            . # # # #
            . # # # .
            . # . # .
            `)
    } else if (actual_gamenumber == 3) {
        basic.showLeds(`
            . # # # .
            # . # . #
            # # # # #
            # # # # #
            # . . . #
            `)
    } else if (actual_gamenumber == 4) {
        basic.showLeds(`
            . # # # .
            # . # . #
            # # # # #
            # # # # #
            # . # . #
            `)
    } else if (actual_gamenumber == 5) {
        basic.showLeds(`
            . # # # .
            # # . # #
            # # # # #
            # # # # #
            # . # . #
            `)
    } else if (actual_gamenumber == 6) {
        basic.showLeds(`
            # # . . .
            . # . . .
            . # . . .
            . # # # .
            . # . # .
            `)
    } else if (actual_gamenumber == 7) {
        basic.showLeds(`
            . . . # #
            . . . # .
            . . . # .
            . # # # .
            . # . # .
            `)
    } else if (actual_gamenumber == 8) {
        basic.showLeds(`
            . . . # #
            . . . # .
            # . . # .
            . # # # .
            . # . # .
            `)
    } else {
    	
    }
}
input.onButtonPressed(Button.A, function () {
    user_input = "A"
})
function check_user_input () {
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
}
function wait_screen () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.pause(50)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.pause(50)
}
input.onButtonPressed(Button.AB, function () {
    basic.clearScreen()
    if (game_state == "wait") {
        game_state = "play"
    }
})
input.onButtonPressed(Button.B, function () {
    user_input = "B"
})
function get_random_gamenumber () {
    random_index = randint(0, ALL_GAME_NUMBERS.length - 1)
    actual_gamenumber = ALL_GAME_NUMBERS[random_index]
    if (true) {
        serial.writeLine("actual_game_num: " + actual_gamenumber)
    }
}
let timestamp = 0
let random_index = 0
let actual_gamenumber = 0
let ALL_GAME_NUMBERS: number[] = []
let SOLUTIONS: string[] = []
let actual_level = 0
let user_input = ""
let game_state = ""
led.setBrightness(255)
init_arrays()
get_random_gamenumber()
let brightness = 255
let MAX_TIME = 60
game_state = "wait"
user_input = "X"
actual_level = 0
let MAX_LEVELS = 3
basic.forever(function () {
    timestamp = input.runningTime()
    if (game_state == "wait") {
        wait_screen()
    } else if (game_state == "play") {
        music.startMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.ForeverInBackground)
        brightness += -1 * (255 / MAX_TIME)
        led.setBrightness(brightness)
        if (brightness >= 0) {
            if (actual_level < MAX_LEVELS) {
                show_level()
                check_user_input()
            } else {
                user_wins_the_game()
            }
            basic.pause(500)
        } else {
            user_looses_game()
        }
    } else {
        basic.showLeds(`
            # # . . .
            # . . . .
            # # . # #
            # . . # .
            # # . # .
            `)
    }
    if (false) {
        serial.writeLine("game_state: " + game_state)
        serial.writeLine("brightness: " + brightness)
        serial.writeLine("" + (input.runningTime() - timestamp))
    }
})
