var express = require('express');
var router = express.Router();

router.get('/portfolio', function(req, res, next) {
    const port = {
        name: 'Teerawut Sungkagaro',
        contact: {
            email: 'teerawut.s@gmail.com',
            linkedin: 'https://www.linkedin.com/in/trwfs00/'
        }
    }
  res.render('portfolio', { 
      title: port.name+"'s Portfolio",
      port: port
  });
});

router.get('/resume', function(req, res, next) {
    const port = {
        name: 'Teerawut Sungkagaro',
        contact: {
            email: 'teerawut.s@gmail.com',
            linkedin: 'https://www.linkedin.com/in/trwfs00/',
            phone: '+66 650000000'
        }
    }
  res.render('resume', { 
      title: port.name+"'s Portfolio",
      port: port
  });
});

const Students = require('../models/student'); 

router.get('/', async function(req, res, next) {
    try {
        // Retrieve all students from the database
        const students = await Students.find();

        // Render the "students.ejs" view and pass the student data
        res.render('student', { 
            title: 'Student List',
            students: students
        });
    } catch (error) {
        console.error('Error retrieving student list:', error);
        res.status(500).json({ error: 'Error retrieving student list' });
    }
});

router.get('/update/:id', async (req, res) => {
    try {
        // Find the student by ID and retrieve their information
        const student = await Students.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Render the update form with the student's data
        res.render('update', { 
            title: "[Update] "+student.name,
            student: student
        });
    } catch (error) {
        console.error('Error fetching student for update:', error);
        res.status(500).json({ error: 'Error fetching student for update' });
    }
});

// router.post('/update', async (req, res) => {
//     try {
//         const studentId = req.body.id; // Get the student ID from the request body

//         // Find the student by ID
//         const student = await Students.findById(studentId);

//         if (!student) {
//             return res.status(404).json({ error: 'Student not found' });
//         }

//         // Return the student data
//         res.render('update', { 
//             title: '[Update] '+student.name,
//             student: student
//         });
//     } catch (error) {
//         console.error('Error finding student by ID:', error);
//         res.status(500).json({ error: 'Error finding student by ID' });
//     }
// });

router.post('/insert/default', async (req, res) => {
    try {
        const newStu = new Students({
            stdId: '643020380-2',
            name: 'Teerawut Sungkagaro',
            yos: '3',
            dob: '19/03/2003',
            email: 'teerawut.s@kkumail.com',
        });
        const savedStu = await newStu.save();

        // Respond with the saved student
        res.status(200).json(savedStu);
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Error creating student' });
    }
});

router.post('/insert', async (req, res) => {
    try {
        const newStu = new Students(req.body);
        const savedStu = await newStu.save();

        // Retrieve all students from the database (you may need to define this function)
        const students = await Students.find();

        // Render the "students.ejs" view and pass the student data
        res.redirect('/student')
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Error creating student' });
    }
});

router.get('/delete', async (req, res) => {
    try {
        const studentId = req.query.id; // Get the student ID from query parameter

        // Find the student by ID and remove it from the database
        const deletedStudent = await Students.findByIdAndRemove(studentId);

        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.redirect('/student')
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Error deleting student' });
    }
});

router.post('/update', async (req, res) => {
    try {
        // Find the student by ID and update their information
        const updatedStudent = await Students.findByIdAndUpdate(
            req.body.id,
            {
                stdId: req.body.stdId,
                name: req.body.name,
                yos: req.body.yos,
                dob: req.body.dob,
                email: req.body.email,
            },
            { new: true } // Return the updated student document
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Redirect back to the student list after successful update
        res.redirect('/student');
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ error: 'Error updating student' });
    }
}); 


module.exports = router;