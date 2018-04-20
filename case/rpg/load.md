# Structure As Is
Model folder with several sub-folders
## Changelog
Each sub-folder represents single entity
* metadata.yaml - stores entity attributes
* changes.md - stores markdown for `changes` attribute
* Name of the folder maps to `lp` attribute.
* `changelog:<lp>` is entity id

# Geo
Each sub-folder represent entity
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
* Reference
* Rules
* Session

