### Frist run these scripts
- Install: ```npm install```
- Build: ```npm run build```
- Lint: ```npm run lint```
- Run unit tests: ```npm run test```
- Start server: ```npm run start```

### Usage
The server will listen on port 3000:

#### Main Route
http://localhost:3000/

#### Endpoint to resize images
http://localhost:3000/api/images

Expected image properties are:
- _filename_: Available filenames are:
  - encenadaport
  - fjord
  - icelandwaterfall
  - palmtunnel
  - santamonica
- _width_: numerical pixel value > 0
- _height_: numerical pixel value > 0

#### Example 1
http://localhost:3000/api/images
Will show a list of available image filenames

#### Example 2
http://localhost:3000/api/images?filename=encenadaport
Will show the encenadaport image in full width.

#### Example 3
http://localhost:3000/api/images?filename=encenadaport&width=400&height=400
Will show the encenadaport image in 400px width and 400px width  and store the resulting image.

#### Example 4
http://localhost:3000/api/images?filename=encenadaport&width=-400&height=400
Please add a positive value for the width.

#### Example 5
http://localhost:3000/api/images?filename=encenadaport&width=400
Please add a positive value for the height.

### Notes
- Images are served from `images/full`.
- Image thumbs will be stored in `images/thumb`.