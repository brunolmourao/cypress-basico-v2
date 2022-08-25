Cypress.Commands.add("fillMandatoryFieldsAndSubmit",function(){
    cy.get('[id = "firstName"]').type('Bruno')
    cy.get('input[id = "lastName"]').type('Mourao')
    cy.get('input[id = "email"]').type('brunolmourao10@gmail.com')
    cy.get('textarea[id = "open-text-area"]').type('Teste')
    cy.get('button[type ="submit"]').click()       
})