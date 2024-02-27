async function searchWord() {
  const wordInput = document.getElementById('wordInput').value.trim();
  const meaningDisplay = document.getElementById('meaningDisplay');
  const errorDisplay = document.getElementById('errorDisplay');
  const closeOption = document.getElementById('closeOption');

  meaningDisplay.innerHTML = '';
  errorDisplay.innerHTML = '';
  closeOption.style.display = 'none';

  if (!/^[a-zA-Z]+$/.test(wordInput)) {
    errorDisplay.textContent = 'Error !! Invalid input. Please enter only alphabets.';
    closeOption.style.display = 'block';
    return;
  }

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`);
    if (!response.ok) {
      throw new Error('Word not found');
    }
    const data = await response.json();
    displayMeanings(data);
  } catch (error) {
    errorDisplay.textContent = 'Error !! Something Went Wrong';
    closeOption.style.display = 'block';
  }
}

const showElementButton = document.getElementById('showElementButton');
const showDetails = document.getElementById('show-details');
const closeButton = document.getElementById('closeButton');

showElementButton.addEventListener('click', () => {
  showDetails.classList.remove('hidden');
});

closeButton.addEventListener('click', () => {
  showDetails.classList.add('hidden');
})

function displayMeanings(data) {
  const meaningDisplay = document.getElementById('meaningDisplay');
  const closeOption = document.getElementById('closeOption');
  const wordInput = document.getElementById('wordInput').value.trim();
  const wordSearched = document.createElement('div');
  wordSearched.classList.add('word-searched');
  wordSearched.textContent = `${wordInput}`;
  meaningDisplay.appendChild(wordSearched);
  for (const entry of data) {
    for (const meaning of entry.meanings) {
      const partOfSpeech = meaning.partOfSpeech;
      for (const definitionObj of meaning.definitions) {
        const definition = definitionObj.definition;
        const meaningElement = document.createElement('div');
        meaningElement.textContent = `${partOfSpeech}: ${definition}`;
        meaningDisplay.appendChild(meaningElement);
      }
    }
  }
  closeOption.style.display = 'block';
}

function closeDetails() {
  const meaningDisplay = document.getElementById('meaningDisplay');
  const closeOption = document.getElementById('closeOption');
  meaningDisplay.innerHTML = '';
  closeOption.style.display = 'none';
}