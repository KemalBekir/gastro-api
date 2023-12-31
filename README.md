# Backend API Documentation

## Comments Endpoints

### GET /comments

- Method: GET
- Path: /comments
- Response:
  - 200 OK: Array of comments
  - 500 Internal Server Error: An error occurred while fetching comments

### GET /comments/:id

- Method: GET
- Path: /comments/:id
- Response:
  - 200 OK: Comment data
  - 404 Not Found: Comment not found
  - 500 Internal Server Error: An error occurred while fetching comment

### PUT /comments/:id

- Method: PUT
- Path: /comments/:id
- Authentication: Requires user authentication token
- Request Parameters:
  - `id` (URL parameter): ID of the comment to be updated
- Response:
  - 200 OK: Updated comment data
  - 401 Unauthorized: Missing or invalid authentication token
  - 403 Forbidden: User is not the owner of the comment
  - 404 Not Found: Comment not found
  - 500 Internal Server Error: An error occurred while updating comment

## Posts Endpoints

### GET /posts

- Method: GET
- Path: /posts
- Response:
  - 200 OK: Array of posts
  - 500 Internal Server Error: An error occurred while fetching posts

### GET /posts/search

- Method: GET
- Path: /posts/search
- Query Parameters:
  - `text`: Search text
- Response:
  - 200 OK: Array of posts matching the search query
  - 500 Internal Server Error: An error occurred while searching posts

### POST /posts

- Method: POST
- Path: /posts
- Authentication: Requires user authentication token
- Request Body:
  - `title`: Post title
  - `heroImage`: Hero image URL
  - `images`: Array of image URLs
  - `description`: Post description
- Response:
  - 201 Created: Created post data
  - 401 Unauthorized: Missing or invalid authentication token
  - 500 Internal Server Error: An error occurred while creating post

### GET /posts/:id

- Method: GET
- Path: /posts/:id
- Response:
  - 200 OK: Post data
  - 404 Not Found: Post not found
  - 500 Internal Server Error: An error occurred while fetching post

### PUT /posts/:id

- Method: PUT
- Path: /posts/:id
- Authentication: Requires user authentication token
- Request Parameters:
  - `id` (URL parameter): ID of the post to be updated
- Response:
  - 200 OK: Updated post data
  - 401 Unauthorized: Missing or invalid authentication token
  - 403 Forbidden: User is not the owner of the post
  - 404 Not Found: Post not found
  - 500 Internal Server Error: An error occurred while updating post

### POST /posts/:id/comments

- Method: POST
- Path: /posts/:id/comments
- Authentication: Requires user authentication token
- Request Body:
  - `postId`: ID of the post to add the comment to
  - `text`: Comment text
  - `author`: Comment author's ID
- Response:
  - 200 OK: Updated post data with added comment
  - 401 Unauthorized: Missing or invalid authentication token
  - 500 Internal Server Error: An error occurred while adding comment

### POST /posts/:id/like

- Method: POST
- Path: /posts/:id/like
- Authentication: Requires user authentication token
- Request Parameters:
  - `id` (URL parameter): ID of the post to be liked/unliked
- Response:
  - 200 OK: Post liked/unliked successfully
  - 401 Unauthorized: Missing or invalid authentication token
  - 500 Internal Server Error: An error occurred while liking/unliking post

### DELETE /posts/:id

- Method: DELETE
- Path: /posts/:id
- Authentication: Requires user authentication token
- Request Parameters:
  - `id` (URL parameter): ID of the post to be deleted
- Response:
  - 204 No Content: Post deleted successfully
  - 401 Unauthorized: Missing or invalid authentication token
  - 403 Forbidden: User is not the owner of the post
  - 404 Not Found: Post not found
  - 500 Internal Server Error: An error occurred while deleting post

## Users Endpoints

### POST /users/register

- Method: POST
- Path: /users/register
- Request Body:
  - `username`: User's username
  - `email`: User's email
  - `password`: User's password
- Response:
  - 201 Created: User registration successful
  - 400 Bad Request: Missing email or password
  - 500 Internal Server Error: An error occurred while registering user

### GET /users/profile

- Method: GET
- Path: /users/profile
- Authentication: Requires user authentication token
- Response:
  - 200 OK: User profile data
  - 401 Unauthorized: Missing or invalid authentication token
  - 500 Internal Server Error: An error occurred while fetching user profile

### POST /users/login

- Method: POST
- Path: /users/login
- Request Body:
  - `email`: User's email
  - `password`: User's password
- Response:
  - 200 OK: User login successful
  - 400 Bad Request: Missing email or password
  - 500 Internal Server Error: An error occurred while logging in user

### GET /users/logout

- Method: GET
- Path: /users/logout
- Response:
  - 204 No Content: User logged out successfully

