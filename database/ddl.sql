SET FOREIGN_KEY_CHECKS=0;
CREATE DATABASE post_it_app
USE post_it_app

DROP TABLE IF EXISTS Posts;
CREATE TABLE Posts (
    postID int(11) AUTO_INCREMENT,
    user varchar(50),
    title varchar(70) NOT NULL,
    body varchar(1000) NOT NULL,
    createdAt datetime,
    updatedAt datetime,
    likes int, 
    comments int,
    PRIMARY KEY (postID)
);
    -- FOREIGN KEY (authorID) REFERENCES Authors(authorID)
    -- FOREIGN KEY (commentsID) REFERENCES Comments(CommentsID)
    -- commentsID int,


INSERT INTO Posts (user, title, body, createdAt, updatedAt, likes, comments) 
VALUES ('Jone Doe', 'The Wonders of Nature', 'This is a post about the beauty of the natural world.', NOW(), NOW(), 10, 2);

INSERT INTO Posts (user, title, body, createdAt, updatedAt, likes, comments) 
VALUES ('Sunny S', 'Technology in the 21st Century', 'Discussing the impact of technology on modern life.', NOW(), NOW(), 5, 1);

-- DROP TABLE IF EXISTS Comments;
-- CREATE TABLE Comments (
--     commentID int AUTO_INCREMENT,
--     authorID int,
--     postID int, 
--     body varchar(1000),
--     createdAt datetime,
--     updatedAt datetime,
--     PRIMARY KEY (commentID),
--     FOREIGN KEY (authorID) REFERENCES Authors(authorID),
--     FOREIGN KEY (postID) REFERENCES Posts(postID) ON DELETE CASCADE 
-- );

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    userID int AUTO_INCREMENT,
    username varchar(50),
    email varchar(50),
    password varchar(255),
    PRIMARY KEY (userID) 
);

-- DROP TABLE IF EXISTS Authors;
-- CREATE TABLE Authors (
--     authorID int AUTO_INCREMENT,
--     name varchar(50),
--     PRIMARY KEY (authorID)
-- );

-- DROP TABLE IF EXISTS Likes;
-- CREATE TABLE Likes (
--     likeID int AUTO_INCREMENT,
--     PRIMARY KEY (likeID)
-- );

-- INSERT INTO Authors (name) VALUES ('Jane Doe');
-- INSERT INTO Authors (name) VALUES ('John Smith');

-- INSERT INTO Posts (authorID, title, body, createdAt, updatedAt, likes, commentsID) 
-- VALUES (1, 'The Wonders of Nature', 'This is a post about the beauty of the natural world.', NOW(), NOW(), 10, null);

-- INSERT INTO Posts (authorID, title, body, createdAt, updatedAt, likes, commentsID) 
-- VALUES (2, 'Technology in the 21st Century', 'Discussing the impact of technology on modern life.', NOW(), NOW(), 5, null);

-- INSERT INTO Comments (authorID, postID, body, createdAt, updatedAt) 
-- VALUES (1, 1, 'Great post! Thanks for sharing.', NOW(), NOW());

-- INSERT INTO Comments (authorID, postID, body, createdAt, updatedAt) 
-- VALUES (2, 1, 'Very informative. Looking forward to more.', NOW(), NOW());
SET foreign_key_checks = 1;