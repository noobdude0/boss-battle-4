namespace SpriteKind {
    export const OcotEye = SpriteKind.create()
    export const Tentacle = SpriteKind.create()
    export const HitTentacle = SpriteKind.create()
    export const Display = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Tentacle, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.setKind(SpriteKind.HitTentacle)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (torpedoCount > 0) {
        torpedo = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c . . . . . 
            . c b b b b b b b c 4 c . . . . 
            . c b b b b b b b c 4 4 c . . . 
            . c b b b b b b b c 4 4 c . . . 
            . c b b b b b b b c 4 c . . . . 
            . . c c c c c c c c c . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, thePlayer, 1, 0)
        torpedo.ax = 150
        torpedo.startEffect(effects.trail)
        torpedoCount += -1
        torpedoDisplay.say("x" + torpedoCount)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    trident = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f f . . . . . 
        . . f f 4 4 4 4 4 4 4 f f . . . 
        . f 4 4 4 4 4 4 4 4 4 2 2 f . . 
        . f 4 4 4 4 2 4 4 4 4 4 4 f . . 
        f 2 4 4 4 4 4 4 4 4 4 4 4 4 f . 
        f 4 2 4 4 4 4 4 4 4 2 4 4 4 f . 
        f 4 4 4 4 4 4 4 4 4 4 4 4 4 f . 
        f 2 2 2 2 2 2 2 2 2 4 4 4 2 f . 
        f 2 2 2 2 2 2 2 2 2 2 2 2 2 f . 
        f 2 2 2 2 2 2 2 2 2 2 2 2 2 f . 
        f 2 2 2 2 2 2 2 2 2 2 2 2 2 f . 
        . f 2 2 2 2 2 2 2 2 2 2 2 f . . 
        . f 2 2 2 2 2 2 2 2 2 2 2 f . . 
        . . f f 2 2 2 2 2 2 2 f f . . . 
        . . . . f f f f f f f . . . . . 
        `, thePlayer, 100, 0)
})
function reverseVelocity (sprite: Sprite) {
    if (sprite.bottom < scene.screenHeight() + 10 && sprite.y > 60) {
        sprite.vy = 10
        sprite.ay = 0 - sprite.ay
        sprite.setFlag(SpriteFlag.AutoDestroy, true)
    } else if (sprite.top > -10 && sprite.y < 60) {
        sprite.vy = -10
        sprite.ay = 0 - sprite.ay
        sprite.setFlag(SpriteFlag.AutoDestroy, true)
    }
}
function setEyePosition () {
    octoEye.setPosition(octopus.x - 25, octopus.y - 20)
}
function makeOctoBOSS () {
    octopus = sprites.create(img`
        ......................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ....................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ..................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ..............................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ............................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        .........................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        .......................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        .....................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ...................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        .................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ...............fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ............ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ..........ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ........ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ......ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ....ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ..ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        .................dddddddddddddddddddddddfffddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddfffffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................dffffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................dfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ..................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ..................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ..................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ..................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ..................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ..................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ..................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ..................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ..................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ..................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ..................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ..................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ..................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ..................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ..................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ..................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ..................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ...................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddd
        ...................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ...................dddddddddddddddddddddddddddddddddddddddddddddfdddddddfddddddddddddddddddddddddddd
        ...................ddddddddddddddddddddddddddddddddddddddddddddfddddddddfddddddddddddddddddddddddddd
        ...................dddddddddddddddddddddddddddddddddddddddddddfddddddddddfdddddddddddddddddddddddddd
        ...................ddddddddddddddddddddddddddddddddddddddddddfdddddddddddfdddddddddddddddddddddddddd
        ...................ddddddddddddddddddddddddddddddddddddddddddfddddddddddddfddddddddddddddddddddddddd
        ....................ddddddddddddddddddddddddddddddddddddddddfddddddddddddddfdddddddddddddddddddddddd
        ....................dddddddddddddddddddddddddddddddddddddddfdddddddddddddddfdddddddddddddddddddddddd
        ....................ddddddddddddddddddddddddddddddddddddddfdddddddddddddddddfddddddddddddddddddddddd
        ....................dddddddddddddddddddddddddddddddddddddfddddddddddddddddddfddddddddddddddddddddddd
        ....................ddddddddddddddddddddddddddddddddddddfddddddddddddddddddddfdddddddddddddddddddddd
        ....................ddddddddddddddddddddddddddddddddddddfdddddddddddddddddddddffdddddddddddddddddddd
        ....................dddddddddddddddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddd
        .....................dddddddddddddddddddddddddddddddddfddddddddddddddddddddddddfdddddddddddddddddddd
        .....................dddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddfddddddddddddddddddd
        .....................ddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddfdddddddddddddddddd
        ......................ddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddfddddddddddddddddd
        ......................ddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddfddddddddddddddddd
        ......................dddddddddddddddddddddddddddddfddddddddddddddddddddddddddddddffdddddddddddddddd
        .......................dddddddddddddddddddddddddddfddddddddddddddddddddddddddddddddfdddddddddddddddd
        .......................dddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddfddddddddddddddd
        ........................dddddddddddddddddddddddddfddddddddddddddddddddddddddddddddddfddddddddddddddd
        ........................ddddddddddddddddddddddddfddddddddddddddddddddddddddddddddddddfdddddddddddddd
        ........................ddddddddddddddddddddddffddddddddddddddddddddddddddddddddddddddfddddddddddddd
        .........................dddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddfddddddddddddd
        ..........................dddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddddfdddddddddddd
        ..........................ddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddddddfddddddddddd
        ...........................ddddddddddddddddfddddddddddddddddddddddddddddddddddddddddddddfddddddddddd
        ...........................dddddddddddddddfddddddddddddddddddddddddddddddddddddddddddddddfdddddddddd
        ............................dddddddddddddfddddddddddddddddddddddddddddddddddddddddddddddddfddddddddd
        .............................ddddddddddffdddddddddddddddddddddddddddddddddddddddddddddddddffdddddddd
        ..............................ddddddddffdddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddd
        ..............................dddddddffdddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddd
        ...............................ddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddd
        ................................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddffdddddd
        .................................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddd
        ..................................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ...................................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ....................................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .......................................ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ..........................................dddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .............................................ddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ...............................................ddddddddddddddddddddddddddddddddddddddddddddddddddddd
        .................................................ddddddddddddddddddddddddddddddddddddddddddddddddddd
        ....................................................dddddddddddddddddddddddddddddddddddddddddddddddd
        .......................................................ddddddddddddddddddddddddddddddddddddddddddddd
        ...........................................................ddddddddddddddddddddddddddddddddddddddddd
        .................................................................ddddddddddddddddddddddddddddddddddd
        ......................................................................dddddddddddddddddddddddddddddd
        `, SpriteKind.Enemy)
    octopus.setPosition(150, 50)
    octopus.vy = -20
    octoEye = sprites.create(img`
        ................................
        ...........fffffffffff..........
        .........ff11111111111ff........
        .......ff111111111111111ff......
        ......f1111111111111111111f.....
        .....f111111111111111111111f....
        ....f11111111111111111111111f...
        ...f1111111111111111111111111f..
        ...f1111122222222222222222111f..
        ..f111111222222222222222221111f.
        ..f111111222222222222222221111f.
        .f11111111222222222222222111111f
        .f11111111122222222222222111111f
        .f11111111122222222222222111111f
        .f11111111112222222222221111111f
        .f1111111111fff2222222f11111111f
        .f1111111111fffffffffff11111111f
        .f1111111111fffffffffff11111111f
        .f1111111111fffffffffff11111111f
        .f11111111111111111111111111111f
        .f11111111111111111111111111111f
        .f11111111111111111111111111111f
        ..f111111111111111111111111111f.
        ..f111111111111111111111111111f.
        ...f1111111111111111111111111f..
        ...f1111111111111111111111111f..
        ....f11111111111111111111111f...
        .....f111111111111111111111f....
        ......f1111111111111111111f.....
        .......ff111111111111111ff......
        .........ff11111111111ff........
        ...........fffffffffff..........
        `, SpriteKind.OcotEye)
    setEyePosition()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.OcotEye, function (sprite, otherSprite) {
    eyeHP += -1
    statusbar.value += -1
    sprite.destroy()
    if (eyeHP == 0) {
        game.over(true)
    }
    otherSprite.image.replace(5, 4)
    pause(200)
    otherSprite.image.replace(4, 5)
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    trident = sprites.createProjectileFromSprite(img`
        . . . . . f f f f f f f . . . . 
        . . . f f 4 2 2 2 4 4 4 f f . . 
        . . f 4 4 4 4 2 2 4 4 4 4 2 f . 
        . . f 4 4 4 4 4 2 2 2 4 4 2 f . 
        . f 2 2 2 4 4 4 4 2 2 2 4 2 2 f 
        . f 2 2 2 2 2 2 4 2 2 4 4 2 2 f 
        . f 2 2 4 4 4 4 4 4 4 4 2 2 2 f 
        . f 2 2 2 4 4 2 4 4 4 4 2 2 2 f 
        . f 2 2 2 2 2 2 2 2 2 2 2 2 2 f 
        . f 2 2 2 2 2 2 2 2 2 2 2 2 2 f 
        . f 2 2 2 2 2 2 2 2 2 2 2 2 2 f 
        . . f 2 2 2 2 2 2 2 2 2 2 2 f . 
        . . f 2 2 2 2 2 2 2 2 2 2 2 f . 
        . . . f f 2 2 2 2 2 2 2 f f . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        `, thePlayer, 100, 0)
    pause(200)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    tentacle = sprites.create(img`
        ................
        ................
        ................
        .............dd.
        ............ddd.
        ............d.d.
        ............d.dd
        ............d..d
        ............d..d
        ............dd.d
        .dddd....ddd.d.d
        dd..dd.ddd.ddd.d
        d....ddd....dd.d
        d.....dd....dd.d
        d.....dd.....d.d
        d......d.....d.d
        d......d.....d.d
        d......d.....d.d
        .......d.....d.d
        fffffffffffffffd
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        ffffffffffffffff
        `, SpriteKind.Tentacle)
    tentacle.x = randint(0, scene.screenWidth() - 50)
    sprite.destroy()
    if (Math.percentChance(50)) {
        tentacle.top = scene.screenHeight()
        tentacle.ay = -200
    } else {
        tentacle.image.flipY()
        tentacle.bottom = 0
        tentacle.ay = 200
    }
})
let tentacle: Sprite = null
let octopus: Sprite = null
let octoEye: Sprite = null
let trident: Sprite = null
let torpedo: Sprite = null
let torpedoDisplay: Sprite = null
let torpedoCount = 0
let eyeHP = 0
let statusbar: StatusBarSprite = null
let thePlayer: Sprite = null
thePlayer = sprites.create(img`
    ...........ccccc66666...........
    ........ccc4444444444666........
    ......cc444444444bb4444466......
    .....cb4444bb4444b5b444444b.....
    ....eb4444b5b44444b44444444b....
    ...ebb44444b4444444444b444446...
    ..eb6bb444444444bb444b5b444446..
    ..e6bb5b44444444b5b444b44bb44e..
    .e66b4b4444444444b4444444b5b44e.
    .e6bb444444444444444444444bb44e.
    eb66b44444bb444444444444444444be
    eb66bb444b5b44444444bb44444444be
    fb666b444bb444444444b5b4444444bf
    fcb666b44444444444444bb444444bcf
    .fbb6666b44444444444444444444bf.
    .efbb66666bb4444444444444444bfe.
    .86fcbb66666bbb44444444444bcc688
    8772effcbbbbbbbbbbbbbbbbcfc22778
    87722222cccccccccccccccc22226678
    f866622222222222222222222276686f
    fef866677766667777776667777fffef
    fbff877768f86777777666776fffffbf
    fbeffeefffeff7766688effeeeefeb6f
    f6bfffeffeeeeeeeeeeeeefeeeeebb6e
    f66ddfffffeeeffeffeeeeeffeedb46e
    .c66ddd4effffffeeeeeffff4ddb46e.
    .fc6b4dddddddddddddddddddb444ee.
    ..ff6bb444444444444444444444ee..
    ....ffbbbb4444444444444444ee....
    ......ffebbbbbb44444444eee......
    .........fffffffcccccee.........
    ................................
    `, SpriteKind.Player)
controller.moveSprite(thePlayer)
thePlayer.z = 10
scene.setBackgroundColor(15)
effects.starField.startScreenEffect()
makeOctoBOSS()
statusbar = statusbars.create(100, 4, StatusBarKind.Health)
statusbar.positionDirection(CollisionDirection.Bottom)
info.setLife(3)
eyeHP = 100
torpedoCount = 10
torpedoDisplay = sprites.create(img`
    . c c c c c c c c c . . 
    c b b b b b b b c 4 c . 
    c b b b b b b b c 4 4 c 
    c b b b b b b b c 4 4 c 
    c b b b b b b b c 4 c . 
    . c c c c c c c c c . . 
    `, SpriteKind.Display)
torpedoDisplay.setFlag(SpriteFlag.Ghost, true)
torpedoDisplay.setPosition(10, 112)
torpedoDisplay.say("x" + torpedoCount)
game.onUpdate(function () {
    setEyePosition()
    for (let value of sprites.allOfKind(SpriteKind.Tentacle)) {
        reverseVelocity(value)
    }
    for (let value2 of sprites.allOfKind(SpriteKind.HitTentacle)) {
        reverseVelocity(value2)
    }
})
game.onUpdateInterval(1500, function () {
    octopus.vy = 0 - octopus.vy
})
