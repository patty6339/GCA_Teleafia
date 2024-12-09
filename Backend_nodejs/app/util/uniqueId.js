
class UniqueIdentifierGenerator {
  constructor() {
    this.generatedIdentifiers = new Set();
    this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  }

  generateRandomCode(length) {
    let result = '';
    const charactersLength = this.characters.length;
    for (let i = 0; i < length; i++) {
      result += this.characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  generateUniqueIdentifier() {
    let identifier;
    do {
      identifier = this.generateRandomCode(5);
    } while (this.generatedIdentifiers.has(identifier));
    
    this.generatedIdentifiers.add(identifier);
    return identifier;
  }
}


module.exports = UniqueIdentifierGenerator
