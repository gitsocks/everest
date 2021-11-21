# everest
A AuthZ permissions UI package.

## Overview
Everest is a module built using Typescript that allows for easy authorization in a project. Implement authZ in your project using Everest is extremely simple.

### Abilities
`Abilities` refer to what type of action can be executed by a user. There are four abilities: `create`, `read`, `update`, `delete`. 

### Entities
`Entities` refer to the specific object on which the user can perform a specific `ability`. 

### Qualifications
`Qualifications` refer to specific criteria that determine whether the user qualifies to perform an `ability` on an `entity`. 

### SecurityContexts
`SecurityContexts` are the objects that group `abilities`, `entities` and `qualifications` into one object which is then validated by the module.

## Easy-to-Read
This API has been designed to read easily. For example, one would say: "Billy can read a list of drivers given that they are in the city of New York". To put this into code using the API, it would look something like this: 
``` typescript
const result = new Everest(user).can("read").on("driver").with([{ field: "city", value: "New York"}]).check();
```