"use server";

import { revalidatePath } from "next/cache";
import puppeteer from "puppeteer";

export async function scrapProducts(url: string) {
  try {
    const brower = await puppeteer.launch({ headless: false });
    const page = await brower.newPage();
    const navigationPromsie = page.waitForNavigation({
      waitUntil: "networkidle0",
      timeout: 120000,
    });

    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 120000,
    });

    await page.addScriptTag({
      url: "https://code.jquery.com/jquery-3.7.0.js",
    });
    await navigationPromsie;

    const isJqueryLoaded = await page.evaluate(() => !!window?.jQuery);
    if (!isJqueryLoaded) {
      throw new Error("jquery not loaded");
    }

    const data = await page.evaluate(() => {
      const title = $(".summery  .title").text().trim();
      const price = $("p.detail truncate truncate-2 > span.salary red")
        .text()
        .trim();
      const description = $("p.post-description").text().trim();
      const features: string[] = [];

      $(".relate-jobs-content")
        .children()
        .each(function () {
          features?.push($(this).text());
        });

      return { title, price, description, features };
    });

    await brower.close();
    revalidatePath("/");

    return { ...data, url };
  } catch (error) {
    console.log(error);
    return null;
  }
}
