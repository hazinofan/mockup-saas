"use client";

export type Platform = "tiktok" | "instagram" | "x";

export type SocialDraft = {
  platform: Platform;
  displayName: string;
  username: string;
  caption: string;
  likes: string;
  comments: string;
  shares: string;
  imageUrl: string | null;
  imageZoom: number;
};

type Props = {
  draft: SocialDraft;
  exportRef: React.RefObject<HTMLDivElement | null>;
};

export function SocialPreview({ draft, exportRef }: Props) {
  if (draft.platform === "tiktok") return <TikTokPreview draft={draft} exportRef={exportRef} />;
  if (draft.platform === "instagram") return <InstagramPreview draft={draft} exportRef={exportRef} />;
  return <XPreview draft={draft} exportRef={exportRef} />;
}

function Background({ draft }: { draft: SocialDraft }) {
  if (draft.imageUrl) {
    return (
      <img
        src={draft.imageUrl}
        alt="User uploaded background"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: `scale(${draft.imageZoom})` }}
      />
    );
  }

  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,#c7ff3f_0,transparent_22%),radial-gradient(circle_at_82%_20%,#ff8a65_0,transparent_24%),linear-gradient(155deg,#667086_0%,#17181c_50%,#070707_100%)]" />
  );
}

function TikTokPreview({ draft, exportRef }: Props) {
  return (
    <div ref={exportRef} className="relative h-[640px] w-[360px] overflow-hidden bg-black text-white shadow-[0_35px_100px_rgba(0,0,0,.25)]">
      <Background draft={draft} />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.18),transparent_25%,transparent_58%,rgba(0,0,0,.72))]" />

      <div className="absolute inset-x-0 top-0 flex items-center justify-center gap-5 px-5 pt-7 text-[13px] font-semibold">
        <span className="text-white/55">Following</span>
        <span>For You</span>
      </div>

      <div className="absolute bottom-24 right-4 flex flex-col items-center gap-4 text-center text-[11px] font-semibold">
        <div className="grid size-11 place-items-center rounded-full border-2 border-white bg-[#c7ff3f] text-xs font-black text-black">{initials(draft.displayName)}</div>
        <Metric icon="♥" value={draft.likes} />
        <Metric icon="●" value={draft.comments} />
        <Metric icon="↗" value={draft.shares} />
        <div className="grid size-10 place-items-center rounded-full bg-black/70 text-[16px]">♪</div>
      </div>

      <div className="absolute bottom-5 left-4 right-20">
        <p className="text-[14px] font-bold">@{cleanHandle(draft.username)}</p>
        <p className="mt-2 max-w-[250px] text-[13px] leading-[18px] text-white/95">{draft.caption}</p>
        <p className="mt-3 text-[12px] font-medium text-white/80">♫ original sound · {draft.displayName}</p>
      </div>
    </div>
  );
}

function InstagramPreview({ draft, exportRef }: Props) {
  return (
    <div ref={exportRef} className="w-[360px] overflow-hidden bg-white text-[#111] shadow-[0_35px_100px_rgba(0,0,0,.18)]">
      <div className="flex h-[62px] items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-full bg-[conic-gradient(#ff3040,#ffb000,#a32bff,#ff3040)] p-[2px]">
            <div className="grid size-full place-items-center rounded-full bg-white text-[10px] font-black">
              {initials(draft.displayName)}
            </div>
          </div>
          <div className="text-[12px] leading-4">
            <p className="font-bold">{cleanHandle(draft.username)}</p>
            <p className="text-black/45">Original</p>
          </div>
        </div>
        <span className="text-lg leading-none">•••</span>
      </div>

      <div className="relative aspect-[4/5] overflow-hidden bg-[#ddd]">
        <Background draft={draft} />
      </div>

      <div className="px-4 pb-5 pt-3">
        <div className="flex items-center justify-between text-xl">
          <div className="flex gap-4"><span>♡</span><span>◯</span><span>⌁</span></div>
          <span>⌑</span>
        </div>
        <p className="mt-3 text-[12px] font-bold">{draft.likes} likes</p>
        <p className="mt-1 text-[12px] leading-[17px]"><b>{cleanHandle(draft.username)}</b> {draft.caption}</p>
        <p className="mt-2 text-[11px] text-black/42">View all {draft.comments} comments</p>
      </div>
    </div>
  );
}

function XPreview({ draft, exportRef }: Props) {
  return (
    <div
      ref={exportRef}
      className="relative flex h-[225px] w-[400px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_10%_10%,#c7ff3f,transparent_28%),linear-gradient(135deg,#f1f0eb,#d9d6cc)] p-7 text-[#111] shadow-[0_35px_100px_rgba(0,0,0,.18)]"
    >
      {draft.imageUrl ? <Background draft={draft} /> : null}
      <div className="absolute inset-0 bg-white/20" />
      <div className="relative w-full rounded-2xl border border-black/8 bg-white/95 p-4 shadow-[0_14px_40px_rgba(17,17,15,.08)] backdrop-blur-sm">
        <div className="flex gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-black text-[10px] font-black text-white">
            {initials(draft.displayName)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-[12px]">
              <b>{draft.displayName}</b>
              <span className="truncate text-black/40">@{cleanHandle(draft.username)}</span>
              <span className="ml-auto text-black/35">•••</span>
            </div>
            <p className="mt-2 text-[13px] leading-[18px]">{draft.caption}</p>
            <div className="mt-4 flex justify-between text-[10px] text-black/38">
              <span>◯ {draft.comments}</span>
              <span>↻ {draft.shares}</span>
              <span>♡ {draft.likes}</span>
              <span>⌑</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ icon, value }: { icon: string; value: string }) {
  return <div><div className="text-[25px] leading-none">{icon}</div><div className="mt-1">{value}</div></div>;
}

function cleanHandle(value: string) {
  return value.replace(/^@/, "").replace(/\s+/g, "");
}

function initials(value: string) {
  return value.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "NF";
}
