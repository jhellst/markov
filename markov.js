/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {

    const chains = {};

    for (let i = 1; i <= this.words.length; i++) {

      const key = this.words[i - 1]
      const value = this.words[i] || null;

      if (key in chains) {
        chains[key].push(value);
      } else {
        chains[key] = [value];
      }
    }

    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {

    let text = "";
    let curWord = this.words[0];

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
    while (curWord) {

      const curWordOptions = this.chains[curWord];
      const index = Math.round(Math.random() * (this.chains[curWord].length - 1));
      const nextWord = curWordOptions[index];
      text += curWord + " ";

      curWord = nextWord;
    }

    return text;
  }
}


module.exports = {
  MarkovMachine,
};