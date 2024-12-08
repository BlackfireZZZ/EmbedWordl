import React, {useState} from 'react';
import GraphComponent from './components/GraphComponent';
import SumWords from "./components/SumWords";

const App = () => {
  const [currentWord, setCurrentWord] = useState('First Value');
  const data = [
    ['First value', [1, 2]],
    ['Second value', [3, 4]],
    ['Third value', [5]],
    ['Fourth value', []],
    ['Fifth value', [0]],
    ['Sixth value', [2, 4]],
  ];

  return (
      <div style={{width: "100%", height: "100vh", display: "flex", flexDirection: "column"}}>
          <GraphComponent data={data} setCurrentWord={setCurrentWord}/>
          <SumWords currentWord={currentWord}/>
      </div>
  );
};

export default App;
