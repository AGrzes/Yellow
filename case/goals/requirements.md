# User Stories
* I want to establish goals
* I want to track progress on goals
* I want to view progress of goals in one place

## Modeling goals
Create a **Goal**, describe it, define due data and assign it to one of the **Categories** then define a **Measurement**. Optionally duplicate and edit existing goal.

## Tracking goals
Manually add an **increment** toward a **Goal**. Preferably automatically add increments.

## Monitoring Goals
Have a dashboard showing progress on current golas grouped by categories and marked according to progress. 

Have a separate dashboard to show past history of goal attainment.

# Data Model
## Goal
A target to hit by **due date** with a **Measurement** to track attainment and **Category** to organize.
## Measurement
One of
* Pass/Fail
* Target number (number)
* Average (number,period)

## Category
A way to organize goals, may have **description** and **Subcategories**.
## Increment
A progress against the goal - with a **date**, optional **description**, and optional **amount**

# Screens
## Planning
A list of open goals with option to create another one.
## Review
A list of recently expired goals (not marked as reviewed) with option to add progress and mark them as processed, or clone them.
## Status
A dashboard with categories and goals in each category. Golas show completion status and estimates. Option to add progress.
## History
Graphs and historic lists for each category. Option to clone old goals.


