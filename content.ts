import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

import type { Option } from "./types"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

const storage = new Storage()

const disableAutocomplete = ({ url, selector }: Option) => {
  const elements = document.querySelectorAll(selector)
  elements.forEach((element) => {
    element.setAttribute("autocomplete", "off")
  })
  console.log(
    `Disabled autocomplete from ${elements.length} elements matching ${selector} on ${url}`
  )
}

  ; (async () => {
    const allDisable = (await storage.get<boolean>("allDisable")) ?? false
    if (allDisable) {
      const selector = "input, textarea, select, form"
      disableAutocomplete({ url: "ALL_SITE", selector })
      return
    }

    const options = (await storage.get<Option[]>("options")) ?? []
    options
      .filter(({ url }) => location.href.startsWith(url))
      .forEach((option) => disableAutocomplete(option))
  })()

export { }
