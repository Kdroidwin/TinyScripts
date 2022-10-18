// ==UserScript==
// @name         ALT Season Index on Trading View
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Display ALT Season Index on Trading View
// @author       jet_btc
// @match        https://jp.tradingview.com/chart/*
// @grant        GM_xmlhttpRequest
// @connect      www.blockchaincenter.net
// ==/UserScript==

// 更新間隔(時)
const Interval = 12


let con = document.createElement("span")
function fetchData() {
  GM_xmlhttpRequest({
    method: "GET",
    url: "https://www.blockchaincenter.net/en/altcoin-season-index/",
    onload: result => {
      let parser = new DOMParser();
      let doc = parser.parseFromString(result.response, "text/html");
      let index = doc.querySelector(
        "#season > div > div > div:nth-child(3) > div:nth-child(1)"
      );
      index = parseInt(index.innerText);
      let value_classification
      if (index > 75) value_classification = "Alt Season!";
      else if (index > 25) value_classification = "Not Alt Season";
      else value_classification = "Bitcoin Season";
      con.innerText = `Alt Season Index: ${index} (${value_classification})`
    },
    withCredentials: true,
  })
}

window.onload = () => {
  con.style.margin = "0 15px 0 0"
  document.body.prepend(con)
  fetchData()
  setInterval(fetchData, 1000 * 60 * 60 * Interval)
}