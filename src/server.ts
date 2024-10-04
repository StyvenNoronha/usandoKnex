import express, { Request, Response } from "express"
import { db } from "./database/knex"
const app = express()
app.use(express.json())

app.post("/cursos", async (request: Request, response: Response) => {
  const { name} = request.body
  await db("courses").insert({ name })
  
  return response.status(201).json({ message: "Deu certo" })
})

app.get("/cursos", async (request: Request, response: Response) => {
  const courses = await db("courses").select("*").orderBy("name")
  return  response.json(courses)
})

app.put("/cursos/:id", async (request: Request, response: Response) => {
  const { name } = request.body
  await db("courses").update({ name }).where({id: request.params.id})
  return  response.json({ message: "Nome atualizado com sucesso" })
})

app.delete("/cursos/:id", async (request: Request, response: Response) => {
  const {id} = request.params
  await db("courses").delete().where({id})
  return  response.json({ message: "Curso deletado com sucesso" })
})

app.post("/modulos", async (request: Request, response: Response) => {
  const { name, course_id } = request.body
  await db("course_modules").insert({ name, course_id })

  return response.status(201).json({ message: "Deu certo" })
})

app.get("/modulos", async (request: Request, response: Response) => {
  const courses = await db("course_modules").select("*").orderBy("name")
  return  response.json(courses)
})


app.get("/cursos/:id/modulos", async (request: Request, response: Response) => {
  const cursos = await db('courses')
  .select("course_modules.id","course_modules.name AS module","courses.name AS course")
  .join("course_modules","courses.id","course_modules.course_id")


  return response.json(cursos)
})
app.listen(3333, () => console.log(`Server is running on port 3333`))
