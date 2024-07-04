import { useToast } from '@/components/ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import moment from 'moment'

const useCreateFolder = () => {
    const { toast } = useToast()

    const createFolder = async ({ name }: { name: string }) => {
        const folderName = name.trim().replace(/(\r\n|\n|\r)/gm, '')

        try {
            if (name) {
                await axios
                    .post(`${process.env.NEXT_PUBLIC_URL}/api/folders/create`, {
                        name: folderName,
                    })
                    .then(() => {
                        return toast({
                            title: 'Successfully created folder',
                            description: `${moment()}`,
                        })
                    })
                    .catch(() => {
                        return toast({
                            title: 'There was a problem creating the folder',
                            description: `${moment()}`,
                            variant: 'destructive',
                        })
                    })
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error)
            return toast({
                title: 'There was a problem creating the folder',
                description: `${moment()}`,
                variant: 'destructive',
            })
        }
    }

    const mutation = useMutation({
        mutationFn: ({ name }: { name: string }) => {
            return createFolder({ name })
        },
    })

    return mutation
}

export default useCreateFolder
