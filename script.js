/*-----------------------------------*\
  #script.js
\*-----------------------------------*/
// -- Global --
const timer = 2000;
const MAX_CHARS = 150;

const textareaEL = document.querySelector(".form__textarea");
const counterEL = document.querySelector(".counter");
const formEL = document.querySelector(".form");
const feddsEL = document.querySelector(".feedbacks");
const submitEL = document.querySelector(".submit-btn");

const inputHandler = () => {
  const CharsTyped = textareaEL.value.length;

  const charsLeft = MAX_CHARS - CharsTyped;

  // number of charaters left
  counterEL.textContent = charsLeft;
};

textareaEL.addEventListener("input", inputHandler);

//form component

const submitHandler = (event) => {
  event.preventDefault();
  const text = textareaEL.value;

  if (text.includes("#") && text.length >= 5) {
    showVisualIndicator("valid");
  } else {
    showVisualIndicator("invalid");
    textareaEL.focus();
    return;
  }

  //to do job

  const hashtag = text.split(" ").find((word) => word.includes("#"));
  const company = hashtag.substring(1);
  const badgeLetter = company.substring(0, 1).toUpperCase();
  const upvoteCount = 0;
  const dayAgo = 0;

  const feedItem = `
    <li class="feedback">
        <button class="upvote">
            <i class="fa-solid fa-caret-up upvote__icon"></i>
            <span class="upvote__count">${upvoteCount}</span>
        </button>
        <section class="feedback__badge">
            <p class="feedback__letter">${badgeLetter}</p>
        </section>
        <div class="feedback__content">
            <p class="feedback__company">${company}</p>
            <p class="feedback__text">${text}</p>
        </div>
        <p class="feedback__date">${dayAgo === 0 ? "NEW" : `${dayAgo}d`}</p>
    </li>
`;
  feddsEL.insertAdjacentHTML("beforeend", feedItem);
  textareaEL.value = "";
  submitEL.blur();
  counterEL.textContent = MAX_CHARS;
};

const showVisualIndicator = (textCheck) => {
  const className = textCheck === "valid" ? "form--valid" : "form--invalid";
  formEL.classList.add(className);
  setTimeout(() => {
    formEL.classList.remove(className);
  }, timer);
};

formEL.addEventListener("submit", submitHandler);

fetch("https://bytegrad.com/course-assets/js/1/api/feedbacks")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.feedbacks.forEach((feedItem) => {
      const feedsItem = `
    <li class="feedback">
        <button class="upvote">
            <i class="fa-solid fa-caret-up upvote__icon"></i>
            <span class="upvote__count">${feedItem.upvoteCount}</span>
        </button>
        <section class="feedback__badge">
            <p class="feedback__letter">${feedItem.badgeLetter}</p>
        </section>
        <div class="feedback__content">
            <p class="feedback__company">${feedItem.company}</p>
            <p class="feedback__text">${feedItem.text}</p>
        </div>
        <p class="feedback__date">${
          feedItem.daysAgo === 0 ? "NEW" : `${feedItem.daysAgo}d`
        }</p>
    </li>
`;
      feddsEL.insertAdjacentHTML("beforeend", feedsItem);
    });
  });
