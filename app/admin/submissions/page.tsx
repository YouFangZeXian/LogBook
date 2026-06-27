import { SubmissionReviewAdmin } from "@/components/submission-review-admin";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `投稿审核后台 | ${siteConfig.shortName}`,
  description: "审核投稿、补充、纠错和问题反馈，形成内容运营最小闭环。",
  path: "/admin/submissions",
});

export default function AdminSubmissionsPage() {
  return <SubmissionReviewAdmin />;
}
