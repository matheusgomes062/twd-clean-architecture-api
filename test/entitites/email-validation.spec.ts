import { Email } from '../../src/entitites'

describe('Email validation', () => {
  test('should not accept null strings', () => {
    const email = null
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty strings', () => {
    const email = ''
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should accept valid email', () => {
    const email = 'any@mail.com'
    expect(Email.validate(email)).toBeTruthy()
  })

  test('should not accept local part larger than 64 chars', () => {
    const email = `${'l'.repeat(64)}@${'d'.repeat(128)}.${'d'.repeat(127)}`
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept a domain larger than 255 chars', () => {
    const email = `local@${'d'.repeat(128)}.${'d'.repeat(127)}`
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept a local larger than 64', () => {
    const email = `${'l'.repeat(65)}@mail.com`
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept an empty local', () => {
    const email = '@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty domain', () => {
    const email = 'any@'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept domain with a part larger than 63 chars', () => {
    const email = `any@${'d'.repeat(64)}.com`
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part with invalid characters', () => {
    const email = 'any @email.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part with invalid chars', () => {
    const email = 'any..email@email.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part with "." before "@"', () => {
    const email = 'any.@email.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept email without an at-sign', () => {
    const email = 'anyemail.com'
    expect(Email.validate(email)).toBeFalsy()
  })
})
