'use client'
import { UserDataContext } from '@/components/provider'
import { Button } from '@/components/ui/button'
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { submitData } from 'app/(dashboard)/dashboard/settings/actions'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useContext, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

type Inputs = {
    name: string
}

export const SettingsForm = () => {
    const { user, userDetails } = useContext(UserDataContext)
    const route = useRouter()
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async data => {
        setLoading(true)
        const res = await submitData(data)

        if (res) {
            route.refresh()
        }

        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                    Make changes to your account here. Click save when you're
                    done.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1 ">
                    <p>Name</p>
                    <Input
                        {...register('name', { required: true, maxLength: 25 })}
                        className="!ring-0"
                        name="name"
                        id="name"
                        defaultValue={
                            userDetails?.name ?? user?.user_metadata?.name ?? ''
                        }
                    />
                    {errors.name?.type === 'required' && (
                        <p role="alert">Name is required</p>
                    )}
                    {errors.name?.type === 'maxLength' && (
                        <p role="alert">Name is too long</p>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <Button disabled={!!errors?.name} type="submit">
                    {loading && (
                        <Loader
                            strokeWidth="1px"
                            className="mx-2 h-4 w-4 animate-spin"
                        />
                    )}
                    {!loading && 'Save changes'}
                </Button>
            </CardFooter>
        </form>
    )
}
