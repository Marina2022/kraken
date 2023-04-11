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


// Видео - кастомная кнопка

function initPlayVideo() {
  let videoCover = document.querySelector(".video-cover");
  let videoPlayer = document.querySelector(".video-player");
  let videoUrl = 'uYrzzT0yMTU';

  videoCover.addEventListener('click', () => {
    videoCover.style.display = "none";
    videoPlayer.innerHTML =
      '<iframe class="video-frame" src="https://www.youtube.com/embed/' +
      videoUrl +
      '?feature=oembed&autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  })
}

initPlayVideo();


