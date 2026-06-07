import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-[60vh] items-center justify-center py-16">
      <div className="card max-w-xl p-8 text-center">
        <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
          这页暂时没找到
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          你可以先回首页，或者从分类页继续找对应的订阅、支付和避坑内容。
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
          >
            回到首页
          </Link>
          <Link
            href="/category"
            className="rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            查看分类
          </Link>
        </div>
      </div>
    </div>
  );
}
