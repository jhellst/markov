const {MarkovMachine, text1} = require("./markov")
let machine;
let emptyMachine;

beforeAll(function(){
  machine = new MarkovMachine("The cat in the hat.");
  emptyMachine = new MarkovMachine("");
});

describe("test getChains()", function(){
  test("get expected chains from input", function(){
    expect(machine.getChains()).toEqual(
      {
        "The": ["cat"],
        "cat": ["in"],
        "in": ["the"],
        "the": ["hat."],
        "hat.": [null],
        }
    )
  })

  test("get chains with no input", function(){
    expect(emptyMachine.getChains()).toEqual({ "":[null] });
  })
});

describe("test getText()", function(){
  test("get expected text ouptut with limited chains", function(){
    expect(machine.getText()).toEqual("The cat in the hat.");
  })

  test("check valid output on complex chain structure", function(){
    const largeMachine = new MarkovMachine(text1);

    const output = largeMachine.getText().split(" ");

    for (let i = 1; i < output.length; i++) {
      const previous = output[i-1];
      let current = output[i];
      expect(largeMachine.chains[previous]).toContain(current);
    }

  })

})
