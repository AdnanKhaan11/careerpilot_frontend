import { Outlet } from "react-router-dom";

import Header from "./Header";
import PageContainer from "./PageContainer";

export default function MainContent() {
  return (
    <main className="flex min-h-screen flex-1 flex-col overflow-hidden">
      <Header />

      <PageContainer>
        <Outlet />
      </PageContainer>
    </main>
  );
}
