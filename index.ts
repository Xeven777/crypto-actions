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
    const bitcoinUSD = formatterUSD.format(data.bitcoin.usd);
    const bitcoinINR = formatterINR.format(data.bitcoin.inr);
    const ethereumUSD = formatterUSD.format(data.ethereum.usd);
    const ethereumINR = formatterINR.format(data.ethereum.inr);

    const timestamp = new Date().toLocaleString();

    const content = `
![Crypto](https://www.techguide.com.au/wp-content/uploads/2020/11/crypto3.jpeg)

# Cryptocurrency Prices 🪙📈

#### Get the latest cryptocurrency prices in USD and INR for top 5 cryptocurrencies.

## Bitcoin

**Price:** ${bitcoinUSD} (in USD) & ${bitcoinINR} (in INR)

## Ethereum

**Price:** ${ethereumUSD} (in USD) & ${ethereumINR} (in INR)

> _Last Updated: ${timestamp}_
`;

    writeFileSync("README.md", content);
  } catch (error) {
    console.error("Error: ", error);
  }
}
getValues();
