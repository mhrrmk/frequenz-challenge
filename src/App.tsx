import "antd/dist/antd.css";
import "styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Home from "pages";

function App(): JSX.Element {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      <ReactQueryDevtools
        // toggleButtonProps={{ style: { display: "none" } }}
        initialIsOpen={false}
      />
    </QueryClientProvider>
  );
}

export default App;
