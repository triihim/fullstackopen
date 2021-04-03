import { assert } from 'node:console';
import React from 'react';

const assertNever = (arg: never): never => { throw new Error(`Unhandled arg: ${arg}`) };

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseWithDescription extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CourseWithDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseWithDescription {
  type: "special",
  requirements: Array<string>
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

interface HeaderProps { courseName: string }
const Header = ({ courseName }: HeaderProps) => {
  return (
    <h1>{courseName}</h1>
  );
};

interface PartProps { coursePart: CoursePart }
const Part = ({ coursePart }: PartProps) => {

  const normal = (part: CourseNormalPart): JSX.Element => {
    return (
      <div>
        <h4>{part.name} {part.exerciseCount}</h4>
        <p><em>{part.description}</em></p>
      </div>
    );
  };

  const groupProject = (part: CourseProjectPart): JSX.Element => {
    return (
      <div>
        <h4>{part.name} {part.exerciseCount}</h4>
        <p>projects {part.groupProjectCount}</p>
      </div>
    );
  };

  const submission = (part: CourseSubmissionPart): JSX.Element => {
    return (
      <div>
        <h4>{part.name} {part.exerciseCount}</h4>
        <p><em>{part.description}</em></p>
        <p>submit to: {part.exerciseSubmissionLink}</p>
      </div>
    );
  };

  const special = (part: CourseSpecialPart): JSX.Element => {
    return (
      <div>
        <h4>{part.name} {part.exerciseCount}</h4>
        <p><em>{part.description}</em></p>
        <span>required skills: </span>
        {part.requirements.map((r, i) => <span key={r}>{r}{ i === part.requirements.length - 1 ? "" : ", "}</span>)}
      </div>
    );
  };

  switch(coursePart.type) {
    case "normal": return normal(coursePart);
    case "groupProject": return groupProject(coursePart);
    case "submission": return submission(coursePart);
    case "special": return special(coursePart);
    default: return assertNever(coursePart);
  }

};

interface ContentProps { courseParts: Array<CoursePart> }
const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map(c => <Part key={c.name} coursePart={c} /> )}
    </>
  );
};

interface TotalProps { courseParts: Array<CoursePart> }
const Total = ({ courseParts }: TotalProps) => {
  return (
    <>
      <p>
        number of exercises:
        {courseParts.reduce((total, c) => total + c.exerciseCount, 0)}
      </p>
    </>
  )
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;