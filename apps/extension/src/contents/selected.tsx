import Logo from 'data-base64:~/../assets/Logo.svg'
import type { PlasmoCSConfig, PlasmoCSUIProps } from 'plasmo'
import { useEffect, useRef, useState, type FC } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

export const config: PlasmoCSConfig = {
    matches: ['<all_urls>'],
}

const AnchorTypePrinter: FC<PlasmoCSUIProps> = ({ anchor }) => {
    const [isTextSelected, setIsTextSelected] = useState(false)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const [selectedText, setSelectedText] = useState('')
    const [session] = useStorage('lattter-session')
    const sessionParsed =
        session && session !== 'not_auth' && JSON.parse(session)
    const spanRef = useRef(null)

    const handleMouseUp = (event: MouseEvent) => {
        setPosition({
            top: event.clientY + window.scrollY,
            left: event.clientX + window.scrollX,
        })

        if (spanRef.current && !spanRef.current.contains(event.target)) {
            setIsTextSelected(false)
        }
    }

    function handleKeyDown(event: KeyboardEvent) {
        const selection = window.getSelection()

        if (event.altKey && selection && selection.toString().length > 10) {
            setSelectedText(selection.toString())
            setIsTextSelected(true)
        }
    }

    useEffect(() => {
        document.body.addEventListener('mouseup', handleMouseUp)
        document.body.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.removeEventListener('mouseup', handleMouseUp)
            document.body.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    async function saveQuote() {
        if (sessionParsed?.access_token) {
            const saveItemAction = await chrome.runtime.sendMessage({
                action: 'saveItem',
                message: JSON.stringify({
                    href: `"${window.location.href}"`,
                    text: selectedText,
                    type: 'QUOTE',
                }),
            })
        }
    }

    return isTextSelected ? (
        <span
            ref={spanRef}
            onClick={() => saveQuote()}
            style={{
                position: 'absolute',
                top: `${position.top + 20}px`,
                left: `${position.left}px`,
                backgroundColor: '#F5F7F8',
                borderRadius: '4px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                display: isTextSelected ? 'inline' : 'none',
            }}
        >
            {/* <h1>Save quote</h1> */}
            <div
                style={{
                    width: 'full',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '4px',
                }}
            >
                <img alt="" src={Logo} width={'18px'} height={'18px'} />
            </div>
        </span>
    ) : null
}

export default AnchorTypePrinter
