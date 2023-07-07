document.addEventListener('DOMContentLoaded', () => {
    const backgroundAnimation = document.getElementById('backgroundAnimation');
    const backgroundSound = new Audio('../media/background_sound.mp3');
    const jumpSound = new Audio('../media/jump.wav');
    const startGameLayer = document.querySelector('.game__start');
    const startGameButton = document.querySelector('.game__start button');
    const mario = document.querySelector('.mario')

    let jumped = false;

    function startGame() {
        backgroundAnimation.play();

        backgroundSound.volume = 0.05;
        backgroundSound.play().then();
    }

    startGameButton.addEventListener('click', () => {
        setTimeout(() => {
            startGame();
            startGameLayer.classList.add('d-none')
        }, 300)
    })

    function jump() {
        jumpSound.volume = 0.05;
        jumpSound.play().then();
        jumped = true;
        let count = 0;
        let jumpHeight = 0;
        const jumpInterval = setInterval(() => {
            count++;
            if (count <= 25) {
                jumpHeight -= 4;
                mario.style.cssText = `transform: translateY(${jumpHeight}px)`
            }

            if (count > 25 && count < 50) {
                jumpHeight += 4;
                mario.style.cssText = `transform: translateY(${jumpHeight}px)`
            }

            if (count === 50) {
                jumpHeight = 0;
                mario.style.cssText = `transform: translateY(${jumpHeight}px)`
                jumped = false;
                clearInterval(jumpInterval)
            }
        }, 10)
    }

    window.addEventListener('keydown', e => {
        if (e.key === 'ArrowUp' && !jumped) {
            jump();
        }
    })
})



