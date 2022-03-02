const sliderItem = document.querySelectorAll(".slider-item");
let activeIndex = 0;
const skills = document.querySelector(".skills");
const progressBars = document.querySelectorAll(".progress-bar-inner");
const secondSlider = document.querySelectorAll('.rec-user');
const recFirstSlide = document.getElementById('first-rec-slide');
const recSecondSlide = document.getElementById('second-rec-slide');
const recThirdSlide = document.getElementById('third-rec-slide');
let activeIndex1 = 0;
const filters = document.querySelectorAll('.project-li');
const form = document.getElementById('form');

setInterval(() => {
  nextSlide();
  renderSlides();
}, 5000);

function renderSlides() {
  sliderItem.forEach((slide, i) => {
    if (activeIndex === i) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });
}
function nextSlide() {
  if (activeIndex === sliderItem.length - 1) {
    activeIndex = 0;
  } else {
    activeIndex++;
  }
  renderSlides();
}
function prevSlide() {
  if (activeIndex === 0) {
    activeIndex = sliderItem.length - 1;
  } else {
    activeIndex--;
  }
  renderSlides();
}
window.addEventListener("scroll", () => {
  const sectionPosition = skills.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 2;

  if (sectionPosition < screenPosition) {
    showProgressBar();
  } else {
    hideProgressBar();
  }
});

function showProgressBar() {
  progressBars.forEach((progressBar) => {
    const value = progressBar.dataset.progress;
    progressBar.style.opacity = 1;
    progressBar.style.width = `${value}%`;
  });
}

function hideProgressBar() {
  progressBars.forEach((hide) => {
    hide.style.opacity = 0;
    hide.style.width = 0;
  });
}
function initSlider(){
  showNextSlide();
  renderSlides2();
}
function renderSlides2() {
  secondSlider.forEach((slide, i) => {
    if (activeIndex1 === i) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });
}
function chooseFirstSlide(){
  activeIndex1 = 0;
  renderSlides2();
  checkButtonClicked();
}
function chooseSecondSlide(){
  activeIndex1 = 1;
  renderSlides2();
  checkButtonClicked();
}
function chooseThirdSlide(){
  activeIndex1 = 2;
  renderSlides2();
  checkButtonClicked();
}
function checkButtonClicked(){
  if(activeIndex1 == 0){
    recFirstSlide.classList.add('red-button');
  } else {
    recFirstSlide.classList.remove('red-button');
  }

  if(activeIndex1 == 1){
    recSecondSlide.classList.add('red-button');
  } else {
    recSecondSlide.classList.remove('red-button');
  }

  if(activeIndex1 == 2){
    recThirdSlide.classList.add('red-button');
  } else {
    recThirdSlide.classList.remove('red-button');
  }
}
filters.forEach(filter => {
  filter.addEventListener('click', function() {
    let selectedFilter = filter.getAttribute('data-filter');
    let itemsToHide = document.querySelectorAll(`.projects .project-img-container:not([data-filter='${selectedFilter}'])`);
    let itemsToShow = document.querySelectorAll(`.projects [data-filter='${selectedFilter}']`);

    if(selectedFilter == 'all'){
      itemsToHide = [];
      itemsToShow = document.querySelectorAll('.projects [data-filter]');
    }

    itemsToHide.forEach(el => {
      el.classList.add('hide');
      el.classList.remove('show');
    });

    itemsToShow.forEach(el => {
      el.classList.remove('hide');
      el.classList.add('show');
    })
  })

});
form.addEventListener('submit', function (e){
  e.preventDefault();

  const formData = new FormData(this);

  fetch('http://api.kesho.me/v1/user-test/contact', {
    method: 'post',
    body: formData
  }).then(function (response) {
    return response.text();
  }).then(function (text){
    console.log(text);
  }).catch(function (error){
    console.log(error);
    
  })
  closeModal();
})

function closeModal(){
  const modal = document.querySelector('.modal-box')
  
  modal.style.display = 'block';
  window.addEventListener('click', () => {
    modal.style.display = 'none';
  })
}