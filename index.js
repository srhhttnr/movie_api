const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const app = express();

//morgan middleware
app.use(morgan('common'));

//body parser middleware
app.use(bodyParser.json());

//user data
let users = [
    {
        id: 1,
        name: 'Kim',
        favoriteMovies: []
    },
    {
        id: 2,
        name: 'Joe',
        favoriteMovies: []
    }
];

//movie data
let movies = [
    {
        Title: 'Coraline',
        Description: '\'Coraline\' is a 2009 dark fantasy animated film directed by Henry Selick, based on Neil Gaiman\'s novella. It follows Coraline Jones, a curious girl who discovers a secret door to a parallel world where she encounters sinister versions of her parents. She must confront a terrifying Other Mother to save herself and her real parents.',
        Genre:{
            Name:'dark fantasy',
            Description:'The dark fantasy movie genre typically encompasses films that blend elements of fantasy with darker themes, settings, and atmospheres. In dark fantasy movies, you\'ll often find magical or fantastical elements intertwined with elements of horror, suspense, or the macabre. These films often feature morally ambiguous characters, complex worlds, and narratives that explore themes such as good versus evil, the supernatural, or the human psyche.'
        },
        Director: {
            Name: 'Henry Selick',
            Birth:'November, 30, 1952'
        }
    }, 
    {
        Title: 'Spirited Away',
        Description: '\'Spirited Away\' is a renowned Japanese animated film directed by Hayao Miyazaki. It follows the story of Chihiro, a young girl who, after her parents are transformed into pigs, finds herself trapped in a mysterious and magical world. To save her family and escape, Chihiro must navigate a bathhouse for spirits, encountering strange creatures and overcoming various challenges. The film is celebrated for its rich animation, imaginative storytelling, and themes of courage, friendship, and self-discovery.',
        Genre: {
            Name:'fantasy',
            Description:'The fantasy film genre encompasses movies that transport viewers into imaginative worlds filled with magic, mythical creatures, and extraordinary adventures. They often explore themes of heroism, destiny, good versus evil, and the power of imagination.'
        },
        Director: {
            Name: 'Hayao Miyazaki',
            Birth:'January 5, 1941'
        }
    }, 
    {
        Title: '10 Things I Hate About You',
        Description: '\'10 Things I Hate About You\' is a romantic comedy film released in 1999, directed by Gil Junger. Set in a high school in Seattle, the movie revolves around the story of Kat Stratford, a sharp-witted and independent teenager, and her younger sister Bianca. Bianca can only date if Kat does, so two boys attempt to find a suitor for Kat to clear the way for Bianca\'s romantic life. However, Kat\'s fiery personality makes this task challenging. The film explores themes of love, friendship, and identity, blending humor with heartfelt moments, and is inspired by William Shakespeare\'s play \'The Taming of the Shrew.\'',
        Genre: {
            Name:'romantic comedy',
            Description:'The romantic comedy film genre combines elements of romance and humor to tell a lighthearted and often entertaining story about romantic relationships. These movies typically feature protagonists who navigate the ups and downs of falling in love, overcoming obstacles, and ultimately finding happiness together. Romantic comedies often employ witty dialogue, situational humor, and charming characters to engage audiences and evoke laughter. While they explore themes of love, attraction, and compatibility, romantic comedies typically prioritize humor and a feel-good atmosphere, offering audiences an enjoyable and heartwarming viewing experience.'
        },
        Director: {
            Name: 'Gil Junger',
            Birth:'November 7, 1954'
        }
    }, 
    {
        Title: 'Clueless',
        Description: '\'Clueless\' is a 1995 coming-of-age romantic comedy film directed by Amy Heckerling. Set in Beverly Hills, the movie follows Cher Horowitz, a fashionable and popular high school student, as she navigates the ups and downs of teenage life and love. Cher takes her new friend Tai under her wing, attempting to give her a makeover while also dealing with her own romantic entanglements. As Cher tries to matchmake Tai with the object of her affection, she discovers more about herself and the complexities of relationships. \'Clueless\' is celebrated for its clever dialogue, iconic fashion, and humorous take on teenage culture, and it remains a beloved classic of the 1990s.',
        Genre: {
            Name:'romantic comedy',
            Description:'The romantic comedy film genre combines elements of romance and humor to tell a lighthearted and often entertaining story about romantic relationships. These movies typically feature protagonists who navigate the ups and downs of falling in love, overcoming obstacles, and ultimately finding happiness together. Romantic comedies often employ witty dialogue, situational humor, and charming characters to engage audiences and evoke laughter. While they explore themes of love, attraction, and compatibility, romantic comedies typically prioritize humor and a feel-good atmosphere, offering audiences an enjoyable and heartwarming viewing experience.'
        },
        Director: {
            Name: 'Amy Heckerling',
            Birth:'May 7, 194'
        }
    }, 
    {
        Title: 'Tommy Boy',
        Description: '"Tommy Boy" is a 1995 American comedy film directed by Peter Segal. The story follows Tommy Callahan, played by Chris Farley, a bumbling but good-hearted man who inherits his father\'s auto parts factory. To save the failing business, Tommy sets out on a cross-country sales trip with his father\'s sardonic former assistant, Richard, played by David Spade. Along the way, they encounter various mishaps and comedic situations while learning about responsibility, friendship, and the value of hard work. \'Tommy Boy\' is known for its slapstick humor, memorable quotes, and the comedic chemistry between Farley and Spade.',
        Genre: {
            Name:'comedy',
            Description:'Comedy films are a genre of movies designed to entertain and amuse audiences through humor and laughter. They often rely on clever dialogue, humorous situations, and exaggerated characters to generate laughter and lighten the mood. The comedy genre often explores a wide range of topics and themes, from everyday situations and relationships to social and political commentary. These films may poke fun at societal norms, cultural stereotypes, and human quirks, providing audiences with a fresh perspective and an opportunity to laugh at the absurdities of life.'
        },
        Director: {
            Name: 'Peter Segal',
            Birth:'1962'
        }
    }, 
    {
        Title: 'The Hunger Games',
        Description: '\'The Hunger Games\' is a 2012 dystopian science fiction film directed by Gary Ross, based on Suzanne Collins\' novel of the same name. Set in a post-apocalyptic world, the story follows Katniss Everdeen, portrayed by Jennifer Lawrence, as she volunteers to take her sister\'s place in the annual Hunger Games, a televised event where children from twelve districts fight to the death until only one remains. Katniss must navigate the brutal arena, facing challenges, alliances, and betrayals, all while challenging the oppressive regime of the Capitol. The film explores themes of survival, sacrifice, and the consequences of power, and it became a commercial and critical success, launching a popular film franchise.',
        Genre: {
            Name:'dystopian science fiction',
            Description:'The dystopian science fiction film genre typically portrays societies that are characterized by oppression, suffering, and often, a loss of individual freedoms. These films are set in the future or in alternative realities where governments or other controlling forces have established strict rules or totalitarian regimes. Dystopian science fiction often explores themes of social injustice, surveillance, environmental degradation, and the consequences of unchecked technological advancement. Protagonists in these films often rebel against the oppressive systems in place, leading to narratives filled with tension, action, and often philosophical reflection on the human condition and society\'s trajectory.'
        },
        Director: {
            Name: 'Gary Ross',
            Birth:'November 3, 1956'
        }
    }, 
    {
        Title: 'Practical Magic',
        Description: '\'Practical Magic\' is a 1998 fantasy romantic comedy-drama film directed by Griffin Dunne, based on Alice Hoffman\'s novel of the same name. The story revolves around the Owens sisters, Sally and Gillian, who come from a long line of witches with a curse that dooms any man who falls in love with them to an untimely death. As they navigate their magical abilities and the complexities of love, they face challenges that test their bonds as sisters and the legacy of their family\'s supernatural history. The film combines elements of romance, humor, and magic, exploring themes of sisterhood, love, and acceptance amidst the backdrop of a small New England town.',
        Genre: {
            Name:'fantasy romantic comedy/drama',
            Description:'The \'famtasy romantic comedy/drama\' film genre combines elements of fantasy, romance, comedy, and drama to create a unique storytelling experience. In this genre, fantastical elements such as magic, supernatural beings, or otherworldly settings are often intertwined with romantic relationships and character-driven narratives. Romance is a central theme, focusing on the development of relationships, love, and emotional connections between characters. Comedy elements provide lightheartedness and humor, often through witty dialogue, situational comedy, or quirky characters. Meanwhile, drama adds depth and complexity to the story, exploring themes of personal growth, family dynamics, and overcoming obstacles. The fantasy aspect introduces magical elements, mythical creatures, or extraordinary powers, which may serve as metaphors for real-life challenges or add a sense of wonder and escapism to the narrative. Overall, films in this genre offer a blend of enchanting storytelling, heartfelt emotions, comedic moments, and imaginative settings, appealing to audiences seeking a mix of romance, humor, and fantasy in their cinematic experience.'
        },
        Director: {
            Name: 'Griffin Dunne',
            Birth:'June 8, 1955'
        }
    }, 
    {
        Title: 'Ratatouille',
        Description: '\'Ratatouille\' is a 2007 animated film produced by Pixar Animation Studios and directed by Brad Bird. Set in Paris, the movie tells the story of Remy, a young rat with a refined palate and a passion for cooking. Against the wishes of his family, Remy aspires to become a chef and follows his dreams after finding himself in the kitchen of Gusteau\'s, a famous restaurant. With the help of Linguini, a garbage boy turned cook, Remy orchestrates culinary masterpieces while hiding his identity as a rat. The film explores themes of ambition, friendship, and the pursuit of one\'s passions, all set against the backdrop of the vibrant culinary world of Paris. With its heartwarming story, charming characters, and stunning animation, \'Ratatouille\' has become a beloved classic for audiences of all ages.',
        Genre: {
            Name:'animated family comedy',
            Description:'The animated family comedy film genre is characterized by light-hearted, humorous storytelling aimed at audiences of all ages. These films typically feature animated characters and settings, often created using traditional hand-drawn animation or computer-generated imagery (CGI). At the core of animated family comedies are themes of friendship, love, adventure, and self-discovery, presented in a manner that is accessible and entertaining for both children and adults. The humor in these films ranges from slapstick comedy and witty dialogue to visual gags and clever wordplay, appealing to a broad audience spectrum. While the primary goal of animated family comedies is to entertain, many films in this genre also convey important life lessons and moral values, making them not only enjoyable but also educational experiences for younger viewers.'
        },
        Director: {
            Name: 'Brad Bird',
            Birth:'September 24, 1957'
        }
    }, 
    {
        Title: 'Willy Wonka & the Chocolate Factory',
        Description: '\'Willy Wonka & the Chocolate Factory\' is a beloved 1971 musical fantasy film directed by Mel Stuart, based on Roald Dahl\'s novel \'Charlie and the Chocolate Factory.\' The story follows a young boy named Charlie Bucket who wins a golden ticket to tour the mysterious chocolate factory of the eccentric candy maker, Willy Wonka. Led by the charismatic Gene Wilder as Willy Wonka, the tour takes Charlie and other lucky children on a whimsical journey through fantastical rooms filled with chocolate rivers, edible landscapes, and magical inventions. As the tour progresses, each child faces moral challenges that reveal their true character. The film is renowned for its colorful visuals, memorable musical numbers, and Gene Wilder\'s iconic performance, capturing the imagination of audiences for generations.',
        Genre: {
            Name:'musical fantasy',
            Description:'The musical fantasy film genre combines elements of fantasy storytelling with musical performances and song numbers. These films often feature imaginative worlds, magical creatures, or fantastical settings that serve as backdrops for the story. Music plays a central role, with characters breaking into song and dance to convey emotions, advance the plot, or enhance the atmosphere of the film. The songs in musical fantasy films are typically catchy and memorable, adding depth and emotion to the narrative. Fantasy elements can include mythical creatures, supernatural powers, or enchanted realms, allowing for creative storytelling and visual spectacle. Themes of heroism, adventure, love, and self-discovery are often explored within the context of these fantastical worlds. Overall, musical fantasy films offer audiences a unique blend of music, magic, and storytelling, creating immersive and enchanting cinematic experiences.'
        },
        Director: {
            Name: 'Mel Stuart',
            Birth:'September 2, 1928'
        }
    }, 
    {
        Title: 'Twilight',
        Description: '\'Twilight\' is a 2008 romantic fantasy film directed by Catherine Hardwicke, based on the novel of the same name by Stephenie Meyer. The story revolves around Bella Swan, a teenage girl who moves to the small town of Forks, Washington, and becomes enamored with Edward Cullen, a mysterious and captivating vampire. As Bella and Edward\'s romance blossoms, they must navigate the complexities of their forbidden love amidst the dangers posed by other vampires and werewolves in their supernatural world. \'Twilight\' explores themes of love, sacrifice, and the struggle between human desires and supernatural forces, captivating audiences with its blend of romance and fantasy elements.',
        Genre: {
            Name:'romantic fantasy',
            Description:'The romantic fantasy film genre blends elements of romance and fantasy to create captivating and imaginative stories. In these films, romantic relationships are often intertwined with fantastical elements such as magic, mythical creatures, or otherworldly settings. Romance lies at the heart of the genre, focusing on the emotional connections and relationships between characters. These relationships may involve individuals from different worlds, species, or time periods, adding complexity and intrigue to the story. Fantasy elements introduce elements of wonder, enchantment, and adventure, creating unique and often magical settings for the characters to inhabit. These elements can range from spells and potions to mythical creatures like vampires, werewolves, or fairies. Themes explored in romantic fantasy films often include love overcoming obstacles, self-discovery, and the eternal struggle between light and dark forces. The genre offers audiences an escape into fantastical realms while also exploring universal themes of human emotion and connection.'
        },
        Director: {
            Name: 'Catherine Hardwicke',
            Birth:'October 21, 1955'
        }
    }
];

//CREATE new user
app.post('/users', (req,res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('user needs name');
    }
})

//UPDATE user information
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no user found');
    }
})

//UPDATE add new movie to user's list of favorite movies 
app.put('/users/:id/:movieTitle', (req, res) => {
    const { id , movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send('no user found');
    }
})

//DELETE movie from user's list of favorite movies 
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id , movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send('no user found');
    }
})

//DELETE user from registered users
app.delete('/users/:id/', (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter(user => user.id != id);
        res.status(200).send(`user ${id} has been deleted`);
    } else {
        res.status(400).send('no user found');
    }
})

//READ return list of all movies
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

//READ return data about a single movie by title
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.Title == title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie');
    }
})

//READ return data about genre
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name == genreName ).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre');
    }
})

//READ return data about a director by name
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.Director.Name == directorName ).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director');
    }
})

//welcome GET route
app.get('/', (req, res) => {
    res.send('Welcome to myFlix API!');
});

//express.static
app.use('/documentation', express.static('public'));

//error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oops, something is broken.');
});

app.listen(8080, () => {
    console.log('Your app is listening on Port 8080.');
});