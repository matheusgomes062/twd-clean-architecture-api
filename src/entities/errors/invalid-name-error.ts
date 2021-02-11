export class InvalidNameError extends Error {
    public readonly name = 'InvalidNameError'
    constructor (name: String) {
      super('Invalid name: ' + name + '.')
    }
}
