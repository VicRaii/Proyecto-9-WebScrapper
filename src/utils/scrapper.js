const puppeteer = require("puppeteer");
const fs = require("fs");

const lakersStoreArray = [];

const scrapper = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(url);

  await page.waitForSelector("[data-trk-id='reject-marketing-cookies']");
  const rejectButton = await page.$("[data-trk-id='reject-marketing-cookies']");

  if (rejectButton) {
    await rejectButton.click();
  }

  repeat(page, browser);
};

const repeat = async (page, browser) => {
  const arrayDivs = await page.$$(".column");

  for (const productDiv of arrayDivs) {
    let price = await productDiv.$eval(".money-value", (el) =>
      parseFloat(el.textContent.slice(0, el.textContent.length - 1))
    );
    let name = await productDiv.$eval(
      "[data-talos='linkSearchResult']",
      (el) => el.textContent
    );
    let img = await productDiv.$eval(".product-image", (el) => el.src);

    try {
      const product = {
        name,
        price,
        img,
      };
      lakersStoreArray.push(product);
    } catch (error) {
      console.log("Error al pushear ", error);
    }
  }

  try {
    await page.$eval("[data-talos=linkSearchResultsNextPage]", (el) =>
      el.click()
    );

    await page.waitForNavigation();
    repeat(page, browser);
  } catch (error) {
    write(lakersStoreArray);
    await browser.close();
  }
};

const write = (lakersStoreArray) => {
  fs.writeFile("LakersProducts.json", JSON.stringify(lakersStoreArray), () => {
    console.log("File written");
  });
};

module.exports = { scrapper };
