import { Outlet } from "react-router-dom";

import Header from "./Header";
import PageContainer from "./PageContainer";
import TraceBar from "../../components/traces/TraceBar";

export default function MainContent() {
  return (
    <main className="flex min-h-screen flex-1 flex-col overflow-hidden">
      <Header />

      <TraceBar />

      <PageContainer>
        <Outlet />
      </PageContainer>
    </main>
  );
}
