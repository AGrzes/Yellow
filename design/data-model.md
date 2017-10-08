Data model will be defined as Yaml file.

The file will have the following structure

```yaml 
type: DataModel
classes:
 - name: (Class Name)
   is: (Parent Class Name) # optional
   attributes: 
    (Attribute Name): 
      type: (Attribute Type)
      multiplicity: (Attribute Multiplicity)
```

where: 
* `(Class Name)` is a name ot the class
* `(Parent Class Name)` is a name of extended class
* `(Attribute Name)` ia a name of attribute
* `(Attribute Type)` is a name of a class or one of `int`,`string`,`float`,`boolean`
* `(Attribute Multiplicity)` - is multiplicity of attribute - one of `1` (default), `*`
