[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=9297448&assignment_repo_type=AssignmentRepo)
# DSCI 554 Project

Team name: Quad Squad

Team members:

- Neha Gupta <ngupta72@usc.edu>
- Priscilla Lee <lee088@usc.edu>
- Sanjana Vasireddy <svasired@usc.edu>
- Shyam Krishnan Ondanat Veetil <ondanatv@usc.edu>

## Project summary (max 250 words)
Climate change is an immense and pressing issue that affects people around the world. Although there has been increasingly more attention and efforts to address it, there are still large areas for improvement. In this project, we create an interactive dashboard composed of several components that allow users to explore the several features in our dataset that relate to carbon dioxide (CO2) emissions and view our model's prediction of emissions levels in a given year. The visualizations in this project highlight important features in relation to emissions levels such as energy use per capita and population growth.

## Technical Challenges and Risks
One technical challenge we faced was working with the Vue.js framework. The way we addressed this as a team was first creating and testing our visualizations using vanilla JavaScript code, with which we were more familiar, then converting it into a form that produced the same result using Vue.js. We also used examples from class to familiarize ourselves with the framework and how to apply the structure and methodology for our dashboard.

Another technical challenge we faced was merge conflicts. We used GitHub for version control and to ensure all team members remained up to date on the most recent changes. During simultaneous work, we would occasionally encounter merge conflicts and in some cases, work was lost during attempts to resolve the merge conflict. Since we developed and followed a timeline with some built-in extra time, we were able to recreate those changes and resolve the conflicts, though we could have also employed other methods such as stashing changes to avoid loss of progress.

One risk is regarding the beeswarm chart we created on emissions from diesel-based sources. We were able to successfully create the chart fully in vanilla JavaScript but during integration with Vue, the y axis label does not show consistently on the Vue version when interacting with the chart. 

## Artifacts

- Demo: [Demo link](https://github.com/DSCI-554/project-quad-squad). To run the Javascript app, clone this repository, run npm install, and open the respective HTML pages for each chart. Please refer to README.md in vue-app directory for instructions on running the Vue app.
- Model performance notebooks: [Model](js-app/model/emission_prediction.ipynb), [Data cleaning and visualization](js-app/preprocessing/data_cleaning.ipynb) 
- Paper: [Overleaf read-only link](https://www.overleaf.com/read/wzkmjmgmdtnq) and [paper PDF](paper/paper.pdf)
- Video: [YouTube link](https://youtu.be/yWlpT0c8J_I)

## Contributions

### UI and Demo

- Integrated the individual charts into Vue: [Neha Gupta](mailto:ngupta72@usc.edu)
- Created the Circle Packing Chart, Sunburst, Beeswarm and the KPI metric: [Neha Gupta](mailto:ngupta72@usc.edu), [Shyam Krishnan Ondanat Veetil](mailto:ondanatv@usc.edu), [Priscilla Lee](mailto:lee088@usc.edu)
- Created the Scatter plot, Bar chart, and Area chart: [Priscilla Lee](mailto:lee088@usc.edu), [Sanjana Vasireddy](mailto:svasired@usc.edu)
- Created the Mapbox chart: [Priscilla Lee](mailto:lee088@usc.edu), [Neha Gupta](mailto:ngupta72@usc.edu)


### Model performance analysis

- Developed code around preprocessing/processing the data and extracting important features as model input: [Neha Gupta](mailto:ngupta72@usc.edu), [Priscilla Lee](mailto:lee088@usc.edu), [Sanjana Vasireddy](mailto:svasired@usc.edu)

- Developed XGBoost model for predicting emissions. Tested model and calculated RMSE as model performance metric: [Shyam Krishnan Ondanat Veetil](mailto:ondanatv@usc.edu)


### Additional Charts

- Created [beeswarm](js-app/beeswarm.html) and [bar chart](js-app/barchart.html) using Javascript: [Sanjana Vasireddy](mailto:svasired@usc.edu)
- Additional charts were not converted to Vue due to event handling issues for the interaction in the graphs


### Paper

- Set structure and wrote the first drafts of content for all sections. Wrote content for README.md documenting our work: [Shyam Krishnan Ondanat Veetil](mailto:ondanatv@usc.edu), [Sanjana Vasireddy](mailto:svasired@usc.edu), [Neha Gupta](mailto:ngupta72@usc.edu)

- Edited, proofread, and added content as necessary to all sections to ensure effective communication of our work and strong cohesion throughout the report. Wrote content for README.md documenting our work and challenges faced: [Priscilla Lee](mailto:lee088@usc.edu)


### Video

- Presented all our work: [Neha Gupta](mailto:ngupta72@usc.edu), [Priscilla Lee](mailto:lee088@usc.edu), [Shyam Krishnan Ondanat Veetil](mailto:ondanatv@usc.edu), [Sanjana Vasireddy](mailto:svasired@usc.edu)

