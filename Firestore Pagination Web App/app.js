const booklist = document.querySelector(".container");
const loading = document.querySelector(".loading");

let latestreview = null;
async function getNextReviews() {
    loading.classList.add("active");

    const reviewref = db.collection("reviews").orderBy("book").startAfter(latestreview || 0).limit(5);
    const data = await reviewref.get();
    
    let template = "";
    data.docs.forEach(function(document) {
        const review = document.data();
        template += `
           <div class = "card">
             <h2>${review.book}</h2>
             <p>Written by ${review.author}</p>
             <p>Rating - ${review.rating}</p>
           </div>
        `;
    });
    booklist.innerHTML += template; 

    loading.classList.remove("active");

    latestreview = data.docs[data.docs.length - 1];
    if(data.empty) {
      booklist.removeEventListener("scroll", loadNewReviewOnScroll);
    }
}

window.addEventListener("DOMContentLoaded", getNextReviews);

booklist.addEventListener("scroll", loadNewReviewOnScroll);
function loadNewReviewOnScroll() {
  let scrollfactor = booklist.scrollTop + booklist.offsetHeight;
  if(scrollfactor >= booklist.scrollHeight) {
    getNextReviews();
  }
}