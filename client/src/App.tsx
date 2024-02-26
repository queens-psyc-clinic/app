import Navbar from "./components/Navbar";
import Card from "./components/Card";
import cardSampleData from './models/cardSampleData';

function App() {
  return (
    <div className="w-screen h-screen bg-white flex items-center px-4">
      <Navbar />
      <div className="m-10 w-full h-[50%] max-w-screen-lg">
        <div className="ml-4 sm:ml-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {cardSampleData.map((data) => (
            <Card key={data.id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

