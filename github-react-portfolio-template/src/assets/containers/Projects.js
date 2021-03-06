import React, { useState, useEffect } from "react";
// https://react-bootstrap.github.io/components/cards/#card-columns
import { CardColumns, Card } from "react-bootstrap";
import { filteredProjects, projectData } from "../../data";
import {
  ProjectsError,
  ProjectsLoading,
} from "../components/projectsLoadingError";

// Image
import defualtImage from "../images/logo.svg";
import trImage from "../images/tr.PNG";
import afImage from "../images/af.PNG";
import afroImage from "../images/afro.PNG";
import aptImage from "../images/apt.PNG";
import gorImage from "../images/gor.PNG";
import kjkImage from "../images/kjk.PNG";

const Projects = ({ theme, githubUsername }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const githubUrl = `https://api.github.com/users/${githubUsername}/repos`;

  useEffect(() => {
    fetch(githubUrl)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          setIsError(true);
          setIsLoading(false);
          setError(response.statusText);
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        let check = false;
        if (filteredProjects.length !== 0) {
          let tempObj = {};
          data.forEach((element, index) => {
            tempObj[element.name] = index;
          });
          check = filteredProjects.every((element) => {
            return tempObj[element] !== undefined;
          });
        }
        if (check) {
          let newData = data.filter((projects) =>
            filteredProjects.includes(projects.name)
          );
          if (projectData.length === filteredProjects.length) {
            for (let i = 0; i < projectData.length; i++) {
              newData[i].imageInfo = projectData[i];
            }
          }
          setData(newData);
          setIsLoading(false);
        } else {
          setData(data);
          setIsLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }, [githubUrl]);

  const newTheme = `${theme} d-flex flex-column min-vh-100 justify-content-center align-items-center text-center`;

  if (isLoading) {
    return <ProjectsLoading theme={theme} />;
  }

  if (isError) {
    return <ProjectsError theme={theme} error={error} />;
  }

  // There MUST be one image per repo (see projectData.js)
  if (data.length === projectData.length) {
    return (
      <section id="projects" className={newTheme}>
        <div className="container">
          <h2>Projects</h2>
          <hr />
          <CardColumns>
            {data.map((projects) => {
              return (
                <Card key={projects.id}>
                  <Card.Img
                    variant="top"
                    src={projects.imageInfo.image}
                    alt="Project Image"
                  />
                  <Card.Body>
                    <a
                      href={projects.html_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Card.Title className="d-inline-block">
                        {projects.name}
                      </Card.Title>
                    </a>
                  </Card.Body>
                </Card>
              );
            })}
          </CardColumns>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className={newTheme}>
      <div className="container">
        <h2>Projects</h2>
        <hr />
        <CardColumns>
          {/* {data.map((projects) => {
            return (
              <Card key={projects.id}>
                <Card.Img variant="top" src={defualtImage} />
                <Card.Body>
                  <a href={projects.html_url} target="_blank" rel="noreferrer">
                    <Card.Title className="d-inline-block">
                      {projects.name}
                    </Card.Title>
                  </a>
                </Card.Body>
              </Card>
            );
          })} */}
          <Card >
                <Card.Img variant="top" src={afImage} />
                <Card.Body>
                  <a href="https://afiaanyi.com/shop" target="_blank" rel="noreferrer">
                    <Card.Title className="d-inline-block">
                      Afiaanyi Marketplace
                    </Card.Title>
                  </a>
                </Card.Body>
                
              </Card>
              <Card>
              {/* <Card.Img variant="top" src={defualtImage} /> */}
              <Card.Img variant="top" src={trImage} />

              <Card.Body>
                  <a href="https://tworeport.netlify.app/" target="_blank" rel="noreferrer">
                    <Card.Title className="d-inline-block">
                      TwoReport
                    </Card.Title>
                  </a>
                </Card.Body>
              </Card>
              <Card>
              <Card.Img variant="top" src={gorImage} />

              <Card.Body>
                  <a href="https://www.thegorillasquad.com/" target="_blank" rel="noreferrer">
                    <Card.Title className="d-inline-block">
                      Gorilla Squad
                    </Card.Title>
                  </a>
                </Card.Body>
              </Card>
              <Card>
              <Card.Img variant="top" src={kjkImage} />

              <Card.Body>
                  <a href="https://kjk.africa/" target="_blank" rel="noreferrer">
                    <Card.Title className="d-inline-block">
                      KJK Africa
                    </Card.Title>
                  </a>
                </Card.Body>
              </Card>
              <Card>
              <Card.Img variant="top" src={afroImage} />

              <Card.Body>
                  <a href="https://afrotrap-main.vercel.app/" target="_blank" rel="noreferrer">
                    <Card.Title className="d-inline-block">
                      Afrotrap eCommerce
                    </Card.Title>
                  </a>
                </Card.Body>
              </Card>
              <Card>
              <Card.Img variant="top" src={aptImage} />

              <Card.Body>
                  <a href="https://apriltravels.netlify.app/" target="_blank" rel="noreferrer">
                    <Card.Title className="d-inline-block">
                      April Travels
                    </Card.Title>
                  </a>
                </Card.Body>
              </Card>
        </CardColumns>
      </div>
    </section>
  );
};

export default Projects;
