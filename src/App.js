
//components
import Home from './components/Home';
import DataProvider from './context/DataProvider';
import Footer from './components/Footer';
import Console from './components/Console';
function App() {
  return (
    <>
      <DataProvider>
        <Home />
        <Console />
      </DataProvider>

      <Footer />
    </>
  );
}

export default App;
