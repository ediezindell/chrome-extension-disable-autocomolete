import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import type { Option } from "./types"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

const Content = () => {
  const [options] = useStorage<Option[]>("options", [])

  useEffect(() => {
    if (!options) return

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
  }, [options])

  return null
}

export default Content
