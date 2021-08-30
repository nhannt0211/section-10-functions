'use strict';

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const numberAnswer = prompt(
      `${this.question}\n${this.options.join("\n")}\n(Write option number)
      `)
    if (!isNaN(numberAnswer)) {
      if (numberAnswer >= 0 && numberAnswer <= 3) {
        this.answers[numberAnswer]++;
      }
    }
    console.log("======== Task 4 ========");
    this.displayResults();
    this.displayResults("string");
  },

  displayResults(type = "array") {
    if (type == "array") {
      console.log(this.answers);
    } else if (type == "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  }
}

document.querySelector(".poll").addEventListener("click", poll.registerNewAnswer.bind(poll));

console.log("======== Task 5 ========");
poll.displayResults.call({ answers: [5, 2, 3] })
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "string")
