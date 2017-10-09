Menu model will be defined as Yaml file.

The file will have the following structure

```yaml 
type: SiteModel
menu:
 - name: (Item Name)
   action: 
     (View Definition)
   submenu:
    - (Menu Item)
```
where: 
* `(Item Name)` is a menu item name
* `(View Definition)` is view definition object - initially string with view content
* `(Menu Item)` is a whole another menu item with possible sub-menu
