/*-----------------------------------*\
  #script.js
\*-----------------------------------*/

const textareaEL = document.querySelector(".form__textarea");
const counterEL = document.querySelector(".counter");
const formEL = document.querySelector(".form");
const feddsEL = document.querySelector(".feedbacks");
const submitEL = document.querySelector(".submit-btn");
const timer = 2000;

const inputHandler = () => {
  const maxChars = 150;

  const CharsTyped = textareaEL.value.length;

  const charsLeft = maxChars - CharsTyped;

  // number of charaters left
  counterEL.textContent = charsLeft;
};

textareaEL.addEventListener("input", inputHandler);

//submit component
const submitHandler = (event) => {
  event.preventDefault();
  const text = textareaEL.value;

  if (text.includes("#") && text.length >= 5) {
    formEL.classList.add("form--valid");
    changeClass("form--valid");
  } else {
    formEL.classList.add("form--invalid");
    changeClass("form--invalid");
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
  counterEL.textContent = "150";
};

function changeClass(className) {
  setTimeout(() => {
    formEL.classList.remove(className);
  }, timer);
}

formEL.addEventListener("submit", submitHandler);
