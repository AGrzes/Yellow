# Structure As Is
Model folder with several sub-folders
## Changelog
* Each sub-folder represents single entity
* metadata.yaml - stores entity attributes
* changes.md - stores markdown for `changes` attribute
* Name of the folder maps to `lp` attribute.
* `changelog:<lp>` is entity id

## Geo
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

## Misc
Folder not processed.
## Organization
* First level sub-folder map to a `type` attribute.
* Each subsequent sub-folder represent entity
* metadata.yaml - stores entity attributes
* Name of the folder maps to `<snake-case-name>`. 
* `StartCase(snake-case-name)` maps to `name` attribute
* `<type>:<snake-case-name>` is entity id
* Base entity have parent child relations with additional nested `parts`/`partOf`

## Reference
* Each sub-folder represent entity
* Name of the folder maps to `<type>:<snake-case-name>`. 
* `type` maps to `type` attribute.
* `StartCase(snake-case-name)` maps to `name` attribute
* Parent child relation maps to `members`/`container`
* metadata.yaml - stores entity attributes
* content.md - stores markdown for `content` attribute

## Rules
Folder not processed.
## Session
* Each sub-folder represents single entity
* metadata.yaml - stores entity attributes
* events.md - stores markdown for `events` attribute
* Name of the folder maps to `lp` attribute.
* `session:<lp>` is entity id

# Common patterns
* Type in folder name
* Type in root folder
* Parent child relation by nesting folders
  * Custom names for that relation
* metadata.yaml file for folder-entity metadata
* *.md file containing content of attribute named like file name
* Start case for name attribute
* Snake case and type for ID

# Builder sample

## Initial
```javascript
loader().key('{{type}}:{{snake-case name}}')
.path('changelog').folder('lp').attributes('metadata.yaml').attributeFile('changes.md',/*'changes'*/).key('changelog:{{lp}}')
.path('organization').folder('type').hierarchy('parts','partOf').attributes('metadata.yaml').folder('snake-name').map('name','{{start-case snake-name}}')
.path('sessions').folder('lp').attributes('metadata.yaml').attributeFile('events.md',/*'events'*/).key('session:{{lp}}')
.path('reference').hierarchy('members','container').attributes('metadata.yaml').folder(\(.*):(.*)\,[null,'type','snake-name']).map('name','{{start-case snake-name}}').attributeFile('content.md',/*'content'*/)
.path('geo').hierarchy('locations','in').attributes('metadata.yaml').folder(\(.*):(.*)\,[null,'type','snake-name']).map('name','{{start-case snake-name}}').attributeFile('description.md',/*'events'*/).additional(file(\(.*):(.*)\,[null,'type','snake-name']).hierarchy('{{type}}s','locations'))
```
## Second Attempt
```javascript
loader().key(attribute('type').separator(':').attribute(name).snakeCase())
.path('changelog').attribute('type','changelog').folder(attribute(lp)).key(attribute('type').separator(':').attribute('lp')).file('metadata.yaml').attributes().file('changes.md').attribute()
```

# Processing model
* Traverse working directory
  * Use stack-context with each stack frame inheriting but overriding attributes from parent context
* Map folder name to attributes using defined mapping
* If key is calculable then emit entity with current context
* When descending into folder or file pass parent key attribute
* When descending into file look for parser that is able to extract structure from file
  * If no parser is available then define attachment attribute based on file

## Step by Step Sample
1. Start with base folder - key resolver set to `attribute('type').separator(':').attribute(name).snakeCase()`
2. Descent into `changelog` folder
3. Unable to calculate key
4. Match `changelog` path
5. Set key resolver set to `attribute('type').separator(':').attribute('lp')`
6. Set `type` attribute in current context to `changelog`
7. Unable to calculate key
8. Descend into `1` folder
9. Set `lp` attribute to `1`
10. Emit entity event for current folder
11. Descend into `metadata.yaml` file
12. Parse file with Yaml parser
13. Emit entity event for `metadata.yaml` file
11. Descend into `changes.md` file
12. Parse file with plain text parser
13. Emit entity event for `changes.md` file

