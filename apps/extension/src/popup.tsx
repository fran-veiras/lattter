import LattterLogo from 'data-base64:~/../assets/Lattter.svg'
import { useEffect, useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import '~style.css'

import { Loader } from 'lucide-react'

import { sendToBackground } from '@plasmohq/messaging'

import { Button } from '~components/AnimatedButton'
import { RetroGrid } from '~components/RetroGrid'

const USER_STATES = {
    NOT_FOUND: null,
    LOADING: undefined,
}

function IndexPopup() {
    const [session] = useStorage('lattter-session')
    const [isLoading, setIsLoading] = useState(false)
    const [currentUrl, setCurrentUrl] = useStorage('current-window-link')
    const [user, setUser] = useState(USER_STATES.LOADING)
    const [savedItems, setSavedItems] = useStorage('saved-items')
    let savedItemsParsed = savedItems ? JSON.parse(savedItems) : []

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const activeTab = tabs[0]
            const activeTabUrl = activeTab.url
            setCurrentUrl(activeTabUrl)
        })

        async function getUser() {
            if (session === 'not_auth') {
                setUser(USER_STATES.NOT_FOUND)
                return
            }

            setUser(USER_STATES.LOADING)
            const sessionParsed = session && JSON.parse(session)

            if (sessionParsed && sessionParsed?.access_token) {
                if (sessionParsed?.user) {
                    setUser(sessionParsed?.user)
                } else {
                    setUser(USER_STATES.NOT_FOUND)
                    return
                }
            } else if (session === 'not_auth') {
                setUser(USER_STATES.NOT_FOUND)
            }
        }

        getUser()
    }, [session])

    const handleSignIn = () => {
        chrome.tabs.create({ url: 'https://www.lattter.com/signIn' })
    }

    const saveLink = async () => {
        if (currentUrl) {
            setIsLoading(true)
            const sessionParsed = session && JSON.parse(session)

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

            const folderName = processLink(currentUrl)

            const data = {
                folderName: folderName,
                link: currentUrl,
                content: '',
                type: 'PAGE',
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
                Array.isArray(savedItemsParsed) &&
                    savedItemsParsed.push(currentUrl)

                await setSavedItems(JSON.stringify(savedItemsParsed))
            }

            setIsLoading(false)
        }
    }

    return (
        <div className="#fff w-[348px] h-full">
            <div className="flex w-full flex-col">
                <div className="w-full flex p-4 border-b border-gray-200 items-center">
                    <img
                        src={LattterLogo}
                        className="w-28"
                        alt="Some pretty cool image"
                    />
                </div>
                <div className="p-4 w-full h-full">
                    {user === USER_STATES.LOADING && (
                        <h2 className="text-lg font-light">
                            Cargando usuario...
                        </h2>
                    )}
                    {user === USER_STATES.NOT_FOUND && (
                        <>
                            <h2 className="text-lg font-light my-2">
                                Your AI research and study co-pilot, ensuring
                                your compliance.
                            </h2>
                            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
                                <Button
                                    onClick={handleSignIn}
                                    className="p-2"
                                    gradient_blur={true}
                                >
                                    Sign in to start
                                </Button>
                                <RetroGrid />
                            </div>
                        </>
                    )}
                    {user && (
                        <div className="w-full flex flex-col gap-2">
                            <h2 className="text-md font-light my-2">
                                {currentUrl
                                    ? currentUrl.length > 20
                                        ? `${currentUrl.substring(0, 50)}...`
                                        : currentUrl
                                    : user.email}
                            </h2>
                            {Array.isArray(savedItemsParsed) &&
                                !savedItemsParsed.includes(currentUrl) && (
                                    <Button
                                        onClick={saveLink}
                                        className="p-2 w-full"
                                        gradient_blur={true}
                                    >
                                        {isLoading && (
                                            <Loader
                                                strokeWidth="1px"
                                                className="mx-2 h-4 w-4 animate-spin"
                                            />
                                        )}
                                        {!isLoading && 'Save link'}
                                    </Button>
                                )}
                        </div>
                    )}
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default IndexPopup
