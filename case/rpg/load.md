# Structure As Is
Model folder with several sub-folders
## Changelog
* Each sub-folder represents single entity
* metadata.yaml - stores entity attributes
* changes.md - stores markdown for `changes` attribute
* Name of the folder maps to `lp` attribute.
* `changelog:<lp>` is entity id

# Geo
* Each sub-folder represent entity
* Name of the folder maps to `<type>:<snake-case-name>`. 
* `type` maps to `type` attribute.
* `StartCase(snake-case-name)` maps to `name` attribute
* Parent child relation maps to `locations`/`in`
* `<type>:<snake-case-name>` is entity id
* `<type>:<snake-case-name>.yaml` contains entity metadata
* `<type>:<snake-case-name>.md` contains entity `description`
* `<type'>:<snake-case-name>.yaml` where `<type'>:<snake-case-name>` is not entity ID contains additional entities
  * `<type'>` maps to additional entities `type` attribute if it is not already defined
  * Base entity have parent child relations with additional entities `<type'>s`/`location`

# Misc
Folder not processed.
# Organization
* First level sub-folder map to a `type` attribute.
* Each subsequent sub-folder represent entity
* metadata.yaml - stores entity attributes
* Name of the folder maps to `<snake-case-name>`. 
* `StartCase(snake-case-name)` maps to `name` attribute
* `<type>:<snake-case-name>` is entity id
* Base entity have parent child relations with additional nested `parts`/`partOf`

# Reference
* Each sub-folder represent entity
* Name of the folder maps to `<type>:<snake-case-name>`. 
* `type` maps to `type` attribute.
* `StartCase(snake-case-name)` maps to `name` attribute
* Parent child relation maps to `members`/`container`
* metadata.yaml - stores entity attributes
* content.md - stores markdown for `content` attribute
# Rules
Folder not processed.
# Session
* Each sub-folder represents single entity
* metadata.yaml - stores entity attributes
* events.md - stores markdown for `events` attribute
* Name of the folder maps to `lp` attribute.
* `session:<lp>` is entity id

