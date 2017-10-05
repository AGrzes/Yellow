There are several types of entities
* Characters
* Locations
* Organizations
* Items
* Sessions
* Scenes
* Articles

All entities are characterized by name and description

# Characters
Characters have:
* Nicknames
* Relations with other characters
* Positions inside organizations
* Items

# CharacterPositions
Character positions can be 
* Member
* Leader
* Enemy

# CharacterRelations
Character relations have:
* Reverse relations

# Locations
Locations can be pert of other locations
Locations can have 
* A map
* Associated characters
* Neighbors

Locations can be:
* Counties
* Settlements
* Generic locations

# Neighbors
Neighbors have:
* Direction
* Borders

# Organizations
Organizations can be part of other organizations

Organizations can be:
* Religions
* Domains
* Guilds

# Items
Item have:
* Kind
* Value

# Sessions
Sessions have:
* XP Award
* Real world date
* Associated scenes

# Scenes
Scenes have
* In game time period
* Location
* Participants

# Articles
Can be:
* General Articles
* Descriptions of Deities

# Presentations
All information should be grouped in the following groups:
* Reference
* Characters
* Locations
* Organizations
* Items
* Sessions

## Reference
* Should present all articles organized according to table of content
* Should present generic articles rendering markdown in description
* Should present deities descriptions presenting separate table with deity characteristics

## Characters
* Should present all characters organized by location
* Should present every character in short form by name and positions
* Should present character in long form rendering markdown in description and presenting positions and relations
* Should allow to navigate to the target of position or relation

## Locations
* Should present location hierarchy
* Should present location in long form rendering markdown in description and presenting parents, childs and neighbors
* Should allow to navigate to related locations

## Organizations
* Should present all top level organizations grouped by kind
  * Religion
  * Domain
  * Guild
* Should present organization in long form rendering markdown in description and presenting organization structure and members
* Should allow to navigate to related organizations and characters

## Items
* Should present flat list of items

## Sessions
* Should present flat list of sessions
* Should present session in long form constructed from events  
