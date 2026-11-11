import "@/App.css";
import Home from "@/pages/Home";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Home />
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
