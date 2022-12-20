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
    //генерирую карточки в режиме "Тренировки" по порядку
function learnWords() {

    return wordCards[wordIndex];
}

//генерирую карточки в режиме "Тренировки" по кнопке "Перемешать слова"
const btnMixing = document.querySelector('#shuffle-words');
btnMixing.addEventListener('click', shuffle(wordCards));

// вставляем первое слова в карточку
let wordCurrent = learnWords();
addWord();
//функция вставки последующих слов
function addWord() {
    wordCurrent = learnWords();
    let foreignWord = wordCurrent.eng;
    let translationWord = wordCurrent.rus;
    let exampleWord = wordCurrent.example;

    foreignWordContainer.textContent = foreignWord;
    translationWordContainer.textContent = translationWord;
    exampleWordCotainer.textContent = exampleWord;
}
// листать слова с режиме Тренировка
const arrowBack = document.querySelector('#back');
const arrowNext = document.querySelector('#next');

arrowBack.addEventListener('click', (event) => {
    //покажи элемент массива-1  *индекс карточки
    wordIndex--;
    addWord();
    wordNumber.textContent = --wordNumber.textContent;
    blockingArrow(wordNumber.textContent);


})

arrowNext.addEventListener('click', (event) => {
    //покажи элемент массива+1     *индекс карточки
    wordIndex++;
    addWord();
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

//процент просмотренных слов
let percent = document.querySelector('#words-progress');
percent.textContent = `${totalNumberContainer.textContent * 100}%`;

//переключение режима
const btnExam = document.querySelector('#exam');

btnExam.addEventListener('click', (event) => {
    examMode.classList.toggle('hidden');
    studyMode.classList.toggle('hidden');
    studyCards.classList.toggle('hidden');
    makeRandomCards();

    /*  timeId = setInterval(() => {
          let [minutes, seconds] = time.textContent.split(':').map(Number);

          if (seconds < 59) {
              seconds++;
          } else {
              minutes++;
              seconds = 0;
          }

          time.textContent = `${format(minutes)}:${format(seconds)}`;
      }, 1000)*/
})

//функция перемешивания
function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}

//режим "Проверки знаний"
let examMode = document.querySelector('#exam-mode');


//место вставки для карточек слов
let examCards = document.querySelector('#exam-cards');
let cardExam;
let examCardsWord;

//расположение карточек в случайном порядке
function makeRandomCards() {
    //собираем слова в массив
    const words = [
        ...wordCards.map((item) => item.eng),
        ...wordCards.map((item) => item.rus)
    ];
    shuffle(words);

    //создание шаблонов карточек и их заполнение
    for (wordIndex = 0; wordIndex < words.length; wordIndex++) {
        cardExam = document.createElement('div');
        cardExam.classList.add('card');
        examCards.prepend(cardExam);
        examCardsWord = document.createElement('p');
        examCardsWord.textContent = words[wordIndex];
        cardExam.prepend(examCardsWord);

        cardExam.addEventListener('click', () => {
            cardExam.classList.add('correct');
        })

    }
}
//логика игры
/*
const highlighting = setTimeout(() => {
    twoCard.classList.remove('wrong');
    firstCard.classList.remove('correct');
}, 500); */

cardExam.addEventListener('click', () => {
    if (wordCards.findIndex(firstCard) == wordCards.findIndex(twoCard)) {
        twoCard.classList.add('correct');
        firstCard.classList.add('fade-out');
        twoCard.classList.add('fade-out');
    } else {
        twoCard.classList.add('wrong');
    }

    const highlighting = setTimeout(() => {
        twoCard.classList.remove('wrong');
        firstCard.classList.remove('correct');
    }, 500);
})

const dictionary = {
    apple: "яблоко",
    pear: "груша",
    ham: "ветчина",
    cheese: "сыр",
    cereals: "злаки",
    cat: "кот",
    dog: "собака",
    game: "игра",
    life: "жизнь",
    love: "любовь",
    pleasure: "удовольствие",
    dream: "мечта",
    wish: "желание"

}

//модальное окно о завершении игры
function finish() {
    if (wordCards.querySelector('.card') == null) {
        alert('Проверка знаний завершена');
    }
}



//при совпадении удалять карты

/*
//отображение времени тестирования
const time = document.querySelector('#time');
//получаем доступ к таймеру
let timeId;

//описываем формат времени таймера
function format(val) {
    if (val < 10) {
        return `0${val}`;
    }
    return val;
}*/