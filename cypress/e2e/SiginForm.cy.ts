describe('template spec', () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 720p monitor
    cy.viewport(1480, 920)
    cy.visit('/signin')
  })

  it('Проверяем элементы на странице', () => {
    // Проверяем, что есть заголовок Sign In в форме
    cy.get('form').get('h1').contains('Sign In')
    // наличие хедера
    cy.get('header').get('h6').contains('Home')
    // наличие футера
    cy.get('footer').get('p').contains('This is footer')
  })

  it('redirect to sign up', () => {
    cy.get('a[href="/signup"]').contains(`Don't have an account? Sign Up!`).click()
    cy.url().should('be.equal', 'http://localhost:5173/signup')
  })

  it('check form', () => {
    // Проверяем, что у первого child в форме лэйбл Email
    cy.get('form div:first-child label').contains('Email Address')
    // Проверяем, что у 2 child в форме лэйбл Password
    cy.get('form div:nth-child(2) label').contains('Password')
    // Проверяем, что кнопка в форме имеет тип сабмит и содержит нужные слова.
    cy.get('button[type="submit"]').contains('Sign In')

    // Проверяем, ошибок на валидацию пока нет
    cy.get('form div:first-child p').should('not.exist')
    cy.get('form div:nth-child(2) p').should('not.exist')

    cy.get('input[name="email"]').should('have.value', '')
    cy.get('input[name="password"]').should('have.value', '')
    cy.get('button[type="submit"]').click()
    cy.get('form label:first-child').contains('Email Address')

    // Проверяем,что  ошибки валидации появились
    cy.get('form div:first-child p').contains('email is a required field')
    cy.get('form div:nth-child(2) p').contains('password must be at least 6 characters')
    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('sig in and go to posts page', () => {
    // проверяем как работает логин
    cy.get('input[name="email"]').should('have.value', '').type('v20@mail.ru')
    cy.get('input[name="password"]').should('have.value', '').type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('be.equal', 'http://localhost:5173/')
    cy.get('header').get('a').contains('Posts').wait(7000).click()
    cy.url().should('be.equal', 'http://localhost:5173/posts')
    // post-list-id
    cy.get('div[id="post-list-id"]').children().should('have.length', 13)
  })
})
