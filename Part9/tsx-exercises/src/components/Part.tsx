import type { CoursePart } from "../App";

function Part({ coursePart }: { coursePart: CoursePart }) {

  const { name, exerciseCount } = coursePart;

  function assertNever(value: never): never {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  function renderBasic(name: string, exerciseCount: number) {
    return (
      <>
        <h2>{name}</h2>
        <p>Exercises: {exerciseCount}</p>
      </>
    );
  };

  function renderDescription(description: string) {
    return (
      <div>
        <p><i>{description}</i></p>
      </div>
    );
  };

  function renderSwitch(part: CoursePart) {
    switch (part.kind) {
      case "basic":
        return (
          <div>
            {renderBasic(name, exerciseCount)}
            {renderDescription(part.description)}
          </div>
        );
      case "group":
        return (
          <div>
            {renderBasic(name, exerciseCount)}
            <p>Group projects: {part.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            {renderBasic(name, exerciseCount)}
            {renderDescription(part.description)}
            <p><a href={`${part.backgroundMaterial}`}>See here for more background information.</a></p>
          </div>
        );
      case "special":
        return (
          <div>
            {renderBasic(name, exerciseCount)}
            {renderDescription(part.description)}
            <div>Requirments:
              <ul>
                {part.requirements.map(r => {
                  return <li key={r}>{r}</li>
                })}
              </ul>
            </div>
          </div>
        )
      default:
        return assertNever(part);
    };
  };

  return (
    <div>
      {renderSwitch(coursePart)}
    </div>
  );
};

export default Part;
