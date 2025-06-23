export class AxiomEngine {
  constructor() {
    this.symbols = {
      logic: ['∧', '∨', '→', '¬', '∀', '∃'],
      math: ['∈', '⊆', '∪', '∩', '∅'],
      custom: []
    };
    this.ast = [];
  }

  addSymbol(symbol, type = 'logic') {
    const node = {
      id: crypto.randomUUID(),
      symbol,
      type,
      position: this._calculatePosition()
    };
    this.ast.push(node);
    return node;
  }

  validate() {
    const expr = this.ast.map(n => n.symbol).join(' ');
    return fetch('/api/validate', {
      method: 'POST',
      body: JSON.stringify({ expression: expr })
    }).then(res => res.json());
  }

  _calculatePosition() {
    return {
      x: Math.floor(Math.random() * 300),
      y: Math.floor(Math.random() * 300)
    };
  }
}
