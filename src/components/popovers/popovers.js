import "./popovers.css";

export default class Popovers {
  constructor() {
    this.popoverList = [];
  }

  showPopover(title, message, element) {
    const popoverElement = document.createElement("div");
    popoverElement.classList.add("popover");
    const popoverTitle = document.createElement("div");
    popoverTitle.classList.add("popover-title");
    popoverTitle.textContent = title;
    popoverElement.appendChild(popoverTitle);
    const popoverText = document.createElement("div");
    popoverText.classList.add("popover-text");
    popoverText.textContent = message;
    popoverElement.appendChild(popoverText);
    const id = performance.now();
    this.popoverList.push({
      id,
      element: popoverElement,
    });
    document.body.appendChild(popoverElement);
    const { left, top } = element.getBoundingClientRect();
    popoverElement.style.left =
      left + element.offsetWidth / 2 - popoverElement.offsetWidth / 2 + "px";
    popoverElement.style.top = top - popoverElement.offsetHeight - 8 + "px";
    return id;
  }

  removePopover(id) {
    const popoverList = this.popoverList.find((p) => p.id === id);
    popoverList.element.remove();
    this.popoverList = this.popoverList.filter((p) => p.id !== id);
  }
}
