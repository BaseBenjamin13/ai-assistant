
describe('Home', () => {

    it('should navigate to the products page', () => {
        cy.visit('http://localhost:3000/')

        cy.get('a[href*="https://reactjs.org"]')

        cy.contains('Learn React')

    })
})