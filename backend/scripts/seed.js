import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {
    Personaje
} from '../src/models/personaje.model.js';
import {
    Frase
} from '../src/models/frase.model.js';

dotenv.config();

const personajesData = [{
        nombre: 'Rick Sanchez',
        edad: 70,
        tipo: 'principal',
        imageUrl: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        frases: [{
                frase: 'Wubba Lubba Dub-Dub!',
                season: [1],
            },
            {
                frase: "I'm sorry, but your opinion means very little to me.",
                season: [2],
            },
        ],
    },
    {
        nombre: 'Morty Smith',
        edad: 14,
        tipo: 'principal',
        imageUrl: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
        frases: [{
            frase: "Nobody exists on purpose. Nobody belongs anywhere. We're all going to die. Come watch TV.",
            season: [1],
        }, ],
    },
    {
        nombre: 'Jerry Smith',
        edad: 35,
        tipo: 'secundario',
        imageUrl: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
        frases: [{
            frase: "I'm the man of this house!",
            season: [1],
        }, ],
    },
    {
        nombre: 'Beth Smith',
        edad: 34,
        tipo: 'secundario',
        imageUrl: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
        frases: [{
                frase: "I'm a horse surgeon, not a doctor!",
                season: [1],
            },
            {
                frase: 'You love it? It\'s snake jazz.',
                season: [4],
            },
        ],
    },
    {
        nombre: 'Summer Smith',
        edad: 17,
        tipo: 'secundario',
        imageUrl: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
        frases: [{
            frase: "So, I'm like, the only normal person in this family.",
            season: [1],
        }, ],
    },
    {
        nombre: 'Evil Morty',
        edad: 14,
        tipo: 'secundario',
        imageUrl: 'https://rickandmortyapi.com/api/character/avatar/118.jpeg',
        frases: [{
            frase: 'This seems like a good time for a drink and a cold, calculated speech with sinister overtones.',
            season: [3],
        }, ],
    },
    {
        nombre: 'Mr. Poopybutthole',
        edad: 30,
        tipo: 'secundario',
        imageUrl: 'https://rickandmortyapi.com/api/character/avatar/244.jpeg',
        frases: [{
            frase: 'Ooo-wee!',
            season: [2],
        }, ],
    },
    {
        nombre: 'Glorp',
        edad: 999,
        tipo: 'secundario',
        imageUrl: 'https://static.wikia.nocookie.net/rickandmorty/images/e/e2/Garblovian.png/revision/latest/smart/width/386/height/259?cb=20160522164233',
        frases: [{
            frase: 'Gaggablaghblagh!',
            season: [2],
        }, ],
    },
    {
        nombre: 'Squanchy',
        edad: 40,
        tipo: 'secundario',
        imageUrl: 'https://rickandmortyapi.com/api/character/avatar/303.jpeg',
        frases: [{
            frase: 'I like to squanch myself in the evening.',
            season: [1],
        }, ],
    },
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conectado a MongoDB');

        await Personaje.deleteMany({});
        await Frase.deleteMany({});

        for (const personajeData of personajesData) {
            const { nombre, edad, tipo, imageUrl, frases } = personajeData;

            const personaje = new Personaje({
                nombre,
                edad,
                tipo,
                imageUrl,
                frases: []
            });

            await personaje.save();

            for (const fraseData of frases) {
                const nuevaFrase = new Frase({
                    frase: fraseData.frase,
                    autor: personaje._id,
                    season: fraseData.season
                });

                await nuevaFrase.save();

                personaje.frases.push(nuevaFrase._id);
            }

            await personaje.save();
        }

        console.log('✅ Datos de prueba insertados correctamente');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al insertar datos de prueba:', error);
        process.exit(1);
    }
}


seedDatabase();