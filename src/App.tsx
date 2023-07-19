import './App.css';
import Info from './components/Info';
import Summary from './components/Summary';

const App = (): JSX.Element => (
  <main>
    <div className="main">
      <div className="gradient" />
    </div>
    <div className="app">
      <Info />
      <Summary />
    </div>
  </main>
);

export default App;
