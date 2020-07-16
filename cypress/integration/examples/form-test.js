describe('form test', () => {
    it('test that the form is working', () =>{
        cy.visit('/')

        cy.get('[name="name"]')
        .type('Jacob Ekegren')
        .should('have.value', 'Jacob Ekegren')

        const email = 'j@j.com';
        cy.get('[name="email"]')
        .type(email)
        .should('have.value', email)

        const password = '1234asdf';
        cy.get('[name="password"]')
        .type(password)
        .should('have.value', password)

        cy.get('[for="terms"] > input')
        .click()
        .should('have.checked', true)

        cy.get('button#submitButton')
        .should('not.be.disabled')


    })
})