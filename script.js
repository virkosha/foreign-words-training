//режим "Тренировки"
let studyMode = document.querySelector('#study-mode');
let studyCards = document.querySelector('.study-cards');


//переворот карточки по клику
const flipCard = document.querySelector('.flip-card');
flipCard.addEventListener('click', (event) => {
    flipCard.classList.toggle('active');
})

//слова
let cardFront = document.querySelector('#card-front');
let foreignWordContainer = cardFront.querySelector('h1');

let cardBack = document.querySelector('#card-back');
let translationWordContainer = cardBack.querySelector('h1');
let exampleWordCotainer = cardBack.querySelector('span');

let wordIndex = 0;

const wordCards = [{
        eng: 'apple',
        rus: 'яблоко',
        example: 'qwertyqwerty xxxx'
    },
    {
        eng: 'pear',
        rus: 'груша',
        example: 'qwertyqwerty xxxx'
    },
    {
        eng: 'ham',
        rus: 'ветчина',
        example: 'qwertyqwerty xxxx'
    },
    {
        eng: 'cheese',
        rus: 'сыр',
        example: 'qwertyqwerty xxxx'
    },
    {
        eng: 'cereals',
        rus: 'злаки',
        example: 'qwertyqwerty xxxx'
    },
    {
        eng: 'cat',
        rus: 'кот',
        example: 'qwertyqwerty xxxx'
    },
    {
        eng: 'dog',
        rus: 'собака',
        example: 'qwertyqwerty xxxx'
    },
    {
        eng: 'game',
        rus: 'игра',
        example: 'qwertyqwerty xxxx'
    },
    {
        eng: 'life',
        rus: 'жизнь',
        example: 'qwertyqwerty xxxx'
    },
    {
        eng: 'love',
        rus: 'любовь',
        example: 'qwertyqwerty xxxx'
    },
    {
        eng: 'pleasure',
        rus: 'удовольствие',
        example: 'qwertyqwerty xxxx'
    },
    {
        eng: 'dream',
        rus: 'мечта',
        example: 'qwertyqwerty xxxx'
    },
    {
        eng: 'wish',
        rus: 'желание',
        example: 'qwertyqwerty xxxx'
    }
]

//генерирую слова по порядку в карточку в режиме "Тренировки"
function iterateArrayInOrder() {
    return wordCards[wordIndex];
}

//генерирую слова рандомно по кнопке "Перемешать слова" в режиме "Тренировки" 
function iterateArrayInRandom() {
    wordCards.sort(() => Math.random() - 0.5);
}
const btnMixing = document.querySelector('#shuffle-words');
btnMixing.addEventListener('click', iterateArrayInRandom());

insertFollowingWords(wordCards);
//функция вставки последующих слов
function insertFollowingWords(wordCards) {
    wordCurrent = iterateArrayInOrder();
    let foreignWord = wordCurrent.eng;
    let translationWord = wordCurrent.rus;
    let exampleWord = wordCurrent.example;

    foreignWordContainer.textContent = foreignWord;
    translationWordContainer.textContent = translationWord;
    exampleWordCotainer.textContent = exampleWord;
}

// листать слова в режиме Тренировка
const arrowBack = document.querySelector('#back');
const arrowNext = document.querySelector('#next');

arrowBack.addEventListener('click', (event) => {
    wordIndex--;
    insertFollowingWords();
    wordNumber.textContent = --wordNumber.textContent;
    blockingArrow(wordNumber.textContent);


})

arrowNext.addEventListener('click', (event) => {
    wordIndex++;
    insertFollowingWords();
    wordNumber.textContent = ++wordNumber.textContent;
    blockingArrow(wordNumber.textContent);

})


//счетсчик текущего слова
let wordNumber = document.querySelector('#current-word');
//общее количество слов в разделе
let totalNumberContainer = document.querySelector('#total-word');
let totalNumber = wordCards.length;
totalNumberContainer.textContent = totalNumber;



//блокировка стрелок, когда доходит до крайних слов (атрибут disabled)
function blockingArrow() {
    if (wordNumber.textContent >= wordCards.length) {
        arrowNext.setAttribute('disabled', 'true'); //блокирет вперед
        arrowBack.removeAttribute('disabled'); //нажимает назад
    }

    if (wordNumber.textContent > 1 && wordNumber.textContent !== wordCards.length && wordNumber.textContent < wordCards.length) {
        arrowNext.removeAttribute('disabled'); // нажимает назад
        arrowBack.removeAttribute('disabled'); //нажимает веперед
    }

    if (wordNumber.textContent <= 1) {
        arrowNext.removeAttribute('disabled'); //нажимает вперед
        arrowBack.setAttribute('disabled', 'true'); //блокирует назад
    }
}

/*
//процент просмотренных слов
let percent = document.querySelector('#words-progress');
percent.value = `${totalNumberContainer.textContent * 100 % 13}`;
*/

//переключение режима
const btnExam = document.querySelector('#exam');
//режим "Проверки знаний"
let examMode = document.querySelector('#exam-mode');

let listEng = [];
let listRus = [];
let examCards = document.querySelector('#exam-cards');


//заполнения поля карточками в рандомном порядке в режиме "Проверки знаний"
function spreadOutCardsInExamMode() {
    wordCards.forEach((elem) => {
        listEng.push(elem.eng);
        listRus.push(elem.rus);
    })
    let cardExam = document.createElement('div');
    cardExam.classList.add('card');
    listEng.forEach((elem) => {
        cardExam.textContent = elem;
    })
    listRus.forEach((elem) => {
        cardExam.textContent = elem;
    })

    examCards.prepend(cardExam);
}

console.log(listEng);
console.log(listRus);

btnExam.addEventListener('click', (event) => {
    examMode.classList.toggle('hidden');
    studyMode.classList.toggle('hidden');
    studyCards.classList.toggle('hidden');
    spreadOutCardsInExamMode();

    /* 
     timeId = setInterval(() => {
          let [minutes, seconds] = time.textContent.split(':').map(Number);

          if (seconds < 59) {
              seconds++;
          } else {
              minutes++;
              seconds = 0;
          }

          time.textContent = `${format(minutes)}:${format(seconds)}`;
      }, 1000);*/
})