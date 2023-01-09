describe('elementsCount demo', function () {
  it('demo test', function(browser) {
    browser.navigateTo('cd-list')
    .waitForElementVisibile('ul')
    .assert.elementsCount('li.country-row', 10);

    const limitElement = element('input[id=limit]')
    browser.click('input[id=limit]').assert
  })
})