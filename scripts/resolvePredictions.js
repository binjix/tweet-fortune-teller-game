
// Example for backend integration: Yahoo Finance 2 Price Delta Script
// Not run in the browser! For backend automation only.

import yf from 'yahoo-finance2'

async function getDelta(symbol, publishedAt) {
  // build your 10-minute window
  const start = new Date(publishedAt.getTime() - 2 * 60000) // 2 min before
  const end   = new Date(publishedAt.getTime() + 8 * 60000) // 8 min after

  // fetch minute candles
  const quotes = await yf.historical(symbol, {
    period1: start.toISOString(),
    period2: end.toISOString(),
    interval: '1m'
  })

  if (!quotes?.length) throw new Error(`no data for ${symbol}`)

  const first = quotes[0].close
  const last  = quotes[quotes.length - 1].close
  return last - first
}

// Usage Example:
async function main() {
  const publishedAt = new Date(Date.now() - 20 * 60000) // pretend tweet was 20 min ago
  const deltaSPY = await getDelta('SPY', publishedAt)
  const deltaBTC = await getDelta('BTC-USD', publishedAt)
  console.log('SPY delta:', deltaSPY)
  console.log('BTC delta:', deltaBTC)
}
main()
