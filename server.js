import express from 'express';
import mailer from 'nodemailer'
import fs from 'fs';
import handlebars from 'handlebars'
import cors from 'cors'
const app = express();
app.use(express.json())
app.use(cors())
const transpoter = mailer.createTransport({
    service: "gmail",
    auth: {
        user: "thanhphanvan1610@gmail.com",
        pass: "qagtfujryrxguvmb"
    }
})

const source = fs.readFileSync('./template/welcome.html', 'utf8');
const template = handlebars.compile(source)
app.post('/api/contact', async(req, res) => {
    const {name, email} = req.body;
    if(!name || !email){
        return res.status(400).json({error: `Require name or email`})
    }
    try {
        const message = {
            from: "TypeScript Dev",
            to: `${email}`,
            subject: "Wellcome to TypeScript Dev",
            text: "NODE 2023",
            html: template({email: `${email}`, name: `${name}`})
        }
        await transpoter.sendMail(message)
        return res.status(200).json({message: "Enail sent to you!! Let's check"})
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})
app.listen(3000, () => {
    console.log(`Server running on port 3000!`)
})