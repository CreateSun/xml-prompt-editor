import Layout from "@/components/layout/Layout";

export default function TermsPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mt-12 ">
          Terms of Service (Draft v1.0 – 2024-08-15)
        </h1>
        <main className="max-w-4xl mx-auto mt-12">
          <div className="text-lg  mt-4">
            <p>
              PLEASE READ THESE TERMS CAREFULLY BEFORE USING THE XML PROMPT
              EDITOR WEB APPLICATION, DESKTOP CLIENT, API, OR ANY RELATED
              MATERIALS (collectively, the “Service”). By accessing or using the
              Service you agree to be bound by these Terms of Service (“Terms”).
              If you disagree with any part of the Terms, you must not use the
              Service.
            </p>
            <br />
            <h2 className="text-2xl font-bold">Acceptance of Terms</h2>
            <p>
              <br />
              1.1 These Terms constitute a legally binding agreement between you
              (“User,” “you”) and CreateSun (“Company,” “we,” “us”).
            </p>
            <br />
            <p>
              1.2 We may update the Terms at any time. Continued use after any
              change constitutes acceptance.
            </p>
            <br />
            <h2 className="text-2xl font-bold">Description of Service</h2>
            <br />
            <p>
              XML Prompt Editor is an open-source tool that allows Users to
              create, edit, preview, and store XML-based prompts and templates.
              The Service may be offered (a) as browser-based software hosted at
              https://xml-prompt-editor.vercel.app, (b) as downloadable desktop
              binaries, and (c) as source code under the MIT License.
            </p>
            <br />
            <h2 className="text-2xl font-bold">User Accounts & Data</h2>
            <p>
              3.1 No account is required for basic use. Optional cloud-sync
              features require GitHub OAuth; your GitHub profile information is
              stored only as necessary to provide sync.
            </p>
            <br />
            <p>
              3.2 All XML files, prompts, and metadata (“User Content”) remain
              your intellectual property. By uploading or syncing User Content
              you grant us a non-exclusive, worldwide, royalty-free license
              solely to host, store, and display it for you.
            </p>
            <br />
            <p>
              3.3 We reserve the right to remove any User Content that violates
              these Terms or applicable law.
            </p>
            <br />
            <p>
                <h2 className="text-2xl font-bold">Acceptable Use</h2>
            </p>
            <p>
                You agree NOT to:
            </p>
            <ul>
            <li>
                a. upload malicious scripts or content that infringes third-party
                rights;
            </li>
            <li>
                b. use the Service to generate spam, hate speech, or unlawful
                material;
            </li>
            <li>
                c. reverse-engineer the hosted cloud infrastructure or abuse API
                rate limits.
            </li>
            </ul>
            <br />
            <h2 className="text-2xl font-bold">Privacy</h2>
            <br />
            <p>
            Our Privacy Policy explains how we collect, use, and disclose
            information. By using the Service you consent to those practices.
            </p>
            <br />
            <h2 className="text-2xl font-bold">Third-Party Links & Dependencies</h2>
            <p>
                The Service may integrate or link to third-party libraries or services. We are not responsible for their content, accuracy, or availability.
            </p>
            <br />
            <h2 className="text-2xl font-bold">Disclaimer of Warranties</h2>
            <p>
                THE SERVICE IS PROVIDED “AS IS” WITHOUT WARRANTY OF ANY KIND. We
                disclaim all implied warranties, including merchantability, fitness
                for a particular purpose, and non-infringement.
            </p>
            <br />
            <h2 className="text-2xl font-bold">Limitation of Liability</h2>
            <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL THE
                COMPANY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO
                THE USE OR INABILITY TO USE THE SERVICE.
            </p>
            <br />
            <h2 className="text-2xl font-bold">Termination</h2>
            <p>
            We may suspend or terminate your access at any time, with or without
                cause or notice. Sections 6–9 survive termination.
            </p>
            <br />
            <h2 className="text-2xl font-bold">Governing Law & Dispute Resolution</h2>
            <p>
            These Terms are governed by the laws of the State of California,
            USA, without regard to conflict-of-law rules. Any dispute must be
            resolved exclusively in the state or federal courts located in San
            Francisco County, California.
            </p>
            <br />
            <h2 className="text-2xl font-bold">Contact</h2>
            <p>
            Questions about these Terms may be sent to legal@createsun.dev.
            </p>
            <br />
            <p>
                Last updated: 15 August 2024
            </p>
          </div>
        </main>
      </div>
    </Layout>
  );
}
