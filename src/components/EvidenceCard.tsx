import type { Coach } from "@/data/types";
import { CONFIDENCE_META } from "@/lib/format";

export function ConfidenceBadge({ confidence }: { confidence: Coach["provenance"]["confidence"] }) {
  const m = CONFIDENCE_META[confidence];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold"
      style={{ color: m.color, borderColor: `color-mix(in srgb, ${m.color} 45%, transparent)` }}
    >
      <span className="size-1.5 rounded-full" style={{ background: m.color }} />
      신뢰도 {m.label}
    </span>
  );
}

/** Evidence disclosure — current job, availability, last-checked, sources. */
export default function EvidenceCard({ coach }: { coach: Coach }) {
  const p = coach.provenance;
  return (
    <div className="text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <ConfidenceBadge confidence={p.confidence} />
        {coach.meme && (
          <span className="rounded-full border border-warn/45 px-2 py-0.5 text-[10px] font-bold text-warn">예능 IF · 재미용</span>
        )}
      </div>
      <dl className="mt-3 divide-y divide-line">
        {[
          ["현직", p.currentJob],
          ["한국 부임 가능성", p.availability],
          p.contractUntil ? ["계약", `${p.contractUntil}까지`] : null,
          ["확인일", p.lastCheckedAt],
        ].filter(Boolean).map((row) => {
          const [k, v] = row as [string, string];
          return (
            <div key={k} className="grid grid-cols-[7rem_1fr] gap-3 py-1.5">
              <dt className="text-xs text-muted">{k}</dt>
              <dd className="text-xs text-foreground">{v}</dd>
            </div>
          );
        })}
      </dl>
      {p.note && <p className="mt-2 rounded-lg bg-background/50 p-2 text-[11px] leading-snug text-muted">{p.note}</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        {coach.sources.map((s, i) => (
          <a key={i} href={s} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-accent underline-offset-2 hover:underline">
            출처 [{i + 1}]
          </a>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-muted">전술·능력치는 공개 분석 기반 추정이며 점수는 모델 추정입니다. 현실성(부임 가능성)은 점수에 반영하지 않습니다.</p>
    </div>
  );
}
