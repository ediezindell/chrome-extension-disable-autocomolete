import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

import type { Option } from "./types"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

const storage = new Storage()

  ; (async () => {
    const options = (await storage.get<Option[]>("options")) ?? []

    options
      .filter(({ url }) => location.href.startsWith(url))
      .forEach(({ url, selector }) => {
        const elements = document.querySelectorAll(selector)
        elements.forEach((element) => {
          element.setAttribute("autocomplete", "off")
        })
        console.log(
          `Removed autocomplete from ${elements.length} elements matching ${selector} on ${url}`
        )
      })
  })()

export { }
