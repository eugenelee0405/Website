'use client';

import { useMemo, useState } from 'react';
import { useChat, type UIMessage } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { Laptop, Monitor, Smartphone, Tv, ArrowRight, Sparkles } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

type Step = 1 | 2 | 3;

type Recommendation = {
  name: string;
  estimatedPrice: string;
  whyItFits: string;
};

const categoryOptions = [
  { label: 'Custom PC Build', icon: Monitor },
  { label: 'Laptop', icon: Laptop },
  { label: 'Smartphone', icon: Smartphone },
  { label: 'TV/Monitor', icon: Tv },
];

const priorityOptions = ['Gaming', 'School', 'Video Editing', 'Battery Life', '4K'];

const steps: { n: Step; label: string }[] = [
  { n: 1, label: 'Category' },
  { n: 2, label: 'Details' },
  { n: 3, label: 'Consult' },
];

function getMessageText(message: UIMessage | undefined): string {
  if (!message) return '';
  if (Array.isArray(message.parts)) {
    return message.parts
      .filter(
        (part): part is { type: 'text'; text: string } =>
          part.type === 'text' && typeof part.text === 'string'
      )
      .map((part) => part.text)
      .join('');
  }
  return '';
}

function stripCodeFence(text: string): string {
  const trimmed = text.trim();
  if (!trimmed.startsWith('```')) return trimmed;
  return trimmed
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();
}

function parseRecommendations(text: string): Recommendation[] | null {
  const cleaned = stripCodeFence(text);
  try {
    const parsed = JSON.parse(cleaned) as {
      recommendations?: Array<Record<string, unknown>>;
    };
    if (!parsed || !Array.isArray(parsed.recommendations) || parsed.recommendations.length !== 3) {
      return null;
    }
    const normalized = parsed.recommendations
      .map((item) => {
        const name = typeof item.name === 'string' ? item.name : '';
        const estimatedPrice =
          typeof item.estimatedPrice === 'string'
            ? item.estimatedPrice
            : typeof item.priceEstimate === 'string'
              ? item.priceEstimate
              : '';
        const whyItFits =
          typeof item.whyItFits === 'string'
            ? item.whyItFits
            : typeof item.why === 'string'
              ? item.why
              : '';
        return { name, estimatedPrice, whyItFits };
      })
      .filter(
        (item) =>
          item.name.length > 0 && item.estimatedPrice.length > 0 && item.whyItFits.length > 0
      );
    return normalized.length === 3 ? normalized : null;
  } catch {
    return null;
  }
}

const inputClasses =
  'w-full border border-line bg-surface px-4 py-2.5 text-ink outline-none transition-colors placeholder:text-muted focus:border-ink';

export default function TechConsultingPage() {
  const [step, setStep] = useState<Step>(1);
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [priorities, setPriorities] = useState<string[]>([]);
  const [preferences, setPreferences] = useState('');
  const [refinementInput, setRefinementInput] = useState('');
  const [hasConsulted, setHasConsulted] = useState(false);

  const { messages, sendMessage, setMessages, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const canGoToStep2 = category.trim().length > 0;
  const canGoToStep3 = Number(budget) > 0;

  const togglePriority = (priority: string) => {
    setPriorities((current) =>
      current.includes(priority)
        ? current.filter((item) => item !== priority)
        : [...current, priority]
    );
  };

  const initialPrompt = useMemo(() => {
    const selectedCategory = category || 'tech device';
    const tags = priorities.length > 0 ? priorities.join(', ') : 'none specified';
    const base = `I need a ${selectedCategory} under $${budget}. My priorities are ${tags}.`;
    const preferenceText = preferences.trim();
    return preferenceText.length > 0 ? `${base} Preferences: ${preferenceText}.` : base;
  }, [budget, category, preferences, priorities]);

  const latestAssistantMessage = useMemo(
    () => [...messages].reverse().find((message) => message.role === 'assistant'),
    [messages]
  );
  const latestAssistantText = useMemo(
    () => getMessageText(latestAssistantMessage),
    [latestAssistantMessage]
  );
  const recommendationCards = useMemo(
    () => parseRecommendations(latestAssistantText),
    [latestAssistantText]
  );

  const isGenerating = status === 'submitted' || status === 'streaming';

  const handleConsult = async () => {
    if (isGenerating || !canGoToStep3) return;
    setMessages([]);
    setHasConsulted(true);
    await sendMessage({ text: initialPrompt });
  };

  const handleRefinementSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextMessage = refinementInput.trim();
    if (!nextMessage || isGenerating) return;
    setRefinementInput('');
    await sendMessage({ text: nextMessage });
  };

  return (
    <div>
      <PageHeader
        index="05"
        eyebrow="Tech Consulting"
        title="Tell me your budget. I'll spec the machine."
        lead="An AI wizard I built. Pick a category, set a budget and priorities, and it returns three tailored recommendations you can refine in plain language."
      />

      <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {/* Step indicator */}
        <ol className="mb-12 grid grid-cols-3 border border-line bg-line gap-px">
          {steps.map((s) => {
            const isActive = step === s.n;
            const isComplete = step > s.n;
            return (
              <li
                key={s.n}
                className={`flex items-center gap-2.5 px-4 py-3 ${
                  isActive ? 'bg-ink text-paper' : isComplete ? 'bg-accent-wash text-accent-ink' : 'bg-paper text-muted'
                }`}
              >
                <span className="text-xs font-semibold tabular-nums">{`0${s.n}`}</span>
                <span className="text-sm font-medium">{s.label}</span>
              </li>
            );
          })}
        </ol>

        {step === 1 && (
          <section className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl text-ink">Choose a category</h2>
              <p className="mt-1 text-sm text-muted">What kind of product do you want help with?</p>
            </div>

            <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
              {categoryOptions.map((option) => {
                const Icon = option.icon;
                const selected = category === option.label;
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setCategory(option.label)}
                    className={`flex h-36 flex-col items-start justify-between p-6 text-left transition-colors ${
                      selected
                        ? 'bg-accent-wash'
                        : 'bg-paper hover:bg-surface'
                    }`}
                  >
                    <Icon
                      className={selected ? 'text-accent-ink' : 'text-ink'}
                      size={30}
                      strokeWidth={1.5}
                    />
                    <span className={`font-serif text-xl ${selected ? 'text-accent-ink' : 'text-ink'}`}>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!canGoToStep2}
              className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent active:translate-y-px disabled:cursor-not-allowed disabled:bg-line-strong disabled:text-muted"
            >
              Continue to details
              <ArrowRight size={16} strokeWidth={1.75} />
            </button>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl text-ink">Needs and budget</h2>
              <p className="mt-1 text-sm text-muted">Share your budget, priorities, and any preferences.</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="budget" className="block text-sm font-medium text-ink">
                Max budget (USD)
              </label>
              <input
                id="budget"
                type="number"
                min="0"
                placeholder="e.g. 1200"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                className={inputClasses}
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-ink">Main priorities</p>
              <div className="flex flex-wrap gap-2">
                {priorityOptions.map((priority) => {
                  const selected = priorities.includes(priority);
                  return (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => togglePriority(priority)}
                      className={`rounded-[2px] border px-3.5 py-2 text-sm font-medium transition-colors ${
                        selected
                          ? 'border-ink bg-ink text-paper'
                          : 'border-line bg-surface text-ink hover:border-ink'
                      }`}
                    >
                      {priority}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="preferences" className="block text-sm font-medium text-ink">
                Any specific brands or colors?
              </label>
              <textarea
                id="preferences"
                rows={4}
                value={preferences}
                onChange={(event) => setPreferences(event.target.value)}
                placeholder="Brand preferences, color choices, anything else that matters."
                className={inputClasses}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="border border-line-strong px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep(3);
                  setHasConsulted(false);
                  setMessages([]);
                }}
                disabled={!canGoToStep3}
                className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent active:translate-y-px disabled:cursor-not-allowed disabled:bg-line-strong disabled:text-muted"
              >
                Continue to consult
                <ArrowRight size={16} strokeWidth={1.75} />
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl text-ink">Your brief</h2>
              <p className="mt-1 text-sm text-muted">
                Recommendations are generated from the details below.
              </p>
            </div>

            <dl className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
              {[
                { k: 'Category', v: category },
                { k: 'Budget', v: `$${budget}` },
                { k: 'Priorities', v: priorities.length > 0 ? priorities.join(', ') : 'None specified' },
                { k: 'Preferences', v: preferences.trim() || 'None specified' },
              ].map((row) => (
                <div key={row.k} className="bg-paper p-4">
                  <dt className="eyebrow">{row.k}</dt>
                  <dd className="mt-1 text-sm text-ink">{row.v}</dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={handleConsult}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent active:translate-y-px disabled:cursor-not-allowed disabled:bg-line-strong disabled:text-muted"
            >
              <Sparkles size={16} strokeWidth={1.75} />
              {isGenerating ? 'Consulting...' : 'Consult'}
            </button>

            {/* Loading skeleton matching the result grid */}
            {isGenerating && !latestAssistantText && hasConsulted && (
              <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="animate-pulse space-y-3 bg-surface p-6">
                    <div className="h-5 w-3/4 bg-line" />
                    <div className="h-3 w-1/2 bg-line" />
                    <div className="h-3 w-full bg-line" />
                    <div className="h-3 w-5/6 bg-line" />
                  </div>
                ))}
              </div>
            )}

            {hasConsulted && recommendationCards && (
              <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
                {recommendationCards.map((item) => (
                  <article key={item.name} className="flex flex-col gap-3 bg-surface p-6">
                    <h3 className="font-serif text-xl leading-tight text-ink">{item.name}</h3>
                    <p className="text-sm font-medium text-accent-ink">{item.estimatedPrice}</p>
                    <p className="text-sm leading-relaxed text-muted">{item.whyItFits}</p>
                  </article>
                ))}
              </div>
            )}

            {hasConsulted && !recommendationCards && latestAssistantText && (
              <div className="border border-line bg-surface p-6">
                <p className="eyebrow mb-3">AI response</p>
                <pre className="whitespace-pre-wrap font-sans text-sm text-ink-soft">{latestAssistantText}</pre>
              </div>
            )}

            {hasConsulted && error && (
              <div className="border-l-2 border-accent bg-accent-wash p-4 text-sm text-ink">
                Unable to generate recommendations right now. Check the API key and try again.
              </div>
            )}

            <form onSubmit={handleRefinementSubmit} className="space-y-3 border-t border-line pt-8">
              <label htmlFor="refinement" className="block text-sm font-medium text-ink">
                Not quite right? Tell me what to change.
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="refinement"
                  type="text"
                  value={refinementInput}
                  onChange={(event) => setRefinementInput(event.target.value)}
                  placeholder="e.g. something cheaper, or I prefer Samsung"
                  className={inputClasses}
                  disabled={isGenerating || !hasConsulted}
                />
                <button
                  type="submit"
                  disabled={isGenerating || !hasConsulted || refinementInput.trim().length === 0}
                  className="shrink-0 bg-ink px-6 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent active:translate-y-px disabled:cursor-not-allowed disabled:bg-line-strong disabled:text-muted"
                >
                  Refine
                </button>
              </div>
            </form>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="border border-line-strong px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              Back to details
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
