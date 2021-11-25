import "antd/dist/antd.css";
import "styles/global.css";
import { QueryClient, QueryClientProvider } from "react-query";

import Home from "pages";
import { StateProvider } from "providers";

function App(): JSX.Element {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <StateProvider>
                <Home />
            </StateProvider>
        </QueryClientProvider>
    );
}

export default App;
