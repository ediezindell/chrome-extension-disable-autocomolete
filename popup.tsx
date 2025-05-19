import { useEffect } from "react"

function IndexPopup() {
  useEffect(() => {
    chrome.runtime.openOptionsPage()
  }, [])
}

export default IndexPopup
