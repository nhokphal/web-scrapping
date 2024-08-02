"use server";

import { revalidatePath } from "next/cache";
import { Html } from "next/document";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
declare const window: any;

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export async function GET() {
  try {
    const url = "https://www.khmer24.com/en/jobs/jobs-information-technology";
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const navigationPromsie = page.waitForNavigation({
      waitUntil: "networkidle0",
      timeout: 120000,
    });

    delay(1000);
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 120000,
    });

    delay(1000);

    await page.addScriptTag({
      url: "https://code.jquery.com/jquery-3.7.0.js",
    });
    await navigationPromsie;

    const isJqueryLoaded = await page.evaluate(() => !!window?.jQuery);
    if (!isJqueryLoaded) {
      throw new Error("jquery not loaded");
    }

    const data = await page.evaluate(() => {
      const elements: any = Array.from(
        document.querySelectorAll(".content .item")
      );

      return elements.map((element: any) => {
        const titleElement = element.querySelector(".item-header .item-title");
        const priceElement = element.querySelector(
          ".item-detail .item-fields .value.red"
        );
        const categoryElement = element.querySelector(
          ".item-detail .item-fields li:first-child .value"
        );

        const imageElement = element
          .querySelector(".item-image .img-contain")
          ?.getAttribute("src");
        const hrefElement = element.querySelector(".item a:first-child").href;

        const title = titleElement ? titleElement.innerHTML.trim() : "";
        const salary = priceElement ? priceElement.innerHTML.trim() : "";
        const category = categoryElement
          ? categoryElement.innerHTML.trim()
          : "";
        const image = imageElement
          ? imageElement
          : "https://www.khmer24.com/v1.1.1/template/img/image-placeholder.png";

        const href = hrefElement ? hrefElement : "";

        console.log("image ", href);

        return { title, salary, category, image, href };
      });
    });

    await browser.close();
    revalidatePath("/");

    return NextResponse.json({ ...data });
  } catch (error) {
    console.log(error);
    return null;
  }
}
