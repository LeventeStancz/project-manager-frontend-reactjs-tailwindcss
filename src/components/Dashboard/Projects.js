import ProjectCard from "./ProjectCard/ProjectCard";

function Projects({ projects }) {
  return (
    <div className="w-full h-fit flex flex-wrap gap-10 mt-10">
      {projects?.length === 0 ? (
        <h2 className="w-full h-full text-custom-purple font-bold text-2xl text-center">
          You have no projects at this time.
        </h2>
      ) : (
        projects.map((project) => {
          return (
            <ProjectCard
              _id={project._id}
              key={project._id}
              name={project.name}
              shortDescription={project.shortDescription}
              finished={project.finished}
              memberCount={project.memberCount}
              taskCount={project.taskCount}
            />
          );
        })
      )}
    </div>
  );
}

export default Projects;
