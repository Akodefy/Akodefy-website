import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { site, type JobRole } from '@/content/site'

type Status = 'idle' | 'sending' | 'sent' | 'error'
const empty = { name: '', email: '', role: '', linkedin: '', portfolio: '', message: '' }

const field =
  'h-12 rounded-none border-0 border-b border-input bg-transparent px-0 text-lg shadow-none focus-visible:border-brand focus-visible:ring-0'

export default function ApplicationForm({
  preselected,
  onClose,
  roles,
}: {
  preselected: JobRole | null
  onClose: () => void
  roles?: JobRole[]
}) {
  const [form, setForm] = useState({ ...empty, role: preselected?.title ?? '' })
  const [status, setStatus] = useState<Status>('idle')
  const endpoint = import.meta.env.VITE_CAREERS_ENDPOINT as string | undefined
  const activeRoles = roles ?? []

  const set = (key: keyof typeof empty) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    if (!endpoint) {
      const body = [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Role: ${form.role}`,
        `LinkedIn: ${form.linkedin}`,
        `Portfolio: ${form.portfolio}`,
        '',
        form.message,
      ].join('\n')
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent('Job application — ' + form.role)}&body=${encodeURIComponent(body)}`
      setStatus('sent')
      return
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(String(res.status))
      setForm(empty)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="apply" className="bg-forest py-16 text-white md:py-24">
      <div className="container-x grid gap-16 md:grid-cols-12">
        {/* Left — context */}
        <div className="md:col-span-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">Apply now</p>
          <h2 className="mt-6 font-display text-[clamp(1.8rem,3.5vw,3.25rem)] font-semibold leading-[1.0] tracking-[-0.04em]">
            {preselected && preselected.id !== 'speculative'
              ? `Applying for ${preselected.title}`
              : 'Send your application'}
          </h2>
          <p className="mt-6 max-w-sm text-lg text-white/60">
            We read every application personally. You will hear back within five business days — no automated rejections.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="cursor-target mt-8 inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
              <path d="M10 3L5 8l5 5" />
            </svg>
            View all roles
          </button>

          {/* Contact info strip */}
          <dl className="mt-12 divide-y divide-white/10 border-y border-white/10">
            <div className="py-5">
              <dt className="text-sm text-white/40">Email directly</dt>
              <dd className="mt-1 font-medium">
                <a href={`mailto:${site.contact.email}`} className="cursor-target transition-colors hover:text-brand">
                  {site.contact.email}
                </a>
              </dd>
            </div>
            <div className="py-5">
              <dt className="text-sm text-white/40">Response time</dt>
              <dd className="mt-1 font-medium">Within 5 business days</dd>
            </div>
          </dl>
        </div>

        {/* Right — form */}
        <div className="md:col-span-7">
          {status === 'sent' ? (
            <div role="status" className="border-t-2 border-brand pt-10">
              <h3 className="font-display text-4xl font-semibold tracking-[-0.04em]">
                {endpoint ? 'Application received' : 'Your email app is opening'}
              </h3>
              <p className="mt-4 max-w-md text-lg text-white/60">
                {endpoint
                  ? 'We have received your application and will be in touch within five business days.'
                  : `Send the drafted email to complete your application. You can also write directly to ${site.contact.email}.`}
              </p>
              <button
                type="button"
                onClick={() => { setStatus('idle'); setForm(empty) }}
                className="cursor-target mt-8 inline-flex h-12 items-center justify-center rounded-full bg-brand px-7 text-sm font-medium text-forest transition-colors hover:bg-white"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <Label htmlFor="cr-name" className="text-sm text-white/50">Full name</Label>
                  <Input id="cr-name" required value={form.name} onChange={(e) => set('name')(e.target.value)} className={field} autoComplete="name" />
                </div>
                <div>
                  <Label htmlFor="cr-email" className="text-sm text-white/50">Email address</Label>
                  <Input id="cr-email" type="email" required value={form.email} onChange={(e) => set('email')(e.target.value)} className={field} autoComplete="email" />
                </div>
              </div>

              <div>
                <Label htmlFor="cr-role" className="text-sm text-white/50">Role applying for</Label>
                <Select value={form.role} onValueChange={set('role')}>
                  <SelectTrigger id="cr-role" className={`${field} w-full`}>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeRoles.map((r) => (
                      <SelectItem key={r.id} value={r.title}>{r.title}</SelectItem>
                    ))}
                    <SelectItem value="Speculative application">Speculative application</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <Label htmlFor="cr-linkedin" className="text-sm text-white/50">LinkedIn URL</Label>
                  <Input id="cr-linkedin" type="url" value={form.linkedin} onChange={(e) => set('linkedin')(e.target.value)} className={field} placeholder="linkedin.com/in/yourname" />
                </div>
                <div>
                  <Label htmlFor="cr-portfolio" className="text-sm text-white/50">Portfolio / GitHub</Label>
                  <Input id="cr-portfolio" type="url" value={form.portfolio} onChange={(e) => set('portfolio')(e.target.value)} className={field} placeholder="yourportfolio.com" />
                </div>
              </div>

              <div>
                <Label htmlFor="cr-message" className="text-sm text-white/50">Why Akodefy? Tell us about yourself.</Label>
                <Textarea
                  id="cr-message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => set('message')(e.target.value)}
                  placeholder="Share what draws you to this role, what you have shipped, and what you would build here."
                  className={`${field} h-auto min-h-40 resize-y py-3`}
                />
              </div>

              {status === 'error' && (
                <p role="alert" className="text-destructive">
                  The application did not send. Check your connection and try again, or write to {site.contact.email}.
                </p>
              )}

              <div>
                <Button
                  type="submit"
                  disabled={status === 'sending'}
                  className="cursor-target h-14 rounded-full bg-brand px-10 text-base font-medium text-forest hover:bg-white"
                >
                  {status === 'sending' ? 'Sending' : 'Submit Application'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}


