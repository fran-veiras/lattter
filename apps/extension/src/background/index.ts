import { Storage } from '@plasmohq/storage'

import '@plasmohq/messaging/background'

export {}

console.log(
    'Live now; make now always the most precious time. Now will never come again.',
)

// status of savingItem action
function sendStatus(status: string | boolean, href: string) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            { action: 'savingItem', status, href },
            function (response) {
                if (response.type == 'success') {
                    console.log('Saving status open')
                }
            },
        )
    })
}

// process to save link
// 1st: check the service worker action
// 2nd: normalize information (assistant context, get folder, save item)
// 3rd: creates item

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    const storage = new Storage()
    const session = await storage.get('lattter-session')
    const sessionParsed =
        session && session !== 'not_auth' && JSON.parse(session)

    if (request.action === 'openExtension') {
        chrome.windows.create({
            url: chrome.runtime.getURL('popup.html'),
            type: 'popup',
            width: 348,
            height: 400,
        })
    }

    // item content to save
    const content = request.message && JSON.parse(request.message)

    if (request.action === 'saveItem') {
        try {
            let cleanedLink = content.href.replace(/"/g, '')

            if (sessionParsed?.access_token) {
                // status of save item process
                sendStatus('loading', content.href)

                // link normalization (used to folder name) E.g. https://lattter.com/post/123 -> lattter
                function processLink(url) {
                    if (url.includes('twitter.com')) {
                        return 'X'
                    }

                    const urlParts = url.split('//')
                    if (urlParts.length > 1) {
                        const domain = urlParts[1].split('/')[0]
                        const mainDomain = domain.split('.').slice(-2).join('.')
                        return mainDomain.split('.')[0]
                    }
                    return url
                }

                const folderName = processLink(cleanedLink)

                // returns the folder id, if it exists, otherwise creates.
                const data = {
                    folderName: folderName,
                    link: cleanedLink,
                    content: content.text,
                    type: content.type,
                }

                const response = await fetch(
                    `${
                        process.env.PLASMO_PUBLIC_URL?.includes('localhost')
                            ? 'http://localhost:3000'
                            : 'https://www.lattter.com'
                    }/api/folders/createItem`,
                    {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: sessionParsed.access_token,
                        },
                        body: JSON.stringify(data),
                    },
                )

                if (response.ok) {
                    console.log('saved', response)

                    sendStatus('success', content.href)
                    sendResponse('saved')
                }
            }
        } catch (err) {
            console.log('error', err)
            sendStatus(false, content.href)
            sendResponse(false)
        }
    }
})
