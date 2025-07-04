import express from 'express';
import sequelize from './HMDB.js';
import Patient from './models/patient.js';
import Record from './models/Record.js';

const app = express();
app.use(express.json());
app.set('view engine','ejs');
app.use(express.urlencoded({extended : true}));

Patient.hasOne(Record, { foreignKey: 'pid', onDelete: 'CASCADE' });
Record.belongsTo(Patient, { foreignKey: 'pid', onDelete: 'CASCADE' });

sequelize.sync({ force: false }).then(() => {
    console.log("HOSTPITAL DB CONNECTED !");
})

// all pateint 
app.get('/', async (req,res)=>{
    try{
        const pateints = await Patient.findAll({include : Record});
    if(!pateints  || pateints.length === 0){
        res.send("NO Patient")
    }
    res.render('home',{pateints})
    }catch(err){
        res.status(500).send("Server Error!");
    }
})
// add patient
app.post('/addPatient', async (req, res) => {
    console.log("Detail are ", req.body)
    const { name, age, gender, addmitDate, record } = req.body;
    try {
        const patient = await Patient.create(
            { name, age, gender, addmitDate, Record: record },
            { include: [Record] }
        );
        res.json(patient);

    } catch (err) {
        res.status(500).send("Server ERROR!");
    }
})

// get pateint
app.get('/getPateint/:id', async (req, res) => {
    try {
        const pateint = await Patient.findByPk(req.params.id, { include: Record });
        if (!pateint) {
            res.status(404).send("User Not Found!");
        }
        res.json(pateint);
    } catch (err) {
        res.status(500).send("Server ERROR!")
    }
})

// update patient
app.put('/update/:id', async (req, res) => {
    const { name, age, gender, addmitDate, record } = req.body;

    try {
        const patient = await Patient.findByPk(req.params.id, { include: Record });

        if (!patient) {
            return res.status(404).send("Patient not Found!");
        }

        // Update patient fields
        if (name) patient.name = name;
        if (age) patient.age = age;
        if (gender) patient.gender = gender;
        if (addmitDate) patient.addmitDate = addmitDate;
        await patient.save();

        // Update record fields
        if (record && patient.Record) {
            if (record.bloodGroup) patient.Record.bloodGroup = record.bloodGroup;
            if (record.allergies) patient.Record.allergies = record.allergies;
            if (record.diagnosis) patient.Record.diagnosis = record.diagnosis;
            if (record.prescription) patient.Record.prescription = record.prescription;

            await patient.Record.save();
        }

        res.status(200).json({ message: "Patient updated successfully", patient });

    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).send("SERVER ERROR !");
    }
});

// delete Patient
app.delete('/delete/:id', async (req,res)=>{
    try{
        const p = await Patient.findByPk(req.params.id,{include: Record});
        if(!p){
            res.status(404).send("Patient Not Found");
        }
        await p.destroy();
        res.send("Patient deleted");
    }catch(err){
        res.send("Server Error!");
    }
})

app.listen(3000, () => {
    console.log("SERVER HAS STARTED! http://localhost:3000");
})