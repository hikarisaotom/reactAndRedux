//import express from "express";
const express = require('express');
const app = express();

app.get('/', (req,res)=>res.send('API Running'))
// el segundo parametro es lo que vamos a responder cuando nos hagan un get
const PORT=process.env.PORT|| 5000;

  //segundo parametro es lo que va a pasar cuando nos conectemos 
  // ` (tecla [`^])es diferente de ' (tecla ?')
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));