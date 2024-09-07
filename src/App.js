
//components
import Home from './components/Home';
import DataProvider from './context/DataProvider';
import Footer from './components/Footer';
function App() {
  return (
    <>
      <DataProvider>
        <Home />
      </DataProvider>
      <Footer/>
    </>
  );
}

export default App;
