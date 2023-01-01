describe('[cd-list]', () => {
  before(browser => browser.navigateTo('cd-list'))
  it ('[cd-list] renders', (browser) => {
    browser.waitForElementVisible('ul', 100000).end()
  })
})