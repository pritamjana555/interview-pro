const Router = require('express')
const interviewReportSchema = require('../models/interviewReport.model')

const router = Router()

app.delete("/reports/:id", async (req, res) => {
    try{
        const report = await interviewReportSchema.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Deleted successfully" })
        if(!report){
            return res.status(404).json({ message: "Report not found" })
        }   
    }
    catch(err){
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
})