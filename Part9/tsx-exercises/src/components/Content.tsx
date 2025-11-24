import type { CoursePart } from "../App";
import Part from "./Part";

function Content({ courseParts }: { courseParts: CoursePart[] }) {
  return (
    <div>
      {courseParts.map(part => {
        return (
          <div key={part.name}>
            <Part coursePart={part} />
          </div>
        )
      })}
    </div>
  );
};

export default Content;
