import { sendToBackgroundViaRelay } from '@plasmohq/messaging'
import moment from 'moment'

export const useLoginInExt = async ({
    tokens,
}: {
    tokens: {
        access_token: string | undefined
        refresh_token: string | undefined
    }
}) => {
    const userData = {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        env: process.env.NEXT_PUBLIC_URL,
        time: `${moment()}`,
    }

    async function connectExtension(): Promise<{
        message: string
        code: string
    }> {
        return new Promise((resolve, reject) => {
            let timeoutHandler: NodeJS.Timeout

            timeoutHandler = setTimeout(() => {
                resolve({
                    code: 'NOT_INSTALLED',
                    message:
                        'Make sure you have the extension installed correctly.',
                })
            }, 10000)

            sendToBackgroundViaRelay({
                extensionId: process.env.NEXT_PUBLIC_EXTENSION_ID,
                // @ts-ignore
                name: 'ping',
                body: userData,
            })
                .then(res => {
                    clearTimeout(timeoutHandler)
                    resolve(res)
                })
                .catch(error => {
                    clearTimeout(timeoutHandler)
                    resolve({
                        code: 'NOT_INSTALLED',
                        message: 'The extension is not installed.',
                    })
                })
        })
    }

    async function sendCredentialsToExtension() {
        try {
            const response = await connectExtension()

            return response
        } catch (error) {
            console.error('Error:', error)
            return {
                code: 'NOT_INSTALLED',
                message: 'The extension is not installed.',
            }
        }
    }

    return await sendCredentialsToExtension()
}
