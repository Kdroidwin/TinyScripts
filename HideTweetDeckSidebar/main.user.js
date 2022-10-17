// ==UserScript==
// @name         HideTweetDeckSidebar
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide the sidebar of the tweet deck
// @author       jet_btc
// @match        https://tweetdeck.twitter.com/
// @grant        none
// ==/UserScript==
let isHide = false
let button = document.createElement("button")
function toggleSideBar() {
  if (!isHide) {
    document.getElementsByClassName("app-content").item(0).style.left = 0
    document.getElementsByTagName("header").item(0).style.display = "none"
    button.innerText = "Show";
  } else {
    document.getElementsByClassName("app-content").item(0).style.left = "60px"
    document.getElementsByTagName("header").item(0).style.display = "block"
    button.innerText = "Hide";
  }
  isHide = !isHide
}

function appendToggleButton() {
  button.id = 'stopButton';
  button.onclick = toggleSideBar
  button.innerHTML = 'Hide';
  Object.assign(button.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: "1",
  });
  document.body.appendChild(button)
}

window.addEventListener("load", function () {
  appendToggleButton()
});