const { Builder, By, until } = require('selenium-webdriver');

async function testGoogle() {
  const chrome = require('selenium-webdriver/chrome');
  const options = new chrome.Options();
  options.addArguments('--headless');
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('https://www.google.com');
    
    const timeToWaitFor = 5000; // tempo máximo de espera em milissegundos
    const textToWaitFor = 'Selenium'; // texto que esperamos encontrar na página
    const textToSearchFor = 'Selenium WebDriver'; // texto que queremos pesquisar
    const searchBox = await driver.wait(
        until.elementLocated(By.name('q')),
        timeToWaitFor
    );
    await searchBox.sendKeys(textToSearchFor);
    await searchBox.submit();

    await driver.wait(until.titleContains(textToWaitFor), timeToWaitFor);
  } finally {
    await driver.quit();
  }
};

test('Google', async () => {await testGoogle()});
