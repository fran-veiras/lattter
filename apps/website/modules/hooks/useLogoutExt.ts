import React, { useContext, useEffect } from 'react'
import { sendToBackgroundViaRelay } from '@plasmohq/messaging'

export const useLoginOutExt = () => {
    async function sendMessageToPopup() {
        try {
            const resp = await sendToBackgroundViaRelay({
                extensionId: process.env.NEXT_PUBLIC_URL?.includes('localhost')
                    ? 'nogbneadalakcefjdejijcdaaahljpah'
                    : 'mkofbeekindfpnocfdlfbfcppepipboj',
                // @ts-ignore
                name: 'ping',
                body: 'not_auth',
            })

            console.log('res', resp)
        } catch (error) {
            console.log('err', error)
        }
    }

    sendMessageToPopup()
}
