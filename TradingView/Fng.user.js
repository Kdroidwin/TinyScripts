// ==UserScript==
// @name         Fear and Greed Index on Trading View
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Display Fear and Greed Index on Trading View
// @author       jet_btc
// @match        https://jp.tradingview.com/chart/*
// @grant        GM_xmlhttpRequest
// @connect      api.alternative.me
// ==/UserScript==

// 更新間隔(時)
const Interval = 12


let con = document.createElement("span")
function fetchData() {
  GM_xmlhttpRequest({
    method: "GET",
    url: "https://api.alternative.me/fng",
    onload: response => {
      const data = JSON.parse(response.response).data[0]
      console.log(data)
      con.innerText = `Fng: ${data.value} (${data.value_classification})`
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