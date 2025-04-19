import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000); // default puppeteer timeout

describe("testing the popovers component for correct operation in the application", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:8091";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      if (server.connected) {
        process.send("ok");
        resolve();
      } else {
        reject();
      }
    });

    const options = {
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // настройка для сред ci/cd
      slowMo: 100,
      // расскомментировать для локального прогона и закомменитровать для ci/cd
      // headless: false,
      // devtools: false,
    };

    browser = await puppeteer.launch(options);
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test("testing popover for correct display for login field when value is missing", async () => {
    expect.assertions(4);
    await page.goto(baseUrl);
    await page.waitForSelector(".form");
    const form = await page.$(".form");
    const inputLogin = await form.$('input[name="login"]');
    const submit = await form.$('button[type="submit"]');
    await submit.click();
    const popover = await page.$(".popover");
    const rectInput = await page.evaluate((inputLogin) => {
      const { top, left } = inputLogin.getBoundingClientRect();
      const width = inputLogin.offsetWidth;
      return { top, left, width };
    }, inputLogin);
    const rectPopover = await page.evaluate((popover) => {
      const { top, left } = popover.getBoundingClientRect();
      const width = popover.offsetWidth;
      const height = popover.offsetHeight;
      return { top, left, height, width };
    }, popover);
    const popoverTitle = await popover.$(".popover-title");
    const popoverText = await popover.$(".popover-text");
    const textPopoverTitle = await popoverTitle.evaluate(
      (el) => el.textContent,
    );
    const textPopoverText = await popoverText.evaluate((el) => el.textContent);
    const resultLeftPopover =
      rectInput.left + rectInput.width / 2 - rectPopover.width / 2;
    const resultTopPopover = rectInput.top - rectPopover.height - 8;
    expect(rectPopover.top).toBe(resultTopPopover);
    expect(rectPopover.left).toBe(resultLeftPopover);
    expect(textPopoverTitle).toBe("login");
    expect(textPopoverText).toBe("Введите ваш login!");
  });

  test("testing popover for correct display for email field when value is missing", async () => {
    expect.assertions(4);
    await page.goto(baseUrl);
    await page.waitForSelector(".form");
    const form = await page.$(".form");
    const inputLogin = await form.$('input[name="login"]');
    await inputLogin.type("admin");
    const inputEmail = await form.$('input[name="email"]');
    const submit = await form.$('button[type="submit"]');
    await submit.click();
    const popover = await page.$(".popover");
    const rectInput = await page.evaluate((inputEmail) => {
      const { top, left } = inputEmail.getBoundingClientRect();
      const width = inputEmail.offsetWidth;
      return { top, left, width };
    }, inputEmail);
    const rectPopover = await page.evaluate((popover) => {
      const { top, left } = popover.getBoundingClientRect();
      const width = popover.offsetWidth;
      const height = popover.offsetHeight;
      return { top, left, height, width };
    }, popover);
    const popoverTitle = await popover.$(".popover-title");
    const popoverText = await popover.$(".popover-text");
    const textPopoverTitle = await popoverTitle.evaluate(
      (el) => el.textContent,
    );
    const textPopoverText = await popoverText.evaluate((el) => el.textContent);
    const resultLeftPopover =
      rectInput.left + rectInput.width / 2 - rectPopover.width / 2;
    const resultTopPopover = rectInput.top - rectPopover.height - 8;
    expect(rectPopover.left).toBe(resultLeftPopover);
    expect(rectPopover.top).toBe(resultTopPopover);
    expect(textPopoverTitle).toBe("email");
    expect(textPopoverText).toBe("Введите ваш email!");
  });

  test("testing popover for correct display for email field when value is incorrect", async () => {
    expect.assertions(4);
    await page.goto(baseUrl);
    await page.waitForSelector(".form");
    const form = await page.$(".form");
    const inputLogin = await form.$('input[name="login"]');
    await inputLogin.type("admin");
    const inputEmail = await form.$('input[name="email"]');
    await inputEmail.type("admin");
    const submit = await form.$('button[type="submit"]');
    await submit.click();
    const popover = await page.$(".popover");
    const rectInput = await page.evaluate((inputEmail) => {
      const { top, left } = inputEmail.getBoundingClientRect();
      const width = inputEmail.offsetWidth;
      return { top, left, width };
    }, inputEmail);
    const rectPopover = await page.evaluate((popover) => {
      const { top, left } = popover.getBoundingClientRect();
      const width = popover.offsetWidth;
      const height = popover.offsetHeight;
      return { top, left, height, width };
    }, popover);
    const popoverTitle = await popover.$(".popover-title");
    const popoverText = await popover.$(".popover-text");
    const textPopoverTitle = await popoverTitle.evaluate(
      (el) => el.textContent,
    );
    const textPopoverText = await popoverText.evaluate((el) => el.textContent);
    const resultLeftPopover =
      rectInput.left + rectInput.width / 2 - rectPopover.width / 2;
    const resultTopPopover = rectInput.top - rectPopover.height - 8;
    expect(rectPopover.left).toBe(resultLeftPopover);
    expect(rectPopover.top).toBe(resultTopPopover);
    expect(textPopoverTitle).toBe("email");
    expect(textPopoverText).toBe("Не корректное значение - email!");
  });

  test("testing popover for correct display for credit-card field when value is missing", async () => {
    expect.assertions(4);
    await page.goto(baseUrl);
    await page.waitForSelector(".form");
    const form = await page.$(".form");
    const inputLogin = await form.$('input[name="login"]');
    await inputLogin.type("admin");
    const inputEmail = await form.$('input[name="email"]');
    await inputEmail.type("admin@admin.ru");
    const inputCard = await form.$('input[name="credit-card"]');
    const submit = await form.$('button[type="submit"]');
    await submit.click();
    const popover = await page.$(".popover");
    const rectInput = await page.evaluate((inputCard) => {
      const { top, left } = inputCard.getBoundingClientRect();
      const width = inputCard.offsetWidth;
      return { top, left, width };
    }, inputCard);
    const rectPopover = await page.evaluate((popover) => {
      const { top, left } = popover.getBoundingClientRect();
      const width = popover.offsetWidth;
      const height = popover.offsetHeight;
      return { top, left, height, width };
    }, popover);
    const popoverTitle = await popover.$(".popover-title");
    const popoverText = await popover.$(".popover-text");
    const textPopoverTitle = await popoverTitle.evaluate(
      (el) => el.textContent,
    );
    const textPopoverText = await popoverText.evaluate((el) => el.textContent);
    const resultLeftPopover =
      rectInput.left + rectInput.width / 2 - rectPopover.width / 2;
    const resultTopPopover = rectInput.top - rectPopover.height - 8;
    expect(rectPopover.left).toBe(resultLeftPopover);
    expect(rectPopover.top).toBe(resultTopPopover);
    expect(textPopoverTitle).toBe("credit-card");
    expect(textPopoverText).toBe("Введите номер вашей credit card!");
  });

  test("testing popover for correct display for credit-card field when value is incorrect", async () => {
    expect.assertions(4);
    await page.goto(baseUrl);
    await page.waitForSelector(".form");
    const form = await page.$(".form");
    const inputLogin = await form.$('input[name="login"]');
    await inputLogin.type("admin");
    const inputEmail = await form.$('input[name="email"]');
    await inputEmail.type("admin@admin.ru");
    const inputCard = await form.$('input[name="credit-card"]');
    await inputCard.type("1111");
    const submit = await form.$('button[type="submit"]');
    await submit.click();
    const popover = await page.$(".popover");
    const rectInput = await page.evaluate((inputCard) => {
      const { top, left } = inputCard.getBoundingClientRect();
      const width = inputCard.offsetWidth;
      return { top, left, width };
    }, inputCard);
    const rectPopover = await page.evaluate((popover) => {
      const { top, left } = popover.getBoundingClientRect();
      const width = popover.offsetWidth;
      const height = popover.offsetHeight;
      return { top, left, height, width };
    }, popover);
    const popoverTitle = await popover.$(".popover-title");
    const popoverText = await popover.$(".popover-text");
    const textPopoverTitle = await popoverTitle.evaluate(
      (el) => el.textContent,
    );
    const textPopoverText = await popoverText.evaluate((el) => el.textContent);
    const resultLeftPopover =
      rectInput.left + rectInput.width / 2 - rectPopover.width / 2;
    const resultTopPopover = rectInput.top - rectPopover.height - 8;
    expect(rectPopover.left).toBe(resultLeftPopover);
    expect(rectPopover.top).toBe(resultTopPopover);
    expect(textPopoverTitle).toBe("credit-card");
    expect(textPopoverText).toBe("Не корректное значение - credit card!");
  });
});
