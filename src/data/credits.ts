/** Ingredient photo credits, written by scripts/credits.mjs from scripts/picks.json. */
export interface Credit {
  what: string;
  title: string;
  page: string;
  author?: string;
  license: string;
}

export const CREDITS: Credit[] = [
  {
    "what": "Peanut",
    "title": "Peanuts (Arachis hypogaea) - in shell, shell cracked open, shelled, peeled",
    "page": "https://commons.wikimedia.org/wiki/File:Peanuts_(Arachis_hypogaea)_-_in_shell,_shell_cracked_open,_shelled,_peeled.jpg",
    "author": "Ivar Leidus",
    "license": "CC BY-SA 4.0"
  },
  {
    "what": "Corn",
    "title": "Yellow Corn on the Cob (35115370841)",
    "page": "https://commons.wikimedia.org/wiki/File:Yellow_Corn_on_the_Cob_(35115370841).jpg",
    "author": "Willis Lam",
    "license": "CC BY-SA 2.0"
  },
  {
    "what": "Cheese",
    "title": "White cheddar cheese",
    "page": "https://commons.wikimedia.org/wiki/File:White_cheddar_cheese.jpg",
    "author": "Jon Sullivan",
    "license": "Public domain"
  },
  {
    "what": "Salt",
    "title": "Salt Crystals",
    "page": "https://commons.wikimedia.org/wiki/File:Salt_Crystals.JPG",
    "author": "Mark Schellhase",
    "license": "CC BY-SA 3.0"
  }
];
