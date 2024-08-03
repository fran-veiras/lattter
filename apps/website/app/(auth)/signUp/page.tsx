import { AccessToApp } from '@/components/access/Access.component'

export default function SignUp() {
    return (
        <div className="w-full flex relative justify-center items-center">
            <div className="lights-brand w-full !left-0 top-0" />
            <div className="lights-brand w-full !right-0 bottom-0" />
            <AccessToApp type_of_mode="signup" />
        </div>
    )
}
