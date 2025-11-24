import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

export interface CoursePart {
  name: string,
  exerciseCount: number
}

function App() {
  const courseName: string = "Half stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </>
  );
};

export default App;
