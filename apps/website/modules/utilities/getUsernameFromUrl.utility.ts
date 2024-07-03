export function getUsernameFromURL(url: string) {
    let username = ''

    // Check if the URL is from x.com or twitter.com
    const xComRegex = /^https?:\/\/(?:www\.)?x\.com\/([^\/?#]+)(?:[\/?#]|$)/i
    const twitterComRegex =
        /^https?:\/\/(?:www\.)?twitter\.com\/([^\/?#]+)(?:[\/?#]|$)/i

    const xComMatch = url.match(xComRegex)
    const twitterComMatch = url.match(twitterComRegex)

    if (xComMatch) {
        username = xComMatch[1]
    } else if (twitterComMatch) {
        username = twitterComMatch[1]
    }

    return username ? `@${username}` : null
}
