export interface IItem {
    type: 'POST' | 'PAGE' | 'QUOTE'
    id: number
    link: string | null
    user_id: string
    finished: boolean
    content: string[] | null
    category: Array<string>
    created_at: Date
    seen: number
}

export interface ITags {
    id: number
    created_at: Date
    category: string
    user_id: string
    times: number
}

export interface IFolder {
    id: number
    created_at: Date
    name: string
    user_id: string
    items?: IItem[]
}
