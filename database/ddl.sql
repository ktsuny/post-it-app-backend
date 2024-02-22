SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Posts;
CREATE TABLE Posts (
    postID int(11) AUTO_INCREMENT,
    authorID int(11),
    title varchar(70) NOT NULL,
    body varchar(1000) NOT NULL,
    createdAt datetime,
    updatedAt datetime,
    likes int,
    commentsID int,
    PRIMARY KEY (postID),
    FOREIGN KEY (authorID) REFERENCES Authors(authorID)
);

DROP TABLE IF EXISTS Comments;
CREATE TABLE Comments (
    commentID int AUTO_INCREMENT,
    authorID int,
    postID int, 
    body varchar(1000),
    createdAt datetime,
    updatedAt datetime,
    PRIMARY KEY (commentID),
    FOREIGN KEY (authorID) REFERENCES Authors(authorID),
    FOREIGN KEY (postID) REFERENCES Posts(postID)
);

DROP TABLE IF EXISTS Authors;
CREATE TABLE Authors (
    authorID int AUTO_INCREMENT,
    name varchar(50),
    PRIMARY KEY (authorID)
);

DROP TABLE IF EXISTS Likes;
CREATE TABLE Likes (
    likeID int AUTO_INCREMENT,
    PRIMARY KEY (likeID)
);

INSERT INTO Authors (name) VALUES ('Jane Doe');
INSERT INTO Authors (name) VALUES ('John Smith');

INSERT INTO Posts (authorID, title, body, createdAt, updatedAt, likes, commentsID) 
VALUES (1, 'The Wonders of Nature', 'This is a post about the beauty of the natural world.', NOW(), NOW(), 10, null);

INSERT INTO Posts (authorID, title, body, createdAt, updatedAt, likes, commentsID) 
VALUES (2, 'Technology in the 21st Century', 'Discussing the impact of technology on modern life.', NOW(), NOW(), 5, null);

INSERT INTO Comments (authorID, postID, body, createdAt, updatedAt) 
VALUES (1, 1, 'Great post! Thanks for sharing.', NOW(), NOW());

INSERT INTO Comments (authorID, postID, body, createdAt, updatedAt) 
VALUES (2, 1, 'Very informative. Looking forward to more.', NOW(), NOW());
