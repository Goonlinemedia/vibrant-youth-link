import { createFileRoute } from "@tanstack/react-router";
import Footer4Col from "@/components/ui/footer-column";

export const Route = createFileRoute("/demo")({
  component: DemoOne,
});

export default function DemoOne() {
  return <Footer4Col />;
}
