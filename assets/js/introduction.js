document.addEventListener("DOMContentLoaded", () => {
    function createFlower() {
        const flower = document.createElement("img");
        flower.src = "assets/images/daisy_flower.png"; // 꽃 이미지 경로
        flower.classList.add("flower");

        // 랜덤 위치 및 크기 설정
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 4 + 6; // 6~10초 동안 떨어짐
        const size = Math.random() * 30 + 20; // 크기 20~40px 랜덤

        flower.style.left = `${startX}px`;
        flower.style.width = `${size}px`;
        flower.style.height = `${size}px`;
        flower.style.animationDuration = `${duration}s`;

        document.body.appendChild(flower);

        // 애니메이션이 끝나면 요소 제거 (메모리 누수 방지)
        setTimeout(() => {
            flower.remove();
        }, duration * 1000);
    }

    // 일정 간격으로 꽃 생성
    setInterval(createFlower, 333);
});