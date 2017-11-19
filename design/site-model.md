Site model will be defined as Yaml file.

The file will have the following structure

```yaml 
type: SiteModel
menu:
 - name: (Item Name)
   view: 
     (View Definition)
   submenu:
    - (Menu Item)
```
where: 
* `(Item Name)` is a menu item name
* `(View Definition)` is view definition object - initially string with view content
* `(Menu Item)` is a whole another menu item with possible sub-menu

The View definition have a following metamodel:
```yaml
type: DataModel
classes:
 - name: View
 - name: ListView
   is: View
   attributes:
     selector:
       type: Selector
     itemTemplate:
       type: Template
 - name: Selector
 - name: TypeSelector
   is: Selector
   attributes:
     selector:
       type: string
     includeSubtypes: 
       type: boolean
 - name: Template
 - name: InlineTemplate
   is: Template
   attributes:
     template: 
       type: string
 - name: FileTemplate
   is: Template
   attributes:
     file: 
       type: string                        
``` 

# DeclarativeView
A view containing a single control definition as contents
# Controls
## List
A control for displaying list
* list - definition of obtaining the list 
  * selector - expression applied to all entities (current entity as this) should return truth-y value if entity should be included
  * constructor - expression applied to current entity (current entity as this) should return an array of entities to show
  * order - expression used to sort the list (current entity as this)
* style
  * plain - simple wrapper
  * list - list wrapper
* item - definition how to render an item - a single control where item become current entity

## Card
Card control wrapper
* contents list of controls
* order as they appears
* slot used to fit into card part
  * header
  * content (default)

## Field
Field display
* field - to display
* format - one of
  * date
  * string (default)
  * markdown - render markdown to html
* pattern - used to transform the field with mustache template (with field value as this)
* decoration - one of
  * none (default)
  * badge

## Property
Field with label
* As field
* label - field label

## ListItem
List item control wrapper
* contents list of controls
* order as they appears
* slot used to fit into card part
  * header
  * sub-header
  * content (default)

## TOC
Table of content with hierarchy tree
* list - definition of obtaining the roots list 
  * selector - expression applied to all entities (current entity as this) should return truth-y value if entity should be included
  * constructor - expression applied to current entity (current entity as this) should return an array of entities to show
  * order - expression used to sort the list (current entity as this)
* children - expression applied to current entity (current entity as this) should return an array of children to show
* item - single control to render item

## MesterDetail
Two part control showing navigation and single selected item
* master - master control
* detail - detail control

## DetailsLink
Link to an entity
* label - field to use as link label

