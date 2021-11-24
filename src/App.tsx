import "antd/dist/antd.css";
import "styles/global.css";
import { QueryClient, QueryClientProvider } from "react-query";

import Home from "pages";

function App(): JSX.Element {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Home />
      </div>
    </QueryClientProvider>
  );
}

export default App;
