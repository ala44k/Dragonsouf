const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const jumpSound = document.getElementById("jump-sound");

let score = 0;
let isJumping = false;
let obstacleSpeed = 3;  // بداية السرعة متوسطة
let jumpCount = 0;  // عداد القفزات

// القفز عند لمس الشاشة
document.addEventListener("touchstart", () => {
    if (!isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true;
    player.style.animation = "jump 0.7s ease"; // زيادة وقت القفز للحصول على قفز أعلى
    jumpSound.play();  // تشغيل صوت القفز
    score++;
    jumpCount++;
    scoreDisplay.textContent = "النتيجة: " + score;

    // تسريع الحاجز بعد 10 قفزات
    if (jumpCount >= 10) {
        obstacleSpeed += 0.3;  // زيادة السرعة تدريجياً بعد 10 قفزات
        obstacle.style.animationDuration = `${3 / obstacleSpeed}s`;  // تعديل سرعة الحركة
    }

    setTimeout(() => {
        player.style.animation = "";
        isJumping = false;
    }, 700); // الزمن نفسه للقفز
}

// حركة القفز
document.styleSheets[0].insertRule(`
    @keyframes jump {
        0% { bottom: 10px; }
        50% { bottom: 200px; }  /* زيادة القفز ليصل لأعلى */
        100% { bottom: 10px; }
    }
`, document.styleSheets[0].cssRules.length);

// التحقق من الاصطدام
setInterval(() => {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.bottom > obstacleRect.top
    ) {
        resetGame();  // إعادة اللعبة تلقائيًا عند الاصطدام
    }
}, 50);

// إعادة اللعبة تلقائيًا
function resetGame() {
    // إعادة وضع الحاجز في البداية
    obstacle.style.animation = "none";
    obstacle.style.right = "-60px"; // إعادة الحاجز إلى الموضع الابتدائي

    // إعادة ضبط سرعة الحاجز
    obstacleSpeed = 3;
    obstacle.style.animationDuration = `${3 / obstacleSpeed}s`;  // سرعة متوسطة

    // إعادة اللعبة إلى حالتها الأولية
    score = 0;
    scoreDisplay.textContent = "النتيجة: " + score;
    jumpCount = 0;

    // إعادة تشغيل حركة الحاجز
    setTimeout(() => {
        obstacle.style.animation = `moveObstacle ${3 / obstacleSpeed}s linear infinite`;
    }, 50);
}
