import { createFileRoute } from "@tanstack/react-router";
import Footer4Col from "@/components/ui/footer-column";
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";

export const Route = createFileRoute("/demo")({
  component: DemoOne,
});

export default function DemoOne() {
  return (
    <>
      <AnimatedNavFramer />
      <main className="min-h-screen flex flex-col justify-between">
        <div className="pt-24 px-6 max-w-xl mx-auto text-center flex-grow">
          <h1 className="text-4xl font-light font-display mb-4">
            Navigation with Framer Motion
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Scroll down to see the navigation collapse into a menu button, and scroll up or click to expand it. Use this page to preview both of the newly integrated components.
          </p>
          <div className="h-[150vh]" />
        </div>
        <Footer4Col />
      </main>
    </>
  );
}
