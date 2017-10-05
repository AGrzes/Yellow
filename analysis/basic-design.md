# Components
## Config Service
Exposes the metadata including:
* Object model
* UI structure
* Model -> UI mapping
## Data Service
Exposes model
## Navigation
Interprets UI structure and generates navigation controls and containers. 
## List UI
Generates nad controls list display
* Decides which items to display
* Decides how to present them
## Item UI
Generates and controls item display
* Decides how to display item
# Basic Implementation
* Config Service -> Static File (Prepared)
* Data Service -> Static File (Prepared)
* Navigation -> Top Menu + Content
* List UI -> Simple Repetition of Mustache Template
* Item UI -> Mustache Template
