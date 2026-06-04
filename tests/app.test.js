const { Builder, By, until } = require('selenium-webdriver');

async function testApp() {
  const chrome = require('selenium-webdriver/chrome');
  const options = new chrome.Options();
  options.addArguments('--headless');
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('http://localhost:3000/');
    
    const timeToWaitFor = 5000; // tempo máximo de espera em milissegundos
    const textToWaitFor = 'Selenium'; // texto que esperamos encontrar na página
    const textToSearchFor = 'Selenium WebDriver'; // texto que queremos pesquisar

    await driver.wait(until.titleContains('Página de Exemplo'), timeToWaitFor);

    // Aguarda o campo de busca estar presente e interage com ele
    const searchBox = await driver.wait(
            until.elementLocated(By.name('p')),
            timeToWaitFor
        );
    await searchBox.sendKeys(textToSearchFor);
    await searchBox.submit();

    // Aguarda a nova aba ser criada
    await driver.wait(async () => {
      const handles = await driver.getAllWindowHandles();
      return handles.length > 1;
    }, timeToWaitFor);

    // Obtém as abas e muda para a nova
    const handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[1]);

    await driver.wait(async () => {
      const bodyText = await driver.findElement(By.tagName('body')).getText();
      return bodyText.includes(textToWaitFor);
    }, timeToWaitFor); 

    await driver.wait(until.titleContains(textToWaitFor), timeToWaitFor);
  } finally {
    await driver.quit();
  }
};

test('Application', async () => {await testApp()});
