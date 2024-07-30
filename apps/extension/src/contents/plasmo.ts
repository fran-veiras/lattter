import Logo from 'data-base64:~/../assets/Logo.svg'
import LogoError from 'data-base64:~/../assets/LogoError.svg'
import LogoPending from 'data-base64:~/../assets/LogoPending.svg'
import LogoSaved from 'data-base64:~/../assets/LogoSaved.svg'
import type { PlasmoCSConfig } from 'plasmo'

import { relayMessage, sendToBackground } from '@plasmohq/messaging'
import { Storage } from '@plasmohq/storage'

export const config: PlasmoCSConfig = {
    matches: [
        'http://localhost:3000/*',
        'https://x.com/*',
        'https://twitter.com/*',
        'https://www.lattter.com/*',
    ],
}
;async () => {
    await sendToBackground({
        name: 'ping',
        body: null,
    })
}

// Bookmark icon for major social media platforms.
const addSaveButton = async () => {
    const storage = new Storage()
    const session = await storage.get('lattter-session')
    const sessionParsed =
        session && session !== 'not_auth' && JSON.parse(session)

    // Returns all documents with data-testid equal to 'tweet'. Currently, it's only available to X.
    const tweets = document.querySelectorAll('article[data-testid="tweet"]')

    // Returns all saved items. It's important to know what you have previously saved.
    const savedItems = await storage.get('saved-items')

    let savedItemsParsed = savedItems ? JSON.parse(savedItems) : []

    // Applies the bookmark icon to all found tweets.
    tweets.forEach(async tweet => {
        // If the tweet element doesn't have the bookmark, it applies.
        if (!tweet.querySelector('.save-button')) {
            // Section to apply the bookmark.
            const targetDiv = tweet.querySelector('div[role="group"]')

            // Bookmark link.
            const a = tweet.querySelector(
                'a[href*="status"]',
            ) as HTMLAnchorElement

            if (targetDiv) {
                const saveDiv = document.createElement('div')
                saveDiv.className = 'save-button-container'
                saveDiv.style.display = 'inline-block'
                saveDiv.style.marginLeft = '10px'
                saveDiv.style.zIndex = '9999'
                saveDiv.style.display = 'flex'
                saveDiv.style.alignItems = 'center'
                saveDiv.style.justifyContent = 'center'

                // If the div doesn't have the bookmark, it creates.
                if (!tweet.querySelector('.save-button')) {
                    const saveBookmark = document.createElement('img')
                    saveBookmark.alt = 'Guardar'
                    saveBookmark.style.width = '20px'
                    saveBookmark.style.height = '20px'
                    saveBookmark.style.cursor = 'pointer'
                    saveBookmark.className = 'save-button'
                    saveBookmark.id = `${a.href}`

                    // Checks if the link was previously saved and determines which icon to show.
                    if (
                        Array.isArray(savedItemsParsed) &&
                        savedItemsParsed.includes(`${a.href}`)
                    ) {
                        saveBookmark.src = LogoSaved
                    } else {
                        saveBookmark.src = Logo
                    }

                    // Creates the save link event.
                    saveBookmark.addEventListener('click', async event => {
                        if (a) {
                            // Stop other propagation events on click.
                            event.stopPropagation()
                            if (sessionParsed?.access_token) {
                                Array.isArray(savedItemsParsed) &&
                                    savedItemsParsed.push(`${a.href}`)

                                // Returns the tweet text content.
                                const tweetTextElement = tweet.querySelector(
                                    'div[lang]',
                                ) as HTMLElement
                                const tweetText = tweetTextElement
                                    ? tweetTextElement.innerText
                                    : 'No text content'

                                // Sends a message to save the item.
                                const saveItemAction =
                                    await chrome.runtime.sendMessage({
                                        action: 'saveItem',
                                        message: JSON.stringify({
                                            href: a.href,
                                            text: tweetText,
                                            type: 'POST',
                                        }),
                                    })

                                // Save the item in local storage to maintain a list of previously saved items.
                                if (saveItemAction === 'saved') {
                                    await storage.set(
                                        'saved-items',
                                        JSON.stringify(savedItemsParsed),
                                    )
                                }
                            } else {
                                chrome.runtime.sendMessage({
                                    action: 'openExtension',
                                    message: 'not_auth',
                                })
                            }
                        }
                    })

                    // Change the bookmark icon based on the current status of the 'savingItem' action.
                    const savingItemListener = async (
                        request,
                        sender,
                        sendResponse,
                    ) => {
                        // 1st: Verify that this is the desired action `savingItem`.
                        // 2nd: Check that the request.href is equal to the element's href to correctly change the bookmark icon.
                        if (
                            request.action === 'savingItem' &&
                            request.href === a.href
                        ) {
                            const status = request.status

                            const logos = {
                                loading: LogoPending,
                                success: LogoSaved,
                                error: LogoError,
                            }

                            if (status) {
                                saveBookmark.src = logos[status]
                            }

                            sendResponse({ type: 'success' })
                        }
                    }

                    // Add message listener to listen 'savingItem' action.
                    chrome.runtime.onMessage.addListener(savingItemListener)

                    // Add saveBookmark to saveDiv
                    saveDiv.appendChild(saveBookmark)
                    // Add saveDiv to targetDiv
                    targetDiv.appendChild(saveDiv)
                }
            }
        }
    })
}
addSaveButton()

// Create a mutation observer to listen for mutations (document.body) such as new tweets or posts.
const observer = new MutationObserver(addSaveButton)
observer.observe(document.body, { childList: true, subtree: true })

relayMessage({
    //@ts-ignore
    name: 'ping',
})
