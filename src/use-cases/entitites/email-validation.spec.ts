import { Email } from './email'

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
    const email = `${'l'.repeat(65)}@email.com`
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept string larger than 320 chars', () => {
    const email = `${'l'.repeat(159)}@${'d'.repeat(80)}.${'d'.repeat(80)}`
    expect(Email.validate(email)).toBeFalsy()
  })
})
