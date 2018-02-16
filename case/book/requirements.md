# User stories
* As an user I want to know what to read next
* As an user I want to know what books to acquire
* As an user I want to capture and organize reading ideas
* As an user I want to track my reading progress

## Reading List
Ranked list of **Books** possibly categorized by **Author** , **Genre** or **Series**.
## Acquisition List
Ranked list of **Books** with information where I can acquire them. A way to attach that information.
## Reading Ideas
A input area to capture **ideas** . A process to turn an Idea into one or more **Books** by extracting **book title**, **author** and potentially **series** marking **Idea** as processed. A tool to lookup **Book** data and related **books** in external sources. A chance to correct mislabelled books. 

## Reading progress
Ability to add progress to a **Book** on reading list or marking it as complete.

# Data Model
## Book
A main entity characterized by **Title**, **Description** one or more **Authors**, zero or one **Series** and zero or more **Labels**.
## Author
A person writing **books**. Characterized by **Name**, **Description**, a set of written **Books** and zero or more **Labels**.
## Series
A ordered list of **books**. Characterized by **Name**, **Description**, a list of **Books** and zero or more **Labels**.
## Wanted Book
A reference to a **book** along with **information where to find it (description)**.
## Owned Book
A reference to a **book** along with **information of form and place**.
## Read Book
A reference to a **book** along with **priority**, **reading status** and a list of **progress**
## Progress
An entry about reading progress with **Read Book** reference, a **date** and optional **description**
# Storage
A folder with Yaml files - each containing one or more **Books**, **Series** or **Authors**. **Authors** can contain **Book** and **Series** entries. **Series** can contain **Books**. **Book** can define **Author** in place.

**Wanted Books** and **Read Books** as separate - automatically managed (hidden files) 

# Screens
## Reading List

## Wanted Books

## Explorer
* Root types
* Entity details
* Browsing related
* Filters
* Operations
  * Add to wanted list
  * Mark Acquired
  * Add to Reading List
