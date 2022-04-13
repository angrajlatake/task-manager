import "./App.scss";
import ListingTask from "./components/ListingTask/ListingTask";

function App() {
  return (
    <div className="App">
      <div className="App__bg">
        <header className="header">
          <h1 className="header__title">Daily Tasks</h1>
        </header>
        <ListingTask/>
      </div>
    </div>
  );
}

export default App;
