// config to use express and handlebars
const express = require("express");
const expressHbs = require('express-handlebars');
const { createPagination } = require('express-handlebars-paginate');
const app = express();
const port = process.env.PORT || 3000;
 
// set static folder is html
app.use(express.static(__dirname + "/html"));

// set view engine
app.engine('hbs', expressHbs.engine({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'layout',
    runtimeOptions: {allowProtoPropertiesByDefault: true},
    helpers: {
        createPagination,
        formatDate: (date) => {
            return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        },
    },
}));
app.set('view engine', 'hbs');

// routes
app.get('/', (req, res) => res.redirect("/blogs"));
app.use('/blogs', require('./routes/blogRoute'));

app.get('/createTables', (req, res) => {
    let models = require('./models')
    models.sequelize.sync().then(() => {
        res.send("table created!");
    })
});

app.get("/error", (req, res) => {
    throw new Error("error");
})
app.use((req, res) => {
    res.send("Request not found!");
})
app.use((error, req, res, next) => {
    console.error(error);
    res.send("Sever error!");
})

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})