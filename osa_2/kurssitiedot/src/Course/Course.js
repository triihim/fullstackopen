const Header = ({courseName}) => {
    return (
      <header>
        <h1>{courseName}</h1>
      </header>
    );
  }

const Part = ({content}) => {
    return (
        <p>
        {content.name} {content.exercises}
        </p>
    );
}

const Content = ({parts}) => {
    return (
        <div>
        {parts.map(p => <Part key={p.id} content={p} />)}
        </div>
    );
}

const Total = ({count}) => {
    return (
        <p>
        <strong>Total number of exercises {count}</strong>
        </p>
    );
}

const Course = ({course}) => {
    return (
        <div>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            <Total count={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
        </div>
    );
}

export default Course;