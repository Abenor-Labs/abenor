'use client'

import { useState, type FormEvent } from 'react'
import { EMAIL, MAILTO } from './primitives'

// FormSubmit forwards each submission to the studio inbox. No account or
// backend; the inbox has to confirm the very first submission once.
const ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`

type State = 'idle' | 'sending' | 'sent' | 'error'

export function EmailCapture() {
  const [state, setState] = useState<State>('idle')

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setState('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: new FormData(form).get('email'),
          _subject: 'New lead from abenor.vercel.app',
          _template: 'table',
          _captcha: 'false',
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setState('sent')
    } catch {
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <p role="status" className="inline-flex h-12 items-center gap-2.5 text-[15px] text-ink">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-live" />
        Got it. Expect a reply within a day.
      </p>
    )
  }

  return (
    <form onSubmit={submit} className="w-full sm:w-[340px]">
      <div className="flex h-12 items-center rounded-full bg-white p-1 pl-5 shadow-[0_0_0_1px_rgba(17,17,16,0.1),0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-150 focus-within:shadow-[0_0_0_1.5px_var(--color-ink)]">
        <label htmlFor="footer-email" className="sr-only">
          Your email
        </label>
        <input
          id="footer-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-3"
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="press h-10 shrink-0 rounded-full bg-ink px-4 text-[14px] font-medium text-paper hover:bg-[#2a2a28] disabled:opacity-60"
        >
          {state === 'sending' ? 'Sending…' : 'Send'}
        </button>
      </div>
      {state === 'error' && (
        <p role="alert" className="mt-2 pl-5 text-[13px] text-ember">
          Did not go through.{' '}
          <a href={MAILTO} className="underline underline-offset-4">
            Email us directly
          </a>
          .
        </p>
      )}
    </form>
  )
}
