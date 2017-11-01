# Components
## Metamodel
Describes single model metadata - types, attributes ant their relations.
The component should define configuration metamodel.
The component should provide a way to query and explore the metadata.
## Explorer config
Describes a single model explorer.
The component should define configuration metamodel.
The component should provide a way to query and explore configuration.
## Loader config
Describes a procedure to load model from sources.
The component should define configuration metamodel.
The component should provide a way to query and explore configuration.
## Data loader
Perform model loading based on configuration.
## Data
Manages access and interaction with model instance.
## Explorer builder (dsl)
Builds explorer configuration using script (builder pattern) or DSL
## Loader builder (dsl)
Builds loader configuration using script (builder pattern) or DSL
## Explorer
Displays data model using model config and explorer config.
## Exporter
Generates export or report based on Data Model and Exporter Config
## Exporter config
Describes a procedure to generate export from Data Model.
The component should define configuration metamodel.
The component should provide a way to query and explore configuration.
## Exporter builder (dsl)
Builds exporter configuration using script (builder pattern) or DSL
## Metamodel builder (dsl)
Builds metamodel using script (builder pattern) or DSL
