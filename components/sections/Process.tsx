import { DecodeText } from "@/components/motion/DecodeText";
import { Section } from "./Section";
import { ProcessRule } from "./ProcessRule";

const STEPS = [
  {
    when: "Day 0",
    title: "Pick the thing",
    body: "You show us the task. We tell you honestly whether software should touch it. Sometimes the answer is no.",
  },
  {
    when: "Week 1",
    title: "Watch it build",
    body: "One workflow, built against your real data and your real tools. You see it working as it takes shape.",
  },
  {
    when: "Week 2",
    title: "Let it run",
    body: "The task hands itself over to software. Nobody gets trained, because there is nothing to learn.",
  },
  {
    when: "Handover",
    title: "Own everything",
    body: "Code, credentials and documentation handed to you. If we disappeared tomorrow, nothing breaks.",
  },
];

export function Process() {
  return (
    <Section
      id="process"
      index="03"
      label="How it goes"
      title={["One workflow.", "Two weeks.", "A fixed fee."]}
      intro={
        "No retainer. No discovery phase that discovers nothing. The whole engagement fits into this row."
      }
    >
      <div className="relative mt-16">
        <ProcessRule />
        <ol className="grid gap-10 pt-8 md:grid-cols-4 md:gap-8">
          {STEPS.map((step) => (
            <li key={step.when}>
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-poster">
                <DecodeText text={step.when} />
              </p>
              <h3 className="mt-3 text-lg font-normal md:text-xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70 md:text-base">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
