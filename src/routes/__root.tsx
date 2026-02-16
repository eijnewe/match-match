import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { PageContainer } from "@/components/layout/PageContainer";
import { Header } from "@/components/header";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-col flex-1 items-stretch">
          <PageContainer>
            <Outlet />
          </PageContainer>
        </div>
      </div>
    </ThemeProvider>
  );
}
