document.addEventListener("DOMContentLoaded", async () => {
    const reviewsContainer = document.querySelector(".reviews-grid");
  
    try {
      const response = await fetch("https://dummyjson.com/c/6633-c443-4965-aeb0");
      const reviews = await response.json();
  
      reviews.forEach(review => {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
  
        reviewElement.innerHTML = `
          <img src="${review.photo}" alt="Foto de ${review.name}">
          <div class="review-details">
            <h3>${review.name}</h3>
            <p class="review-date">${review.date}</p>
            <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <p class="review-text">"${review.review}"</p>
          </div>
        `;
  
        reviewsContainer.appendChild(reviewElement);
      });
    } catch (error) {
      console.error("Error al cargar las reseñas:", error);
    }
  });
  