import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SettingsForm } from 'modules/dashboard/dashboard/settings/SettingsForm.component'

export default async function Settings() {
    return (
        <main className="w-full justify-center flex my-8">
            <Tabs defaultValue="account" className="min-w-[40%]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="Billing">Billing</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <SettingsForm />
                    </Card>
                </TabsContent>
                <TabsContent value="Billing">
                    <Card>
                        <CardHeader>
                            <CardTitle>Billing</CardTitle>
                            <CardDescription>
                                Billing is not available for the beta.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    )
}
