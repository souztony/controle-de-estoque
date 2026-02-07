describe('Stock Control Flow', () => {
  it('should allow material creation and verify it exists', () => {
    cy.visit('/materials');
    cy.contains('New Material').click();
    cy.get('input[placeholder="Ex: RAW-001"]').type('TEST-MAT-01');
    cy.get('input[placeholder="Ex: Aluminum Ingot"]').type('Test Material');
    cy.get('input[type="number"]').type('100');
    cy.contains('Save Material').click();
    
    cy.contains('Test Material').should('be.visible');
    cy.contains('#TEST-MAT-01').should('be.visible');
  });

  it('should allow product creation with component association', () => {
    cy.visit('/products');
    cy.contains('New Product').click();
    cy.get('input[placeholder="e.g. FURN-001"]').type('PROD-01');
    cy.get('input[placeholder="e.g. Luxury Chair"]').type('Test Product');
    cy.get('input[placeholder="0.00"]').type('50');
    
    cy.contains('+ Add Component').click();
    cy.get('select').select('Test Material');
    cy.get('input[placeholder="0.0"]').type('2');
    
    cy.contains('Save Product').click();
    cy.contains('Test Product').should('be.visible');
    cy.contains('Test Material').should('be.visible');
  });

  it('should show production suggestions', () => {
    cy.visit('/');
    cy.contains('Producible Items').should('be.visible');
    cy.contains('Test Product').should('be.visible');
    cy.contains('50 units').should('be.visible'); // 100 / 2 = 50
  });
});
