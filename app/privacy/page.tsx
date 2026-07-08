import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, breadcrumbLd, BUSINESS } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy" },
];

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Central Florida Automation Services",
  description:
    "How Central Florida Automation Services collects, uses, and protects the information you share through our website and contact forms.",
  path: "/privacy",
});

/* Last updated — bump this date whenever the policy changes. */
const LAST_UPDATED = "June 16, 2026";

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />

      <PageHero
        light
        crumbs={crumbs}
        title="Privacy Policy"
        lead="What we collect when you contact us, why we collect it, and how we keep it safe."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:px-11 md:py-24">
          <p className="font-sans text-[0.8125rem] uppercase tracking-eyebrow text-slate-400">
            Last updated {LAST_UPDATED}
          </p>

          <div className="mt-10 space-y-12">
            <Block title="Overview">
              <p>
                This Privacy Policy explains how {BUSINESS.name} (&ldquo;
                {BUSINESS.shortName}
                ,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
                handles information collected through{" "}
                {BUSINESS.name.toLowerCase().includes("central")
                  ? "centralfloridaautomation.com"
                  : "our website"}{" "}
                (the &ldquo;Site&rdquo;). We are a Florida-based smart home,
                security, and automation company, and we use the information you
                share with us only to respond to your inquiries and provide our
                services.
              </p>
            </Block>

            <Block title="Information we collect">
              <p>
                We collect the information you choose to give us when you fill out
                a contact or service-request form on the Site. This typically
                includes:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>Your name</li>
                <li>Your email address</li>
                <li>Your phone number</li>
                <li>The type of project or service you&rsquo;re interested in</li>
                <li>Any details you include in your message</li>
              </ul>
              <p className="mt-4">
                We do not require you to create an account or provide payment
                information to use the Site. We do not knowingly collect
                information from anyone under the age of 13.
              </p>
            </Block>

            <Block title="How your information is submitted and stored">
              <p>
                When you submit a form, the information is sent to our own
                servers through a secure, encrypted connection (HTTPS). We
                operate our own backend service to receive these submissions and
                deliver them to our team by email so we can follow up with you.
              </p>
              <p className="mt-4">
                Your submission may be processed by trusted infrastructure and
                email-delivery providers that we use to host the Site and send
                mail on our behalf. These providers act on our instructions and
                are not permitted to use your information for their own purposes.
              </p>
            </Block>

            <Block title="How we use your information">
              <p>We use the information you provide to:</p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>Respond to your questions and service requests</li>
                <li>Prepare quotes and schedule consultations or work</li>
                <li>Contact you about your project or existing systems</li>
                <li>Improve our services and the Site</li>
              </ul>
              <p className="mt-4">
                We do not sell, rent, or trade your personal information. We will
                not send you marketing email unless you ask us to.
              </p>
            </Block>

            <Block title="Cookies and analytics">
              <p>
                The Site may use cookies or similar technologies to keep it
                working properly and to understand how visitors use it. You can
                set your browser to refuse cookies, though some parts of the Site
                may not function as intended. If we use analytics in the future,
                we will use it only to measure aggregate, non-identifying usage.
              </p>
            </Block>

            <Block title="How we protect your information">
              <p>
                We use reasonable administrative, technical, and physical
                safeguards to protect the information you share with us,
                including encryption of data in transit. No method of
                transmission or storage is completely secure, however, and we
                cannot guarantee absolute security.
              </p>
            </Block>

            <Block title="Your choices and rights">
              <p>
                You may contact us at any time to ask what information we hold
                about you, to correct it, or to request that we delete it.
                Depending on where you live, you may have additional rights under
                applicable privacy laws. To make a request, reach us using the
                details below.
              </p>
            </Block>

            <Block title="Changes to this policy">
              <p>
                We may update this Privacy Policy from time to time. When we do,
                we will revise the &ldquo;Last updated&rdquo; date at the top of
                this page. Your continued use of the Site after a change means you
                accept the updated policy.
              </p>
            </Block>

            <Block title="Contact us">
              <p>
                If you have questions about this Privacy Policy or how we handle
                your information, contact us at:
              </p>
              <address className="mt-4 not-italic font-sans text-[0.9375rem] leading-relaxed text-slate-600">
                {BUSINESS.name}
                <br />
                {BUSINESS.street}
                <br />
                {BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}
                <br />
                <a
                  href={BUSINESS.emailHref}
                  className="text-navy-logo underline-offset-2 hover:underline"
                >
                  {BUSINESS.email}
                </a>
                <br />
                <a
                  href={BUSINESS.phoneHref}
                  className="text-navy-logo underline-offset-2 hover:underline"
                >
                  {BUSINESS.phone}
                </a>
              </address>
              <p className="mt-6">
                You can also reach us through our{" "}
                <Link
                  href="/contact"
                  className="text-navy-logo underline-offset-2 hover:underline"
                >
                  contact page
                </Link>
                .
              </p>
            </Block>
          </div>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-[1.6rem] font-light leading-snug tracking-tight text-navy-deep">
        {title}
      </h2>
      <div className="mt-4 space-y-4 font-sans text-[0.9375rem] leading-relaxed text-slate-600">
        {children}
      </div>
    </div>
  );
}
