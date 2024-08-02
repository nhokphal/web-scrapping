// "use server";

// import { revalidatePath } from "next/cache";
// import puppeteer from "puppeteer";

// export async function scrapProducts(url: string) {
//   try {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     const navigationPromsie = page.waitForNavigation({
//       waitUntil: "networkidle0",
//       timeout: 120000,
//     });

//     await page.goto(url, {
//       waitUntil: "networkidle0",
//       timeout: 120000,
//     });

//     const delay = (time: number) => {
//       return new Promise((resolve) => setTimeout(resolve, time));
//     };
//     // await page.addScriptTag({
//     //   url: "https://code.jquery.com/jquery-3.7.0.js",
//     // });
//     await navigationPromsie;

//     const isJqueryLoaded = await page.evaluate(() => !!window?.jQuery);
//     if (!isJqueryLoaded) {
//       throw new Error("jquery not loaded");
//     }

//     const data = await page.evaluate(() => {
//       const title = $(".summery  .title").text().trim();
//       return { title };
//     });

//     delay(30000);
//     console.log("data", { ...data });

//     await browser.close();
//     revalidatePath("/");
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }
