import aria from '@/common/list-aria-role'
describe('list aria role', () => {
    test('xyz is not valid list aria role', () => {
        expect(aria.validateListRole('xyz')).toBeFalsy()
    })
    test('tablist is valid list aria role', () => {
        expect(aria.validateListRole('tablist')).toBeTruthy()
    })
})
describe('item aria role validator', () => {
    test('xyz is not valid list item aria role', () => {
        expect(aria.validateItemRole('xyz')).toBeFalsy()
    })
    test('tab is valid list item aria role', () => {
        expect(aria.validateItemRole('tab')).toBe(true)
    })
})