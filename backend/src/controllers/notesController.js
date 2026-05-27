 import Note from "../models/Note.js";

 export async function Registracija(req, res) {
    // Registracija konobara
    try{
        const notes = await Note.find().sort({createAt: -1}); //noviji prvi
        res.status(200).json(notes);
        
    }   catch (error) {
        console.error("Error in Registracija controller", error);
        res.status(500).json({ message: "Server error."});
    } 
}

export async function login(req, res) {
    // Prijava konobara
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in login controller", error);
        res.status(500).json({ message: "Server error." });
    }
}

export async function racuni(req, res) {
    try {
        const {title, content} = req.body;
        const racun = new Note({title, content});

        const sacuvanRacun = await racun.save();
        res.status(201).json(sacuvanRacun);
    } catch (error) {
        console.error("Error in racuni controller", error);
        res.status(500).json({ message: "Server error." });
    }
}

export async function izmeniRacun(req, res) {
    try{
        const {title, content} = req.body;
        const izmeniRacun = await Note.findByIdAndUpdate(req.params.prvi,
            {title, content},
            {new: true}
        );
        if(!izmeniRacun) return res.status(404).json({message:"Racun nije pronadjen."})
        
        res.status(200).json(izmeniRacun);
    }   catch (error){
        console.error("Error in izmeniRacun controller", error);
        res.status(500).json({ message: "Server error." });
    } 
}

export async function dodavanjeRacuna(req, res) {
    try{
        const racun = await Note.findById(req.params.id)
        if(!racun) return res.status(404).json({message:"Racun nije pronadjen."});
        res.json(racun);
    } catch (error){
        console.error("Error in dodavanjeRacuna controller", error);
        res.status(500).json({ message: "Server error." });
    } 
}

export async function brisanjeRacuna(req, res) {
    // Prijava konobara
    try{
        const brisanjeRacuna = await Note.findByIdAndDelete(req.params.brisi);
        if(!brisanjeRacuna) return res.status(404).json({message:"Racun nije pronadjen."})
        
        res.status(200).json({message: "Racun je uspesno obrisan"});
    }   catch (error){
        console.error("Error in brisanjeRacuna controller", error);
        res.status(500).json({ message: "Server error." });
    } 
}