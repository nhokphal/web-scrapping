"use server";

import { revalidatePath } from "next/cache";
import { Html } from "next/document";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET() {
  try {
    const url = "https://www.khmer24.com/en/jobs/jobs-information-technology";
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

    interface itemProps {
      title: string;
      price: string;
    }

    const data = await page.evaluate(() => {
      const features: string[] = [];
      const title = $(".content .item .item-header").text().trim();
      const salary = $(".content .item .item-header .span.salary red")
        .text()
        .trim();
      const description = $("p.post-description").text().trim();

      $(".relate-jobs-content")
        .children()
        .each(function () {
          features?.push($(this).text());
        });

      return { title };
    });

    await brower.close();
    revalidatePath("/");

    return NextResponse.json({ ...data });
  } catch (error) {
    console.log(error);
    return null;
  }
}
