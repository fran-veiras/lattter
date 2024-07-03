import Logo from "data-base64:~/../assets/Logo.svg"
import type {
  PlasmoCSConfig,
  PlasmoCSUIProps,
  PlasmoGetOverlayAnchor
} from "plasmo"
import { useEffect, useState, type FC } from "react"

import { useStorage } from "@plasmohq/storage/hook"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

const AnchorTypePrinter: FC<PlasmoCSUIProps> = ({ anchor }) => {
  const [isTextSelected, setIsTextSelected] = useState(false)
  const [isShow, setIsShow] = useState(true)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [selectedText, setSelectedText] = useState("")
  const [session] = useStorage("lattter-session")
  const sessionParsed = session && session !== "not_auth" && JSON.parse(session)

  const handleMouseUp = (event: MouseEvent) => {
    const selection = window.getSelection()

    if (selection && selection.toString().length > 10) {
      setPosition({
        top: event.clientY + window.scrollY,
        left: event.clientX + window.scrollX
      })
      setSelectedText(selection.toString())
      setIsTextSelected(true)
      setIsShow(true)
    } else {
      setIsTextSelected(false)
      setSelectedText("")
      setIsShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  async function saveQuote() {
    if (sessionParsed?.access_token) {
      setIsShow(false)
      // Sends a message to save the item.
      const saveItemAction = await chrome.runtime.sendMessage({
        action: "saveItem",
        message: JSON.stringify({
          href: `"${window.location.href}"`,
          text: selectedText,
          type: "QUOTE"
        })
      })
    }
  }

  return isTextSelected ? (
    <span
      onClick={() => saveQuote()}
      style={{
        position: "absolute",
        top: `${position.top + 20}px`,
        left: `${position.left}px`,
        backgroundColor: "#F5F7F8",
        borderRadius: "4px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        display: isShow ? "inline" : "none"
      }}>
      <div
        style={{
          width: "full",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "4px"
        }}>
        <img src={Logo} width={"18px"} height={"18px"} />
      </div>
    </span>
  ) : null
}

export default AnchorTypePrinter
