export class Person {
  getName (): string {
    const obj = {
      name: 'Cleyton Gama'
    }
    return obj?.name
  }
}
