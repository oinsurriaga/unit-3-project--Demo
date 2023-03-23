# Game setup
mySprite: Sprite = None
projectile: Sprite = None
scene.set_background_color(13)
mySprite = sprites.create(assets.image("""front"""), SpriteKind.player)
mySprite.set_position(80, 100)
moves = [sprites.castle.skelly_attack_front1,
    sprites.castle.skelly_attack_left1,
    sprites.castle.skelly_attack_right2,
    sprites.castle.skelly_attack_front4]
info.set_life(3)

# Control functions

def on_up_pressed():
    mySprite.set_image(sprites.castle.skelly_attack_front1)
    pause(1000)
    mySprite.set_image(sprites.castle.skelly_front)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_left_pressed():
    mySprite.set_image(sprites.castle.skelly_attack_left1)
    pause(1000)
    mySprite.set_image(sprites.castle.skelly_front)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_right_pressed():
    mySprite.set_image(sprites.castle.skelly_attack_right2)
    pause(1000)
    mySprite.set_image(sprites.castle.skelly_front)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_down_pressed():
    mySprite.set_image(sprites.castle.skelly_attack_front4)
    pause(1000)
    mySprite.set_image(sprites.castle.skelly_front)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

# Basic Game logic

def on_update_interval():
    global projectile
    if Math.percent_chance(50):
        projectile = sprites.create_projectile_from_side(moves[randint(0, len(moves) - 1)], 0, 50)
        projectile.set_position(80, 0)
game.on_update_interval(1000, on_update_interval)

# Game play logic
# Check if the sprites match when they overlap
# IF they match: win some points
# IF they don't match (else): lose a life, and shake the screen

def spriteCheck (sprite, otherSprite) :
    if sprite.image.equals (otherSprite.image):
        info.change_score_by(10)
        sprites.destroy(otherSprite, effects.spray, 500)
        music.play(music.melody_playable(music.ba_ding), music.PlaybackMode.UNTIL_DONE)
        if info.score() > 100:
            game.splash("You win!!")
            game.game_over(True)
    else:
        scene.camera_shake(4, 500)
        sprites.destroy(otherSprite)
        info.change_life_by(-1)
        if info.life() == 0:
            game.game_over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.projectile, spriteCheck)
