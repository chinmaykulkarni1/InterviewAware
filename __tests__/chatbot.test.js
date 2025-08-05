const { parseQuestion } = require('../js/chatbot');

describe('parseQuestion', () => {
  it('parses valid question JSON', () => {
    const json = JSON.stringify({
      question: 'What is Ohm\'s law?',
      choices: ['V=IR','P=VI','I=VR','R=VI'],
      answer: 0,
      explanation: 'Ohm\'s law states V = I R.'
    });
    const q = parseQuestion(json);
    expect(q.question).toMatch(/Ohm/);
    expect(q.choices).toHaveLength(4);
    expect(q.answer).toBe(0);
  });

  it('throws on invalid data', () => {
    const bad = JSON.stringify({question:'Bad', choices:['A'], answer:0});
    expect(()=>parseQuestion(bad)).toThrow('Invalid choices');
  });
});
