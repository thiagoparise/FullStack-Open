const mongoose = require('mongoose');


const argLength = process.argv.length;

if (argLength < 3) {
    console.log("Wrong number of arguments");
    process.exit(1);
} else {
    const password = process.argv[2];

    const url = `mongodb+srv://thiagoparise1:${password}@cluster0.3lh2q6s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

    mongoose.set('strictQuery', false);
    mongoose.connect(url);

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    });
    
    const Person = mongoose.model('Person', personSchema);

    if (argLength === 3) {
        console.log('phonebook:');
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(person.name + ' ' + person.number);
            })
            mongoose.connection.close();
        })
    } else if (argLength === 5) {
        
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4],
        })
        
        person.save().then(result => {
            console.log(`added ${result.name} number ${result.number} to phonebook`);
            mongoose.connection.close();
        })
    }
}

