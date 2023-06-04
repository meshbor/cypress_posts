import React from 'react'
import { CyExample } from './cyExample'

describe('<CyExample />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CyExample />)
    cy.get('input[type="text"]').type('hello').should('have.value', 'hello')
    cy.get('button').click()
    cy.contains('Click me').click()
  })
})
