/**************************************************************
 GESTÃO DE PÁTIO - INTEGRAÇÃO RELACIONAL → NÃO RELACIONAL (MongoDB)
 4ª Entrega - Projeto de Banco de Dados
 
 Este script contém a inicialização do banco (criação de índices)
 e demonstra as consultas essenciais do projeto.
**************************************************************/

// 1️⃣ Seleciona o banco de dados 'Mottu'
db = db.getSiblingDB("Mottu"); 

// 2️⃣ Limpa a coleção para um setup limpo
db.motos.drop();
print("✅ Coleção 'motos' limpa.");

// 3️⃣ Cria índices essenciais (análogo a UNIQUE/INDEX no SQL)
db.motos.createIndex({ placa: 1 }, { unique: true });
db.motos.createIndex({ status: 1 });
db.motos.createIndex({ "_id": 1 });
print("✅ Índices criados nos campos 'placa', 'status' e '_id'.");

// 4️⃣ Insere os dados exportados do Oracle (JSON COMPLETO)
// Este é o array JSON gerado pela sua função PL/SQL fn_exportar_motos_mongo
db.motos.insertMany([
    {
        "_id": 1,
        "placa": "ABC1234",
        "modelo": "Honda Biz",
        "status": "manutencao",
        "localizacao": {
            "latitude": -23.6,
            "longitude": -46.7
        },
        "condutor": {
            "id": 1,
            "nome": "João Silva"
        },
        "filial": {
            "id": 1,
            "nome": "Filial Central",
            "endereco": "Av. Brasil, 1000",
            "cidade": "São Paulo",
            "estado": "SP"
        },
        "vaga_atual": {
            "numero": "A1",
            "status": "ocupada"
        },
        "manutencoes": [
            {
                "id_manutencao": 1,
                "tipo": "Preventiva",
                "data": "2024-01-10",
                "observacoes": "Troca de óleo"
            },
            {
                "id_manutencao": 2,
                "tipo": "Corretiva",
                "data": "2024-02-15",
                "observacoes": "Reparo no freio"
            }
        ],
        "movimentacoes": [
            {
                "id_movimentacao": 1,
                "origem": "A1",
                "destino": "A2",
                "observacao": "Reposicionamento manual"
            }
        ]
    },
    {
        "_id": 2,
        "placa": "XYZ5678",
        "modelo": "Yamaha XTZ",
        "status": "ocupada",
        "localizacao": {
            "latitude": -23.551,
            "longitude": -46.634
        },
        "condutor": {
            "id": 2,
            "nome": "Maria Souza"
        },
        "filial": {
            "id": 2,
            "nome": "Filial Norte",
            "endereco": "Rua das Palmeiras, 200",
            "cidade": "Campinas",
            "estado": "SP"
        },
        "vaga_atual": {
            "numero": "B1",
            "status": "ocupada"
        },
        "manutencoes": [
            {
                "id_manutencao": 3,
                "tipo": "Preventiva",
                "data": "2024-03-05",
                "observacoes": "Revisão geral"
            }
        ],
        "movimentacoes": [
            {
                "id_movimentacao": 2,
                "origem": "B1",
                "destino": "C1",
                "observacao": "Troca de vaga por manutenção"
            }
        ]
    },
    {
        "_id": 3,
        "placa": "JKL3456",
        "modelo": "Honda CG",
        "status": "manutencao",
        "localizacao": {
            "latitude": -23.552,
            "longitude": -46.635
        },
        "condutor": {
            "id": 3,
            "nome": "Pedro Oliveira"
        },
        "filial": {
            "id": 3,
            "nome": "Filial Leste",
            "endereco": "Av. Dom Pedro, 300",
            "cidade": "Santos",
            "estado": "SP"
        },
        "vaga_atual": null,
        "manutencoes": [
            {
                "id_manutencao": 4,
                "tipo": "Corretiva",
                "data": "2024-03-20",
                "observacoes": "Troca de bateria"
            }
        ],
        "movimentacoes": [
            {
                "id_movimentacao": 3,
                "origem": "C1",
                "destino": "D1",
                "observacao": "Remanejamento interno"
            }
        ]
    },
    {
        "_id": 4,
        "placa": "MNO6789",
        "modelo": "Shineray XY",
        "status": "disponivel",
        "localizacao": {
            "latitude": -23.553,
            "longitude": -46.636
        },
        "condutor": {
            "id": 4,
            "nome": "Ana Paula"
        },
        "filial": {
            "id": 4,
            "nome": "Filial Sul",
            "endereco": "Rua das Flores, 400",
            "cidade": "Sorocaba",
            "estado": "SP"
        },
        "vaga_atual": null,
        "manutencoes": [
            {
                "id_manutencao": 5,
                "tipo": "Preventiva",
                "data": "2024-04-10",
                "observacoes": "Lubrificação"
            }
        ],
        "movimentacoes": [
            {
                "id_movimentacao": 4,
                "origem": "D1",
                "destino": "A1",
                "observacao": "Vaga liberada para manutenção"
            }
        ]
    },
    {
        "_id": 5,
        "placa": "PQR1234",
        "modelo": "Honda Elite",
        "status": "ocupada",
        "localizacao": {
            "latitude": -23.554,
            "longitude": -46.637
        },
        "condutor": {
            "id": 5,
            "nome": "Carlos Lima"
        },
        "filial": {
            "id": 5,
            "nome": "Filial Oeste",
            "endereco": "Av. Getúlio Vargas, 500",
            "cidade": "Ribeirão Preto",
            "estado": "SP"
        },
        "vaga_atual": {
            "numero": "D1",
            "status": "ocupada"
        },
        "manutencoes": [],
        "movimentacoes": [
            {
                "id_movimentacao": 5,
                "origem": "A2",
                "destino": "B1",
                "observacao": "Alocação inicial"
            }
        ]
    }
]);
print("✅ 5 documentos importados com sucesso.");


// --- CONSULTAS DE TESTE (DEMONSTRAÇÃO DE REQUISITOS NoSQL) ---

// 5️⃣ Consulta de um Documento Completo por ID (Teste findOne)
print("\n📋 5. Documento Completo da Moto 1 (_id: 1):");
printjson(db.motos.findOne({ _id: 1 }));

// 6️⃣ Filtro por status (Simples)
print("\n🏍️ 6. Motos em Manutenção (status: 'manutencao'):");
db.motos.find({ status: "manutencao" }).forEach(printjson);

// 7️⃣ Agregação: Total de Manutenções por Tipo (Agregação em Array Embutido)
print("\n🛠️ 7. Total de Manutenções por Tipo:");
db.motos.aggregate([
  { $unwind: "$manutencoes" }, 
  { $group: { _id: "$manutencoes.tipo", total_ocorrencias: { $sum: 1 } } },
  { $sort: { total_ocorrencias: -1 } }
]).forEach(printjson);

// 8️⃣ Agregação: Total de Motos por Filial (Agregação em Objeto Embutido)
print("\n📊 8. Total de Motos por Filial:");
db.motos.aggregate([
  { $group: { _id: "$filial.nome", total_motos: { $sum: 1 } } },
  { $sort: { total_motos: -1 } }
]).forEach(printjson);

// 9️⃣ Validação final - contagem total
print("\n🚦 9. Total de documentos na coleção:");
printjson(db.motos.countDocuments());