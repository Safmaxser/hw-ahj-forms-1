/**
 * @jest-environment jsdom
 */

import Popovers from "../popovers";

describe("testing the popovers components", () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <form novalidate>
        <input type="text" required>
      </form>
    `;
  });

  test("testing class Popovers method showPopover for correctness of title creation", () => {
    const input = document.querySelector("input");
    const popoversFactory = new Popovers();
    const idPopover = popoversFactory.showPopover(
      "Popover-title-1",
      "Popover-message-1",
      input,
    );
    popoversFactory.showPopover("Popover-title-2", "Popover-message-2", input);
    const popoverElement = popoversFactory.popoverList.find(
      (p) => p.id === idPopover,
    ).element;
    const popoverTitle =
      popoverElement.querySelector(".popover-title").textContent;
    expect(popoverTitle).toBe("Popover-title-1");
  });

  test("testing class Popovers method showPopover for correctness of message creation", () => {
    const input = document.querySelector("input");
    const popoversFactory = new Popovers();
    popoversFactory.showPopover("Popover-title-1", "Popover-message-1", input);
    const idPopover = popoversFactory.showPopover(
      "Popover-title-2",
      "Popover-message-2",
      input,
    );
    const popoverElement = popoversFactory.popoverList.find(
      (p) => p.id === idPopover,
    ).element;
    const popoverText =
      popoverElement.querySelector(".popover-text").textContent;
    expect(popoverText).toBe("Popover-message-2");
  });

  test("testing class Popovers method show Popover for correct adding to popoverList", () => {
    const input = document.querySelector("input");
    const popoversFactory = new Popovers();
    popoversFactory.showPopover("Popover-title-1", "Popover-message-1", input);
    popoversFactory.showPopover("Popover-title-2", "Popover-message-2", input);
    popoversFactory.showPopover("Popover-title-3", "Popover-message-3", input);
    expect(popoversFactory.popoverList.length).toBe(3);
  });

  test("testing class Popovers method remove Popover for correct removal", () => {
    expect.assertions(2);
    const input = document.querySelector("input");
    const popoversFactory = new Popovers();
    popoversFactory.showPopover("Popover-title-1", "Popover-message-1", input);
    const idPopover = popoversFactory.showPopover(
      "Popover-title-2",
      "Popover-message-2",
      input,
    );
    popoversFactory.showPopover("Popover-title-3", "Popover-message-3", input);
    popoversFactory.removePopover(idPopover);
    const nonExistent = popoversFactory.popoverList.find(
      (p) => p.id === idPopover,
    );
    expect(popoversFactory.popoverList.length).toBe(2);
    expect(nonExistent).toBe(undefined);
  });

  afterAll(() => {
    document.body.innerHTML = "";
  });
});
