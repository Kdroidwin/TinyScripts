// ==UserScript==
// @name         Mem Tx Count on TradingView
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Display mempool transaction counts on Tradingview
// @author       jet_btc
// @match        https://jp.tradingview.com/chart/*
// @grant        GM_xmlhttpRequest
// @connect      mempool.space
// ==/UserScript==

// 更新間隔(分)
const Interval = 10
// 強調表示の閾値
const Threshold = 10000


let con = document.createElement("span")
function fetchData() {
  GM_xmlhttpRequest({
    method: "GET",
    url: "https://mempool.space/api/mempool",
    onload: response => {
      const count = JSON.parse(response.response).count
      con.innerText = "Tx Count: " + count
      if (count > Threshold) {
        con.style.color = "#e74c3c"
      } else {
        con.style.color = null
      }
    },
    withCredentials: true,
  })
}

window.onload = () => {
  con.style.margin = "0 15px 0 0"
  document.body.prepend(con)
  fetchData()
  setInterval(fetchData, 1000 * 60 * Interval)
}