document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star-rating .fa');
    const ratingDisplay = document.getElementById('rating-display');
    let currentRating = 0;

    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            resetStars();
            highlightStars(index);
        });

        star.addEventListener('click', () => {
            currentRating = index + 1;
            ratingDisplay.textContent = `Avaliação: ${currentRating}`;
        });

        star.addEventListener('mouseout', () => {
            resetStars();
            if (currentRating > 0) {
                highlightStars(currentRating - 1);
            }
        });
    });

    function resetStars() {
        stars.forEach(star => {
            star.classList.remove('fa-star', 'active');
            star.classList.add('fa-star-o');
        });
    }

    function highlightStars(index) {
        for (let i = 0; i <= index; i++) {
            stars[i].classList.remove('fa-star-o');
            stars[i].classList.add('fa-star', 'active');
        }
    }
});