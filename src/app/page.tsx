import BasimProvider from "@/components/BasimProvider";
import CompEditor from "@/components/CompEditor";

export default function Home() {
  return (
    <div>
      <main>
        <BasimProvider>
          <CompEditor />
        </BasimProvider>
      </main>
    </div>
  );
}
