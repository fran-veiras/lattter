import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy - lattter',
}

export default function Privacy() {
    return (
        <main className="min-h-screen">
            <main className="mb-[10rem] mt-[10rem] mx-auto max-w-xl space-y-8">
                <h1 className="text-4xl font-bold">Privacy Policy</h1>
                <div className="space-y-4">
                    <p className="opacity-80">
                        This Privacy Policy establishes the terms in which
                        Lattter uses and protects the information that is
                        provided by its users when using its website. This
                        company is committed to the security of its users data.
                        When we ask you to fill out personal information fields
                        with which you can be identified, we do so ensuring that
                        it will only be used in accordance with the terms of
                        this document. However, this Privacy Policy may change
                        over time or be updated, so we recommend and emphasize
                        that you continually review this page to ensure that you
                        agree with such changes.
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                        Information that is collected
                    </h2>
                    <p className="opacity-80">
                        Our website may collect personal information such as:
                        Name, contact information such as your email address and
                        demographic information. Likewise, when necessary,
                        specific information may be required to process an order
                        or make a delivery or billing.
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                        Use of collected information
                    </h2>
                    <p className="opacity-80">
                        Our website uses the information in order to provide the
                        best possible service, particularly to maintain a record
                        of users, orders if applicable, and improve our products
                        and services. Emails may be sent periodically through
                        our site with special offers, new products and other
                        advertising information that we consider relevant to you
                        or that may provide you with some benefit, these emails
                        will be sent to the address you provide and may be
                        canceled. whenever.
                    </p>
                    <p className="opacity-80">
                        Lattter is highly committed to fulfilling the commitment
                        to keep your information secure. We use the most
                        advanced systems and constantly update them to ensure
                        that there is no unauthorized access.
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Cookies</h2>
                    <p className="opacity-80">
                        A cookie refers to a file that is sent with the purpose
                        of requesting permission to be stored on your computer.
                        Upon accepting said file, it is created and the cookie
                        is then used to obtain information regarding web
                        traffic, and also facilitates future visits to a
                        website. recurrent. Another function that cookies have
                        is that with them the websites can recognize you
                        individually and therefore provide you with the best
                        personalized service on their website.
                    </p>
                    <p className="opacity-80">
                        Our website uses cookies to identify the pages that are
                        visited and their frequency. This information is used
                        only for statistical analysis and then the information
                        is permanently deleted. You can delete cookies at any
                        time from your computer. However, cookies help to
                        provide a better service on the websites, they do not
                        give access to information from your computer or from
                        you, unless you want it and you directly provide it with
                        news. You can accept or deny the use of cookies, however
                        most browsers automatically accept cookies as it serves
                        to have a better web service. You can also change your
                        computer settings to decline cookies. If they decline,
                        you may not be able to use some of our services.
                    </p>
                </div>
                <div className="space-y-4">
                    <h1 className="text-xl font-bold">
                        Links to Third Parties
                    </h1>
                    <p className="opacity-80">
                        This website may contain links to other sites that may
                        be of interest to you. Once you click on these links and
                        leave our page, we no longer have control over the site
                        to which you are redirected and therefore we are not
                        responsible for the terms or privacy or the protection
                        of your data on those other third party sites. These
                        sites are subject to their own privacy policies, so it
                        is recommended that you consult them to confirm that you
                        agree with these.
                    </p>
                </div>

                <div className="space-y-4">
                    <h1 className="text-xl font-bold">
                        Control of your personal information
                    </h1>
                    <p className="opacity-80">
                        At any time you may restrict the collection or use of
                        personal information that is provided to our website.
                        Each time you are asked to fill out a form, such as the
                        user registration form, you can check or uncheck the
                        option to receive information by email. If you have
                        selected the option to receive our newsletter or
                        advertising, you can cancel it at any time.
                    </p>
                    <p className="opacity-80">
                        This company will not sell, assign or distribute
                        personal information that is collected without your
                        consent, unless required by a judge with a court order.
                    </p>
                    <p className="opacity-80">
                        Lattter reserves the right to change the terms of this
                        Privacy Policy at any time.
                    </p>
                </div>
            </main>
        </main>
    )
}
