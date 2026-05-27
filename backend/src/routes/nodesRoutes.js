

import express from "express"
import { Registracija, login, racuni, izmeniRacun, dodavanjeRacuna, brisanjeRacuna} from "../controllers/notesController.js";


const router = express.Router();

//login i register ruter

router.get('/', Registracija);
router.get('/', login);
//racuni
router.post('/', racuni);

router.put('/:prvi', izmeniRacun);

router.get('/:id', dodavanjeRacuna);

router.delete('/:brisi', brisanjeRacuna);

export default router;