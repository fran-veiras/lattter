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

    async function sendMessageToPopup() {
        try {
            const resp = await sendToBackgroundViaRelay({
                extensionId: process.env.NEXT_PUBLIC_EXTENSION_ID,
                // @ts-ignore
                name: 'ping',
                body: userData,
            })

            console.log('res', resp)
        } catch (error) {
            console.log('err', error)
        }
    }

    sendMessageToPopup()
}
