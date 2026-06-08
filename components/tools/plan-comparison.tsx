import { BrandMark } from "@/components/brand-mark";
import { toneClassMap, type BrandId, type BrandTone } from "@/lib/brand-library";

const plans: {
  name: string;
  price: string;
  audience: string;
  pros: string;
  limits: string;
  brand: BrandId;
  tone: BrandTone;
}[] = [
  {
    name: "ChatGPT Plus",
    price: "$20 / 月",
    audience: "通用场景用户、学生、内容工作者",
    pros: "生态成熟、使用门槛低、适用面广",
    limits: "中文资料多但也最容易信息过载，支付路径需先验证",
    brand: "chatgpt",
    tone: "forest",
  },
  {
    name: "Claude Pro",
    price: "$20 / 月",
    audience: "长文本写作、文档阅读、产品思考用户",
    pros: "长文理解舒服，写作与总结体验稳定",
    limits: "地区和支付路径限制更敏感，先确认可用性",
    brand: "claude",
    tone: "sunrise",
  },
  {
    name: "Cursor Pro",
    price: "$20 / 月",
    audience: "个人开发者、独立开发者、学生项目",
    pros: "直接嵌入 IDE，开发闭环体验好",
    limits: "更吃你的项目结构和提示词习惯，不等于自动写完产品",
    brand: "cursor",
    tone: "graphite",
  },
  {
    name: "Perplexity Pro",
    price: "$20 / 月",
    audience: "检索密集型学习、研究和资料整理用户",
    pros: "搜索与总结一体化，适合做资料入口",
    limits: "更偏信息获取，不适合作为唯一主力模型",
    brand: "perplexity",
    tone: "ocean",
  },
];

export function PlanComparisonTable() {
  return (
    <section className="card overflow-hidden">
      <div className="border-b border-line px-6 py-5">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          订阅方案对比表
        </h2>
        <p className="mt-2 text-sm leading-7 text-muted">
          先看自己更像哪类用户，再决定先订哪一个。
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-soft text-foreground">
            <tr>
              <th className="px-6 py-4 font-semibold">方案</th>
              <th className="px-6 py-4 font-semibold">价格</th>
              <th className="px-6 py-4 font-semibold">适合人群</th>
              <th className="px-6 py-4 font-semibold">优点</th>
              <th className="px-6 py-4 font-semibold">限制</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => {
              const tone = toneClassMap[plan.tone];

              return (
              <tr key={plan.name} className="border-t border-line align-top">
                <td className="px-6 py-4">
                  <div className="space-y-3">
                    <BrandMark brand={plan.brand} size="sm" />
                    <p className="font-medium text-foreground">{plan.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted">{plan.price}</td>
                <td className="px-6 py-4 text-muted">{plan.audience}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] ${tone.badge}`}>
                    优点
                  </span>
                  <p className="mt-3 text-muted">{plan.pros}</p>
                </td>
                <td className="px-6 py-4 text-muted">{plan.limits}</td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </section>
  );
}
