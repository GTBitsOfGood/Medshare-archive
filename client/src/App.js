import React from 'react';
import { Label } from './components/Label';

function App() {
  const labelData = {
    name: "Kitten",
    productReference: "YEET",
    category: "Cutie pies",
    subcategory: "Cutie Queen",
    uom: "Whole",
    description: `Lorem ipsum dolor sit amet consectetur 
adipisicing elit. Ullam ut molestiae neque maxime 
praesentium fuga culpa, eos dolore? Aperiam fugit 
ducimus ipsa tempora enim, porro ab molestiae id ea 
repudiandae.`,
  }
  return (
      <Label labelData={labelData}/>
  );
}

export default App;
