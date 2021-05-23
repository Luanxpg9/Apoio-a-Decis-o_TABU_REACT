const functions = require("firebase-functions")
const app = require("express")()

const admin = require("firebase-admin")
admin.initializeApp()

const salas = admin.firestore().collection("salas")
// const turmas = admin.firestore().collection("turmas")

app.get("/salas", function(request, response){

    salas.get()
        .then(function(docs){
            let salas = []
            docs.forEach(function(doc) {
                salas.push({
									id: doc.id, 
									id_sala: doc.data().id_sala,
									numero_cadeiras: doc.data().numero_cadeiras,
									acessivel: doc.data().acessivel,
									qualidade: doc.data().qualidade,
								})
            })
            response.json(salas)
        })
})

// app.post("/salas", function(request, response){
//     const newSala = {
//         name: request.body.name
//     }

//     salas.add(newSala).then(function(){
// 			response.status(200).json(null)
// 		})
// })

exports.api = functions.https.onRequest(app);
