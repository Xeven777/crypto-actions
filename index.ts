import { writeFileSync } from "fs";
interface Currency {
  usd: number;
  inr: number;
}

interface CryptoData {
  bitcoin: Currency;
  dogecoin: Currency;
  tether: Currency;
  solana: Currency;
  ethereum: Currency;
}
async function getValues() {
  const apikey = process.env.APIKEY || "123";
  const currency = encodeURIComponent("usd,inr");
  const ids = encodeURIComponent("bitcoin,ethereum,dogecoin,tether,solana");
  const url = "https://api.coingecko.com/api/v3/simple/price";
  try {
    const res = await fetch(
      url + `?ids=${ids}&vs_currencies=${currency}&x_cg_demo_api_key=${apikey}`,
      {
        method: "GET",
      }
    );
    const data = (await res.json()) as CryptoData;
    const formatterINR = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    });
    const formatterUSD = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    const timestamp = new Date().toLocaleString();

    const content = `
![Crypto](https://www.techguide.com.au/wp-content/uploads/2020/11/crypto3.jpeg)

# Cryptocurrency Prices 🪙📈

#### Get the latest cryptocurrency prices in USD and INR for top 5 cryptocurrencies.

## Bitcoin

**Price:** ${formatterUSD.format(data.bitcoin?.usd ?? 0)} (in USD) & ${formatterINR.format(data.bitcoin?.inr ?? 0)} (in INR)

## Ethereum

**Price:** ${formatterUSD.format(data.ethereum?.usd ?? 0)} (in USD) & ${formatterINR.format(data.ethereum?.inr ?? 0)} (in INR)

## Solana

**Price:** ${formatterUSD.format(data.solana?.usd ?? 0)} (in USD) & ${formatterINR.format(data.solana?.inr ?? 0)} (in INR)

## Tether

**Price:** ${formatterUSD.format(data.tether?.usd ?? 0)} (in USD) & ${formatterINR.format(data.tether?.inr ?? 0)} (in INR)

## Dogecoin

**Price:** ${formatterUSD.format(data.dogecoin?.usd ?? 0)} (in USD) & ${formatterINR.format(data.dogecoin?.inr ?? 0)} (in INR)

> _Last Updated: ${timestamp} (in GMT)_
`;

    writeFileSync("README.md", content);
  } catch (error) {
    console.error("Error: ", error);
  }
}
getValues();
