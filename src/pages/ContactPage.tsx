import SEOHead from '@/components/common/SEOHead'
import { useState, type FormEvent } from 'react'
import PageHero from '@/components/common/PageHero'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { pages, site } from '@/content/site'
import emailjs, { emailJsConfig } from '@/lib/emailjs'

type Status = 'idle' | 'sending' | 'sent' | 'error'
const empty = { name: '', email: '', service: '', timeline: '', message: '' }

// Underline-style fields rather than boxed inputs.
const field =
  'h-12 rounded-none border-0 border-b border-input bg-transparent px-0 text-lg shadow-none focus-visible:border-brand focus-visible:ring-0'

export default function ContactPage() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState<Status>('idle')
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

  const set = (key: keyof typeof empty) => (value: string) => setForm((f) => ({ ...f, [key]: value }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    // Try EmailJS first if configured
    const emailJsConfigured = emailJsConfig.serviceId && emailJsConfig.publicKey && emailJsConfig.contactTemplateId
    if (emailJsConfigured) {
      try {
        await emailjs.send(
          emailJsConfig.serviceId!,
          emailJsConfig.contactTemplateId!,
          {
            from_name: form.name,
            from_email: form.email,
            service: form.service,
            timeline: form.timeline,
            message: form.message,
            to_email: site.contact.email,
          }
        )
        setForm(empty)
        setStatus('sent')
        return
      } catch (error) {
        console.error('EmailJS error:', error)
        setStatus('error')
        return
      }
    }

    // Fallback to legacy endpoint if configured
    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error(String(res.status))
        setForm(empty)
        setStatus('sent')
        return
      } catch {
        setStatus('error')
        return
      }
    }

    // No service configured: hand the enquiry to the visitor's mail app
    const body = `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\nTimeline: ${form.timeline}\n\n${form.message}`
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent('Project enquiry from ' + form.name)}&body=${encodeURIComponent(body)}`
    setStatus('sent')
  }

  const details = [
    { label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
    { label: 'Phone', value: site.contact.phone, href: site.contact.phoneHref },
    { label: 'Location', value: site.contact.location },
  ]

  return (
    <>
      <SEOHead title="Contact Akodefy — Start Your Project | Coimbatore" description="Get in touch with Akodefy to discuss your web development, mobile app, or digital marketing project. Based in Coimbatore, Tamil Nadu." canonical="https://www.akodefy.com/contact" />
      <PageHero title={pages.contact.title} sub={pages.contact.sub} />

      <section className="bg-paper pb-28 md:pb-44">
        <div className="container-x grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <dl className="divide-y divide-border border-y border-border">
              {details.map((d) => (
                <div key={d.label} className="py-6">
                  <dt className="text-sm text-muted-foreground">{d.label}</dt>
                  <dd className="mt-1 font-display text-2xl font-medium tracking-[-0.03em] md:text-3xl">
                    {d.href ? (
                      <a href={d.href} className="cursor-target transition-colors hover:text-brand-deep">
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="md:col-span-7">
            {status === 'sent' ? (
              <div role="status" className="border-t-2 border-brand pt-8">
                <h2 className="font-display text-4xl font-semibold tracking-[-0.04em]">
                  {emailJsConfig.serviceId || endpoint ? 'Message sent' : 'Your email app is opening'}
                </h2>
                <p className="mt-4 max-w-md text-lg text-muted-foreground">
                  {emailJsConfig.serviceId || endpoint
                    ? 'We have your project details and will reply to the email you gave.'
                    : `Send the drafted email to complete your enquiry. You can also write to ${site.contact.email} directly.`}
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name" className="text-sm text-muted-foreground">
                      Your name
                    </Label>
                    <Input id="name" required value={form.name} onChange={(e) => set('name')(e.target.value)} className={field} autoComplete="name" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm text-muted-foreground">
                      Email address
                    </Label>
                    <Input id="email" type="email" required value={form.email} onChange={(e) => set('email')(e.target.value)} className={field} autoComplete="email" />
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <Label htmlFor="service" className="text-sm text-muted-foreground">
                      Service needed
                    </Label>
                    <Select value={form.service} onValueChange={set('service')}>
                      <SelectTrigger id="service" className={`${field} w-full`}>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {pages.contact.services.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timeline" className="text-sm text-muted-foreground">
                      When do you want to start?
                    </Label>
                    <Select value={form.timeline} onValueChange={set('timeline')}>
                      <SelectTrigger id="timeline" className={`${field} w-full`}>
                        <SelectValue placeholder="Select Timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {pages.contact.timelines.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm text-muted-foreground">
                    Project details
                  </Label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => set('message')(e.target.value)}
                    placeholder="Describe your project, goals, and timeline"
                    className={`${field} h-auto min-h-32 resize-y py-3`}
                  />
                </div>

                {status === 'error' && (
                  <p role="alert" className="text-destructive">
                    The message did not send. Check your connection and try again, or write to {site.contact.email}.
                  </p>
                )}

                <div>
                  <Button
                    type="submit"
                    disabled={status === 'sending'}
                    className="cursor-target h-14 rounded-full bg-forest px-10 text-base text-white hover:bg-brand hover:text-forest"
                  >
                    {status === 'sending' ? 'Sending' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
