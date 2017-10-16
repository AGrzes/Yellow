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
