describe('Example Component', () => {
  it('debe de ser mayor a 10', () => {
    // Arrange.
    let value = 5;

    // Act.
    value = value + 8;

    // Assert.
    expect(value).toBeGreaterThan(10);
  })
})