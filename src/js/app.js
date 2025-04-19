import Popovers from "../components/popovers/popovers";
const form = document.querySelector(".form");

const errors = {
  login: {
    valueMissing: "Введите ваш login!",
  },
  email: {
    valueMissing: "Введите ваш email!",
    typeMismatch: "Не корректное значение - email!",
  },
  "credit-card": {
    valueMissing: "Введите номер вашей credit card!",
    patternMismatch: "Не корректное значение - credit card!",
  },
};

const popoversFactory = new Popovers();
let actualMessages = [];
const showPopover = (message, el) => {
  actualMessages.push({
    name: el.name,
    id: popoversFactory.showPopover(el.name, message, el),
  });
};

const getError = (el) => {
  const errorKey = Object.keys(ValidityState.prototype).find((key) => {
    if (!el.name) return;
    if (key === "valid") return;
    return el.validity[key];
  });
  if (!errorKey) return;
  return errors[el.name][errorKey];
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  actualMessages.forEach((message) =>
    popoversFactory.removePopover(message.id),
  );
  actualMessages = [];
  const elements = form.elements;
  [...elements].some((elem) => {
    const error = getError(elem);
    if (error) {
      showPopover(error, elem);
      return true;
    }
  });
});
