## Task lists

- [x] Create static website with vanilla javavscript.
- [x] Hash router in vanilla javascript.

## How to

* How to start a container with the project files as a volume

  ```
  docker run -p 8080:80 ${PWD}:/usr/share/nginx/html nginx:stable-alpine
  ```

* How to build and run the image

  ```
  docker build -t my-nginx .
  docker run -p 8080:80 my-nginx
  ```