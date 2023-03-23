//  Game setup
let mySprite : Sprite = null
let projectile : Sprite = null
scene.setBackgroundColor(13)
mySprite = sprites.create(assets.image`front`, SpriteKind.Player)
mySprite.setPosition(100, 100)
let moves = [sprites.castle.skellyAttackFront1, sprites.castle.skellyAttackLeft1, sprites.castle.skellyAttackRight2, sprites.castle.skellyAttackFront4]
info.setLife(3)
//  Control functions
controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    mySprite.setImage(sprites.castle.skellyAttackFront1)
    pause(1000)
    mySprite.setImage(sprites.castle.skellyFront)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    mySprite.setImage(sprites.castle.skellyAttackLeft1)
    pause(1000)
    mySprite.setImage(sprites.castle.skellyFront)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    mySprite.setImage(sprites.castle.skellyAttackRight2)
    pause(1000)
    mySprite.setImage(sprites.castle.skellyFront)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    mySprite.setImage(sprites.castle.skellyAttackFront4)
    pause(1000)
    mySprite.setImage(sprites.castle.skellyFront)
})
//  Basic Game logic
game.onUpdateInterval(1000, function on_update_interval() {
    
    if (Math.percentChance(50)) {
        projectile = sprites.createProjectileFromSide(moves[randint(0, moves.length - 1)], 0, 50)
        projectile.setPosition(80, 0)
    }
    
})
//  Game play logic
//  Check if the sprites match when they overlap
//  IF they match: win some points
//  IF they don't match (else): lose a life, and shake the screen
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function spriteCheck(sprite: Sprite, otherSprite: Sprite) {
    if (sprite.image.equals(otherSprite.image)) {
        info.changeScoreBy(10)
        sprites.destroy(otherSprite, effects.spray, 500)
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        if (info.score() > 100) {
            game.splash("You win!!")
            game.gameOver(true)
        }
        
    } else {
        scene.cameraShake(4, 500)
        sprites.destroy(otherSprite)
        info.changeLifeBy(-1)
        if (info.life() == 0) {
            game.gameOver(false)
        }
        
    }
    
})
