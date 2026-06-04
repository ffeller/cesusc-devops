const { Builder, By, until } = require('selenium-webdriver');

async function testBing() {
  const chrome = require('selenium-webdriver/chrome');
  const options = new chrome.Options();
  //options.addArguments('--headless');
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();


  try {
    await driver.get('https://www.bing.com');
    
    let searchBox = await driver.findElement(By.id('sb_form_q'));
    await searchBox.sendKeys('Selenium WebDriver');
    await searchBox.submit();

    await driver.wait(until.titleContains('Selenium'), 5000);
  } finally {
    await driver.quit();
  }
};

test('Bing', async () => {await testBing()});
