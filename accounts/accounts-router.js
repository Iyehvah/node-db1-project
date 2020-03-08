const express = require("express")
const router = express.Router()
const db = require("../data/dbConfig")

//GET accounts
router.get("/", async (req, res, next) => {
    try{
        const accounts = await db.select("*").from("accounts")
        res.json(accounts)
    } catch(error) {
        next(error)
    }
})

//GET account by ID
router.get("/:id", async (req, res, next) => {
    try{
        const accountById = await db.first("*").from("accounts").where("id", req.params.id)
        res.json(accountById)
    } catch(error) {
        next(error)
    }
})

//POST an account
router.post("/", async (req, res, next) => {
    try{
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
        const [id] = await db("accounts").insert(payload)
        const newAccount = await db("accounts").where("id", id).first()
        res.json(newAccount)
    } catch(error) {
        next(error)
    }
})

//DELETE account
router.delete("/:id", async (req, res, next) => {
    try{
        await db("accounts").where("id", req.params.id).del()
        res.status(204).end()
    } catch(error) {
        next(error)
    }
})

//UPDATE account
router.put("/:id", async (req, res, next) => {
    try{
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
        await db("accounts").where("id", req.params.id).update(payload)
        const updateAccount = await db("accounts").where("id", req.params.id).first()
        res.json(updateAccount)
    } catch(error) {
        next(error)
    }
})

module.exports = router