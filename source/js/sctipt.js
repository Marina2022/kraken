// аккордеон

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((faqItem) => {
  faqItem.addEventListener('click', (e) => {
    if (e.currentTarget.classList.contains('faq-item')) {
      e.currentTarget.classList.toggle('faq-item--opened');
      e.currentTarget.querySelector('.faq-item__desc').classList.toggle('fully-hidden')
    }
  })
})

const moreFaq = document.querySelector('.more-faq');

moreFaq.addEventListener('click', () => {
  moreFaq.classList.add('visually-hidden')
  faqItems.forEach((faqItem) => {
    faqItem.classList.remove('fully-hidden');
  })
})


// hamburger menu

const menuBtn = document.querySelector('.hamburger-btn');
const mobileMenu = document.querySelector('.mobile-menu');
menuBtn.addEventListener('click', ()=>{
  mobileMenu.classList.toggle('fully-hidden');
})

// Видео

const videoBtn = document.querySelector(".video-btn");
const video = document.querySelector(".video-player");

videoBtn.addEventListener('click', ()=>{
  video.play();
  video.controls = true;
  videoBtn.style.display = 'none';
  video.addEventListener('ended', function () {
    this.src = this.src;
    this.controls = false;
    videoBtn.style.display = 'inline-block';
  }, false);

})

