import countryList from "./country_code.js";
// TODO: CURRENCY API
const Base_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
// TODO: FOR OPTIONS => FROM USD ... TO PKR
const dropDown = document.querySelectorAll(".dropdown select");
dropDown.forEach((select) => {
  for (const code of Object.keys(countryList)) {
    //   console.log(code);
    let options = document.createElement("option");
    options.innerText = code;
    options.value = code;
    if (select.name === "from" && code === "USD") {
      options.selected = "selected";
    } else if (select.name === "to" && code === "PKR") {
      options.selected = "selected";
    }
    select.append(options);
  }
  select.addEventListener("change", (e) => {
    flafimgUpdate(e.target);
  });
});
// TODO: flagupdate
const flafimgUpdate = (element) => {
  let countryCode = element.value;
  let currCode = countryList[countryCode];
  //   console.log(currCode);
  let ImgUpdate = element.parentElement.querySelector("img");
  let newImg = `https://flagsapi.com/${currCode}/shiny/64.png`;
  ImgUpdate.src = newImg;
};
//TODO:  form button
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amount = document.querySelector("input");
  let amountValue = amount.value;
  //   console.log(amountValue);
  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amount.value = "1";
  }
  console.log(fromCurr.value, toCurr.value);
  const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`;
  try {
    let response = await fetch(URL);
    // console.log(response);
    let dataRate = await response.json();
    // console.log(dataRate);
    let Rate =
      dataRate[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(Rate);
    let finalAmount = (amountValue * Rate).toFixed(2);
    // console.log(finalAmount);
    msg.innerText = `${amountValue} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;
  } catch (error) {
    console.log(error);
  }
});
