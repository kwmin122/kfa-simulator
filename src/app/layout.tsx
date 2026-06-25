import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Sans_KR, Geist_Mono } from "next/font/google";
import "./globals.css";
import FerrofluidBackground from "@/components/FerrofluidBackground";

const notoKR = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "만약, 이 감독이었다면 — 한국 국가대표 감독 시뮬레이터",
  description:
    "한국 축구 황금세대가 아까운 팬이 만든 재미용 예측 시뮬레이션. 후보 감독이 오면 한국이 어떤 축구를 하고, 손흥민·이강인·김민재가 살아날지, 월드컵 몇 강까지 갈지 설명 가능한 점수 엔진으로 돌려봅니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoKR.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <FerrofluidBackground />
        <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
            <Link href="/" className="flex items-center gap-2 font-black tracking-tight">
              <span className="text-kr-red">만약,</span>
              <span>이 감독이었다면</span>
            </Link>
            <nav className="flex items-center gap-5 text-sm text-muted">
              <Link href="/#ranking" className="transition-colors hover:text-foreground">궁합 랭킹</Link>
              <Link href="/#way-forward" className="hidden transition-colors hover:text-foreground sm:block">제언</Link>
              <Link href="/methodology" className="transition-colors hover:text-foreground">방법론</Link>
            </nav>
          </div>
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
        <footer className="border-t border-border/60 px-5 py-8 text-center text-xs text-muted">
          <p>모든 수치는 재미를 위한 <span className="text-foreground">모델 추정</span>입니다. 특정 감독·선수 폄하 의도 없음.</p>
          <p className="mt-1">한국 축구를 응원하는 마음으로 만든 팬 시뮬레이션 🇰🇷 · <Link href="/methodology" className="underline hover:text-foreground">방법론·출처</Link></p>
        </footer>
      </body>
    </html>
  );
}
