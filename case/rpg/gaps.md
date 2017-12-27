# Gaps
* Global
  * Styling
* Data Generation
  * Simple CouchDB dump <> Custom mapping
* Publishing process
  * No publishing process
* News
  * No difference
* Reference
  * Doubled entries
  * No Grouping pages
  * Missing symbol
  * Wrong markdown table handling
  * No nicknames
* Characters
  * Missing location tree
  * List not showing
* Organizations
  * **Not originally present**
* Location
  * **Not originally present**
* Items
  * **Not originally present**
* Sessions
  * No accordion  
# Gaps Causes
## Styling
Generic data explorer vs custom site
## Data Generation
Different data model.
No server side transformations.
## Publishing process
Not done yet because explorer is not ready to be published
## Double entries
Old site uses TOC document to show only selected entries
## No grouping pages
Lack of logic to construct page groups
Lack of data model to support page groups
## Missing symbol
No symbol in data
## Wrong markdown table handling
Different markdown library
## No nicknames
Not defined in menu model
No handling for array fields
## Missing location tree
Old site uses TOC document to populate location tree
No data to construct location tree
No code to handle tree construction
## List not showing
Not implemented because of missing location tree.
Missing data (parent) to fill the list
## No accordion 
Different UI library 
