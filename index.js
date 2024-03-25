const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    mongoose = require('mongoose'),
    Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

//express and express validation
const app = express();
//validator library takes format : check([field in req.body to validate], [error message if validation fails]).[validation method]();
const { check, validationResult } = require('express-validator');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//cors
const cors = require('cors');
app.use(cors());

//passport middleware
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

//mongoose
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

//morgan middleware
app.use(morgan('common'));

// //user data
// //let users = [
//     {
//         id: 1,
//         name: 'Kim',
//         favoriteMovies: []
//     },
//     {
//         id: 2,
//         name: 'Joe',
//         favoriteMovies: []
//     }
// ];

// //movie data
// let movies = [
//     {
//         Title: 'Coraline',
//         Description: 'Based on Neil Gaiman\'s novella of the same name, the film follows Coraline Jones, a curious girl who discovers a secret door to a parallel world where she encounters sinister versions of her parents. She must confront a terrifying Other Mother to save herself and her real parents.',
//         Genre:{
//             Name:'dark fantasy',
//             Description:'The dark fantasy movie genre typically encompasses films that blend elements of fantasy with darker themes, settings, and atmospheres. In dark fantasy movies, you\'ll often find magical or fantastical elements intertwined with elements of horror, suspense, or the macabre.'
//         },
//         Director: {
//             Name: 'Henry Selick',
//             Bio: 'Henry Selick is an American filmmaker and clay animator.',
//             Birth:'November, 30, 1952',
//             Death: 'N/A'
//         },
//         Release: 'February 6, 2009',
//         Image: 'coraline.png',
//         Featured: false
//     }, 
//     {
//         Title: 'Spirited Away',
//         Description: 'The story follows Chihiro, a young girl who, after her parents are transformed into pigs, finds herself trapped in a mysterious and magical world. To save her family and escape, Chihiro must navigate a bathhouse for spirits, encountering strange creatures and overcoming various challenges.',
//         Genre: {
//             Name:'fantasy',
//             Description:'The fantasy film genre encompasses movies that transport viewers into imaginative worlds filled with magic, mythical creatures, and extraordinary adventures.'
//         },
//         Director: {
//             Name: 'Hayao Miyazaki',
//             Bio: 'Hayao Miyazaki is a Japanese animator, filmmaker, and manga artist.',
//             Birth:'January 5, 1941',
//             Death: 'N/A'
//         },
//         Release: 'August 31, 2002',
//         Image: 'spiritedaway.png',
//         Featured: true
//     }, 
//     {
//         Title: 'Howl\'s Moving Castle',
//         Description: 'The story follows a young woman named Sophie who is transformed into an elderly woman by a witch\'s curse. She encounters a magical, walking castle owned by the enigmatic wizard Howl. As Sophie becomes involved in Howl\'s world, she embarks on a journey filled with adventure, friendship, and self-discovery.',
//         Genre: {
//             Name: 'fantasy',
//             Description:'The fantasy film genre encompasses movies that transport viewers into imaginative worlds filled with magic, mythical creatures, and extraordinary adventures.'
//         },
//         Director: {
//             Name: 'Hayao Miyazaki',
//             Bio: 'Hayao Miyazaki is a Japanese animator, filmmaker, and manga artist.',
//             Birth:'January 5, 1941',
//             Death: 'N/A'
//         },
//         Release: 'June 17, 2005',
//         Image: 'howlsmovingcastle.png',
//         Featured: true
//     },
//     {
//         Title: '10 Things I Hate About You',
//         Description: 'Set in a high school in Seattle, the movie revolves around the story of Kat Stratford, a sharp-witted and independent teenager, and her younger sister Bianca. Bianca can only date if Kat does, so two boys attempt to find a suitor for Kat to clear the way for Bianca\'s romantic life. However, Kat\'s fiery personality makes this task challenging. The film is inspired by William Shakespeare\'s play \'The Taming of the Shrew.\'',
//         Genre: {
//             Name:'romantic comedy',
//             Description:'The romantic comedy film genre combines elements of romance and humor to tell a lighthearted and often entertaining story about romantic relationships.'
//         },
//         Director: {
//             Name: 'Gil Junger',
//             Bio: 'Gil Junger is an American director.',
//             Birth:'November 7, 1954',
//             Death: 'N/A'
//         },
//         Release: 'March 31, 1999',
//         Image: '10thingsihateaboutyou.png',
//         Featured: false
//     }, 
//     {
//         Title: 'Clueless',
//         Description: 'Set in Beverly Hills, the movie follows Cher Horowitz, a fashionable and popular high school student, as she navigates the ups and downs of teenage life and love. Cher takes her new friend Tai under her wing, attempting to give her a makeover while also dealing with her own romantic entanglements. As Cher tries to matchmake Tai with the object of her affection, she discovers more about herself and the complexities of relationships. The film is loosely based on Jane Austen\'s novel, \'Emma\'.',
//         Genre: {
//             Name:'romantic comedy',
//             Description:'The romantic comedy film genre combines elements of romance and humor to tell a lighthearted and often entertaining story about romantic relationships.'
//         },
//         Director: {
//             Name: 'Amy Heckerling',
//             Bio: 'Amy Heckerling is an American writer, producer, and director.',
//             Birth:'May 7, 1954',
//             Death: 'N/A'
//         },
//         Release: 'July 19, 1995',
//         Image: 'clueless.png',
//         Featured: false
//     }, 
//     {
//         Title: 'Tommy Boy',
//         Description: 'The story follows Tommy Callahan, a bumbling but good-hearted man who inherits his father\'s auto parts factory. To save the failing business, Tommy sets out on a cross-country sales trip with his father\'s sardonic former assistant, Richard. Along the way, they encounter various mishaps and comedic situations while learning about responsibility, friendship, and the value of hard work.',
//         Genre: {
//             Name:'comedy',
//             Description:'Comedy is a film genre designed to entertain and amuse audiences through humor and laughter. They often rely on clever dialogue, humorous situations, and exaggerated characters to generate laughter and lighten the mood.'
//         },
//         Director: {
//             Name: 'Peter Segal',
//             Bio: 'Peter Segal is an American film director, producer, screenwriter, and actor.',
//             Birth:'April 20, 1962',
//             Death: 'N/A'
//         },
//         Release: 'March 31, 1995',
//         Image: 'tommyboy.png',
//         Featured: false
//     }, 
//     {
//         Title: 'The Hunger Games',
//         Description: 'Based on Suzanne Collins\' novel of the same name, the film is set in a post-apocalyptic world and follows Katniss Everdeen, as she volunteers to take her sister\'s place in the annual Hunger Games, a televised event where children from twelve districts fight to the death until only one remains. Katniss must navigate the brutal arena, facing challenges, alliances, and betrayals, all while challenging the oppressive regime of the Capitol.',
//         Genre: {
//             Name:'dystopian science fiction',
//             Description:'The dystopian science fiction film genre typically portrays societies in the future or alternate realities that are characterized by oppression, suffering, and often, a loss of individual freedoms. Protagonists in these films often rebel against the oppressive systems in place, leading to narratives filled with tension, action, and often philosophical reflection on the human condition and society\'s trajectory.'
//         },
//         Director: {
//             Name: 'Gary Ross',
//             Bio: 'Gary Ross is an American filmmaker.',
//             Birth:'November 3, 1956',
//             Death: 'N/A'
//         },
//         Release: 'March 23, 2012',
//         Image: 'thehungergames.png',
//         Featured: false
//     }, 
//     {
//         Title: 'Practical Magic',
//         Description: 'Based on Alice Hoffman\'s novel of the same name, the story revolves around the Owens sisters, Sally and Gillian, who come from a long line of witches with a curse that dooms any man who falls in love with them to an untimely death. As they navigate their magical abilities and the complexities of love, they face challenges that test their bonds as sisters and the legacy of their family\'s supernatural history.',
//         Genre: {
//             Name:'fantasy romantic comedy/drama',
//             Description:'The fantasy romantic comedy/drama film genre combines elements of fantasy, romance, comedy, and drama to create a unique storytelling experience. In this genre, fantastical elements such as magic, supernatural beings, or otherworldly settings are often intertwined with romantic relationships and character-driven narratives. Comedy elements provide lightheartedness and humor, while drama adds depth and complexity to the story. The fantasy aspect introduces magical elements, mythical creatures, or extraordinary powers.'
//         },
//         Director: {
//             Name: 'Griffin Dunne',
//             Bio: 'Griffin Dunne is an American actor, film producer, and film director.',
//             Birth:'June 8, 1955',
//             Death: 'N/A'
//         },
//         Release: 'October 16, 1998',
//         Image: 'practicalmagic.png',
//         Featured: false
//     }, 
//     {
//         Title: 'Ratatouille',
//         Description: 'Set in Paris, the movie tells the story of Remy, a young rat with a refined palate and a passion for cooking. Against the wishes of his family, Remy aspires to become a chef and follows his dreams after finding himself in the kitchen of Gusteau\'s, a famous restaurant. With the help of Linguini, a garbage boy turned cook, Remy orchestrates culinary masterpieces while hiding his identity as a rat.',
//         Genre: {
//             Name:'animated family comedy',
//             Description:'The animated family comedy film genre is characterized by light-hearted, humorous storytelling aimed at audiences of all ages. These films typically feature animated characters and settings, often created using traditional hand-drawn animation or computer-generated imagery (CGI).'
//         },
//         Director: {
//             Name: 'Brad Bird',
//             Bio: 'Brad Bird is an American director, producer, writer, animator, and voice actor.',
//             Birth:'September 24, 1957',
//             Death: 'N/A'
//         },
//         Release: 'June 29. 2007',
//         Image: 'ratatouille.png',
//         Featured: false
//     }, 
//     {
//         Title: 'Willy Wonka & the Chocolate Factory',
//         Description: 'Based on Roald Dahl\'s novel, \'Charlie and the Chocolate Factory\', the story follows a young boy named Charlie Bucket who wins a golden ticket to tour the mysterious chocolate factory of the eccentric candy maker, Willy Wonka. Led by the charismatic chocolatier, the tour takes Charlie and other lucky children on a whimsical journey through fantastical rooms filled with chocolate rivers, vibrant edible landscapes, and absurd magical inventions. As the tour progresses, each child faces moral challenges that reveal their true character.',
//         Genre: {
//             Name:'musical fantasy',
//             Description: 'The musical fantasy film genre combines elements of fantasy storytelling with musical performances and song numbers. Music plays a central role, with characters breaking into song and dance to convey emotions, advance the plot, or enhance the atmosphere of the film.'
//         },
//         Director: {
//             Name: 'Mel Stuart',
//             Bio: 'Mel Stuart was an American film director and producer.',
//             Birth:'September 2, 1928',
//             Death: 'August 9, 2012'
//         },
//         Release: 'June 30, 1971',
//         Image: 'willywonkaandthechocolatefactory.png',
//         Featured: false
//     }, 
//     {
//         Title: 'Twilight',
//         Description: 'Based on the novel of the same name by Stephenie Meyer, the story revolves around Bella Swan, a teenage girl who moves to the small town of Forks, Washington, and becomes enamored with Edward Cullen, a mysterious and captivating vampire. As Bella and Edward\'s romance blossoms, they must navigate the complexities of their forbidden love amidst the dangers posed by other vampires and werewolves in their supernatural world.',
//         Genre: {
//             Name:'romantic fantasy',
//             Description:'In the romantic fantasy film genre, romantic relationships are intertwined with fantastical elements such as magic, mythical creatures, or otherworldly settings. Romance lies at the heart of the genre, focusing on the emotional connections and relationships between characters. Fantasy elements introduce elements of wonder, enchantment, and adventure, creating unique and often magical settings for the characters to inhabit.'
//         },
//         Director: {
//             Name: 'Catherine Hardwicke',
//             Bio: 'Catherine Hardwicke is an American film director, production designer, and screenwriter.',
//             Birth:'October 21, 1955',
//             Death: 'N/A'
//         },
//         Release: 'November 21, 2008',
//         Image: 'twilight.png',
//         Featured: false
//     }
// ];

//CREATE new user
app.post('/users', [
    check('firstName', 'First Name is required').isLength({min: 1}),
    check('firstName', 'First Name contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('LastName', 'Last Name is required').isLength({min: 1}),
    check('LastName', 'Last Name contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email does not appear to be valid').isEmail()
  ], async (req, res) => {

  // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users
            .create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                Birthday: req.body.Birthday,
                email: req.body.email,
                Username: req.body.Username,
                password: req.body.password,
                favoriteMovies: req.body.favoriteMovies             
            })
            .then((user) => { res.status(201).json(user) })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

//UPDATE user information
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    //check user
    if(req.user.Username !== req.params.Username){
        return res.status(400).send('Permission denied');
    }
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $set:
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                Birthday: req.body.Birthday,
                email: req.body.email,
                Username: req.body.Username,
                password: req.body.password,
                favoriteMovies: req.body.favoriteMovies
            }
    },
        { new: true }) 
        .then((updatedUser) => { res.json(updatedUser); })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        })
});

//UPDATE add new movie to user's list of favorite movies
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
    //check user
    if(req.user.Username !== req.params.Username){
        return res.status(400).send('Permission denied');
    }
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { favoriteMovies: req.params.MovieID }
    },
        { new: true })
        .then((updatedUser) => { res.json(updatedUser); })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//DELETE movie from user's list of favorite movies 
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
    //check user
    if(req.user.Username !== req.params.Username){
        return res.status(400).send('Permission denied');
    }
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $pull: { favoriteMovies: req.params.MovieID }
    },
        { new: true })
        .then((updatedUser) => { res.json(updatedUser); })
        .catch((err) => {
            res.status(500).send('Error: ' + err);
        })
});

//DELETE user from registered users
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    //check user
    if(req.user.Username !== req.params.Username){
        return res.status(400).send('Permission denied');
    }
    await Users.findOneAndDelete({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found');
        } else {
          res.status(200).send(req.params.Username + ' has been deleted');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

//READ return list of all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

//READ return data about a single movie by title
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.findOne({ Title: req.params.Title })
        .then((Movie) => {
            if(!Movie) {
                res.status(400).send(req.params.Title + ' does not exist');
            } else {
                res.json(Movie);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//READ return data about genre
app.get('/movies/genres/:genreName', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.find({ "Genre.Name" : req.params.genreName })
        .then((genre) => { res.json(genre); })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//READ return data about a director by name
app.get('/movies/directors/:directorName', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.findOne({ "Director.Name" : req.params.directorName })
        .then((director) => { res.json(director); })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        })
});

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