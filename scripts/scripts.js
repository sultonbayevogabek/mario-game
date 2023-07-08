document.addEventListener('DOMContentLoaded', () => {
    const backgroundAnimation = document.getElementById('backgroundAnimation');
    const backgroundSound = new Audio('../media/background_sound.mp3');
    const jumpSound = new Audio('../media/jump.wav');
    const gameOverSound = new Audio('../media/game_over.wav')
    const startGameLayer = document.querySelector('.game__start');
    const startGameButton = document.querySelector('.game__start button');
    const restartGameLayer = document.querySelector('.game__restart');
    const restartGameButton = document.querySelector('.game__restart button');
    const mario = document.querySelector('.mario');
    const ball = document.querySelector('.ball');
    const time = document.querySelector('time')
    let startTime;
    let jumpingInterval;
    let ballMovingInterval;
    let timeInterval;
    let marioJumpHeight = 0;
    let ballCoordinate = 70;

    let jumped = false;

    function startGame() {
        startGameLayer.classList.add('d-none')
        backgroundAnimation.play();
        backgroundAnimation.loop = true;

        backgroundSound.volume = 0.05;
        backgroundSound.loop = true;
        backgroundSound.play().then();
    }

    startGameButton.addEventListener('click', () => {
        setTimeout(() => {
            startTime = new Date().getTime();
            startGame();
            ballMoving();
            calculateTime()
            watchCoordinates();
        }, 300)
    })

    restartGameButton.addEventListener('click', () => {
        setTimeout(() => {
            restartGameLayer.classList.add('d-none');
            marioJumpHeight = 0;
            ballCoordinate = 70;
            jumped = false;
            mario.style.cssText = `transform: translateY(0)`;
            ball.style.cssText = `transform: translateY(70px)`;
            time.textContent = '00:00';
            startTime = new Date().getTime();
            startGame();
            ballMoving();
            calculateTime();
            watchCoordinates();
        }, 300);
    });

    function jump() {
        jumpSound.volume = 0.5;
        jumpSound.play().then();
        jumped = true;
        let count = 0;
        jumpingInterval = setInterval(() => {
            count++;
            if (count <= 150) {
                marioJumpHeight -= 1;
                mario.style.cssText = `transform: translateY(${marioJumpHeight}px)`
            }

            if (count > 150 && count < 300) {
                marioJumpHeight += 1;
                mario.style.cssText = `transform: translateY(${marioJumpHeight}px)`
            }

            if (count === 300) {
                marioJumpHeight = 0;
                mario.style.cssText = `transform: translateY(${marioJumpHeight}px)`
                jumped = false;
                clearInterval(jumpingInterval)
            }
        }, 1)
    }

    function ballMoving() {
        ballMovingInterval = setInterval(() => {
            ballCoordinate -= 3

            if (ballCoordinate < -1200) {
                ballCoordinate = 70
            }

            ball.style.cssText = `transform: translateX(${ballCoordinate}px)`
        }, 1)
    }

    function calculateTime() {
        timeInterval = setInterval(() => {
            let currentTime = new Date().getTime();
            let duration = Math.round((currentTime - startTime) / 1000);
            let minutes = Math.floor(duration / 60);
            let seconds = duration - minutes * 60;
            time.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
        }, 1000)
    }

    function watchCoordinates() {
        let watchCoordinatesInterval = setInterval(() => {
            if (ballCoordinate < -910 && ballCoordinate > -1100 && marioJumpHeight > -70) {
                backgroundAnimation.pause();
                backgroundSound.pause()
                gameOverSound.play();
                clearInterval(ballMovingInterval)
                clearInterval(jumpingInterval)
                clearInterval(watchCoordinatesInterval);
                clearInterval(timeInterval)
                restartGameLayer.classList.remove('d-none');
            }
        }, 0)
    }

    window.addEventListener('keydown', e => {
        if (e.key === 'ArrowUp' && !jumped) {
            e.preventDefault();
            jump();
        }
    })
})



