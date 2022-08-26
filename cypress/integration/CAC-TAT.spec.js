/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000
    beforeEach(() =>{
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('eq','Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function(){
        cy.clock()
        cy.get('[id = "firstName"]')
        .should('be.visible')
        .type('Bruno')

        cy.get('input[id = "lastName"]')
        .should('be.visible')
        .type('Mourao')

        cy.get('input[id = "email"]')
        .should('be.visible')
        .type('brunolmourao10@gmail.com')

        cy.get('textarea[id = "open-text-area"]')
        .should('be.visible')
        .type('Teste')

        cy.get('button[type ="submit"]')
        .should('be.visible')
        .click()

        cy.get('[class = "success"]')
        .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('[class = "success"]')
        .should('not.be.visible')

        
    })
    it('exibe mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', function(){
        cy.clock()

        cy.get('[id = "firstName"]')
        .should('be.visible')
        .type('Bruno')

        cy.get('input[id = "lastName"]')
        .should('be.visible')
        .type('Mourao')

        cy.get('input[id = "email"]')
        .should('be.visible')
        .type('brunolmourao10.gmail.com')

        cy.get('textarea[id = "open-text-area"]')
        .should('be.visible')
        .type('Teste')

        cy.get('button[type ="submit"]')
        .should('be.visible')
        .click()

        cy.get('[class = "error"]')
        .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('[class = "error"]')
        .should('not.be.visible')


    })
    it("o campo telefone só deve aceitar valores numéricos", function(){
        cy.get('input[id = "phone"]')
        .type('Test')
        .should('be.empty')
    })
    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário" , function(){
        cy.clock()

        cy.get('[id = "firstName"]')
        .should('be.visible')
        .type('Bruno')

        cy.get('input[id = "lastName"]')
        .should('be.visible')
        .type('Mourao')

        cy.get('input[id = "email"]')
        .should('be.visible')
        .type('brunolmourao10@gmail.com')

        cy.get('textarea[id = "open-text-area"]')
        .should('be.visible')
        .type('Teste')

        cy.get('input[id = "phone-checkbox"]')
        .check()

        cy.get('button[type ="submit"]')
        .should('be.visible')
        .click()

        cy.get('[class = "error"]')
        .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('[class = "error"]')
        .should('not.be.visible')
    })
    it('preenche e limpa os campos nome,sobrenome,email e telefone',function(){
        cy.get('[id = "firstName"]')
        .should('be.visible')
        .type('Bruno')
        .should('have.value','Bruno')
        .clear()
        .should('have.value','')

        cy.get('input[id = "lastName"]')
        .should('be.visible')
        .type('Mourao')
        .should('have.value','Mourao')
        .clear()
        .should('have.value','')

        cy.get('input[id = "email"]')
        .should('be.visible')
        .type('brunolmourao10@gmail.com')
        .should('have.value','brunolmourao10@gmail.com')
        .clear()
        .should('have.value','')

        cy.get('textarea[id = "open-text-area"]')
        .should('be.visible')
        .type('Teste')
        .should('have.value','Teste')
        .clear()
        .should('have.value','')
    })
    it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios",function(){
        cy.clock()
        
        cy.get('button[type ="submit"]')
        .contains('Enviar')
        .should('be.visible')
        .click()

        cy.get('[class = "error"]')
        .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        
        cy.get('[class = "error"]')
        .should('not.be.visible')

    })
    it("envia o formulário com sucesso usando um comando customizado (valor do campo)",function(){
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('[class = "success"]').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('[class = "success"]').should('not.be.visible')
    })
    it("selecionar o valor Youtube na seção produto",function(){
        cy.get('select[id = "product"]')
        .select('youtube')
        .should('have.value',"youtube")
    })
    it("selecionar o valor Blog na seção produto (texto do campo)",function(){
        cy.get('select[id = "product"]')
        .select('Blog')
        .should('have.value',"blog")
    })
    it("selecionar o valor Blog na seção produto (índicie do campo)",function(){
        cy.get('select[id = "product"]')
        .select(1)
        .should('have.value',"blog")
    })
    it("marcar o tipo de atendimento Feedback", function(){
        cy.get('input[name = "atendimento-tat"]').check().should('be.checked')
    })
    it("marcar cada tipo de atendimento", function(){
        cy.get('input[type = "radio"]').each(($el, index, $list) => {
            cy.wrap($el).check().should('be.checked')
        })
    })
    it("marca ambos checkboxes, depois desmarca o último",function(){
        cy.get('input[type = "checkbox"]').each(($el, index, $list) => {
            cy.wrap($el).check().should('be.checked')
        }).last().uncheck().should('not.be.checked')

    })
    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function(){
        cy.clock()

        cy.get('[id = "firstName"]')
        .should('be.visible')
        .type('Bruno')

        cy.get('input[id = "lastName"]')
        .should('be.visible')
        .type('Mourao')

        cy.get('input[id = "email"]')
        .should('be.visible')
        .type('brunolmourao10@gmail.com')

        cy.get('textarea[id = "open-text-area"]')
        .should('be.visible')
        .type('Teste')

        cy.get('input[id = "phone-checkbox"]')
        .check()

        cy.get('button[type ="submit"]')
        .should('be.visible')
        .click()

        cy.get('[class = "error"]')
        .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('[class = "error"]')
        .should('not.be.visible')
    })
    it("seleciona um arquivo da pasta fixtures",function(){
        cy.get('input[type = "file"]').selectFile('cypress/fixtures/example.json').then(input =>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it("seleciona um arquivo simulando drag-and-drop",function(){
        cy.get('input[type = "file"]').selectFile('cypress/fixtures/example.json',{action: 'drag-drop' }).then(input =>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias",function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type = "file"]').selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique",function(){
        cy.get('#privacy a').should('have.attr','target','_blank')
    })
    it("acessa a página da política de privacidade removendo o target e então clicanco no link",function(){
        cy.get('a').invoke('removeAttr','target').click()
    
        cy.contains('Talking About Testing').should('be.visible')
    })
    it('exibe mensagem por 3 segundos', function() {
        cy.clock() // congela o relógio do navegador

        cy.get('button[type ="submit"]') // (...) // ação que dispara algo que exibe uma mensagem por três segundos
        .click()
      
        cy.get('[class = "error"]').should('be.visible')// (...) // verificação de que a mensagem está visível
      
        cy.tick(3000) // avança o relógio três segundos (em milissegundos). Avanço este tempo para não perdê-lo esperando.
      
        cy.get('[class = "error"]').should('not.be.visible')// (...) // verificação de que a mensagem não está mais visível

      })
      it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('[class = "success"]')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('[class = "error"]')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })
      it('preenche a area de texto usando o comando invke' , function(){
          const longText = Cypress._.repeat('cotoco',20)

          cy.get('#open-text-area').invoke('val', longText).should('have.value', longText)

      })
      it('faz uma requisição HTTP',function(){
        cy.request({
            method: 'GET',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
          }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).contains('CAC TAT')
            expect(response.statusText).to.equal('OK')
        });
      })
      it('Encontrando o gato na página CAC TAT', function(){
        cy.get('#cat')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
      })

  })
