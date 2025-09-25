const allWords = ['1 جـ', '2 جـ', '5 جـ', '10 جـ', '15 جـ', '20 جـ', 'بيبسي', 'شيبسي', 'ليك هدية', 'تعيش وتاخد غيرها'];
let availableWords = [...allWords];
let randomizedWords = shuffle([...allWords]);
let clickedButtonsCount = 0;


const buttonsContainer = document.getElementById("buttonsContainer");
const leftWords = document.getElementById("leftWords");
const rightWords = document.getElementById("rightWords");

// عرض الكلمات الجانبية
function displaySideWords() {
  leftWords.innerHTML = '';
  rightWords.innerHTML = '';
  availableWords.forEach(word => {
    const wordDiv1 = document.createElement("div");
    wordDiv1.className = "word";
    wordDiv1.textContent = word;
    leftWords.appendChild(wordDiv1);

    const wordDiv2 = wordDiv1.cloneNode(true);
    rightWords.appendChild(wordDiv2);
  });
}

// إنشاء الأزرار
function createButtons() {
buttonsContainer.innerHTML = '';

const images = [
    'url("images/box1.jpg")',
    'url("images/box2.jpg")',
    'url("images/box3.jpg")',
    'url("images/box4.jpg")',
    'url("images/box5.jpg")',
    'url("images/box6.jpg")',
    'url("images/box7.jpg")',
    'url("images/box8.jpg")',
    'url("images/box9.jpg")'
];

    for (let i = 0; i < 9; i++) {
        const btn = document.createElement("button");
        btn.style.backgroundImage = images[i];
        btn.style.backgroundSize = "cover";
        btn.style.backgroundPosition = "center";
        // btn.style.height = "200px";
        // btn.style.width = "250px";
        btn.dataset.index = i;
        btn.addEventListener("click", handleButtonClick);
        buttonsContainer.appendChild(btn);
    }
    }

/*
function createButtons() {
    buttonsContainer.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const btn = document.createElement("button");
      btn.textContent = (i + 1).toString(); // الرقم من 1 إلى 9
      btn.dataset.index = i;
      btn.addEventListener("click", handleButtonClick);
      buttonsContainer.appendChild(btn);
    }
  }*/

// التعامل مع الضغط على الزر
function handleButtonClick(e) {
    const btn = e.target;
    const index = btn.dataset.index;
  
    if (btn.disabled) return;
  
    const word = randomizedWords[index];
    if (!availableWords.includes(word)) return;
  
    btn.style.backgroundImage = "none";
    btn.textContent = word;
    btn.disabled = true;
  
    availableWords = availableWords.filter(w => w !== word);
    updateSideWords();
  
    clickedButtonsCount++;
  
    // عند الضغط على الزر التاسع (آخر زر)
    if (clickedButtonsCount === 9) {
        const winBox = document.getElementById("winBox");
        const winWord = document.getElementById("winWord");
        winWord.textContent = word;
        winBox.style.display = "block";
    }
  }
  
  
/*
function handleButtonClick(e) {
    const btn = e.target;
    const index = btn.dataset.index;
  
    if (btn.disabled) return;
  
    const word = randomizedWords[index];
    if (!availableWords.includes(word)) return;
  
    // إزالة الخلفية
    btn.style.backgroundImage = "none";
  
    // عرض الكلمة بدل الصورة
    btn.textContent = word;
    btn.disabled = true;
  
    // إزالة الكلمة من الجانبين
    availableWords = availableWords.filter(w => w !== word);
    updateSideWords();
  }
  */

// تحديث الكلمات الجانبية بعد كل اختيار
function updateSideWords() {
  const leftDivs = leftWords.querySelectorAll('.word');
  const rightDivs = rightWords.querySelectorAll('.word');

  leftDivs.forEach(div => {
    if (!availableWords.includes(div.textContent)) {
      div.remove();
    }
  });

  rightDivs.forEach(div => {
    if (!availableWords.includes(div.textContent)) {
      div.remove();
    }
  });
}

// دالة لتوزيع العناصر عشوائياً
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// بدء التطبيق
displaySideWords();

createButtons();
