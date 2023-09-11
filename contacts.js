const fs = require("fs").promises;
const path = require("path");
const contactsPath = "./db/contacts.json";
const { nanoid } = require("nanoid");

async function loadFile(path) {
  let file;
  try {
    file = await fs.readFile(path);
  } catch (err) {
    console.log(err.message);
  }
  return JSON.parse(file.toString());
}

async function saveFile(path, data) {
  fs.writeFile(path, JSON.stringify(data))
    .then(() => console.log("File saved"))
    .catch((err) => console.log(err.message));
}

async function listContacts() {
  const data = await loadFile(contactsPath);
  console.table(data);
}

async function getContactById(contactId) {
  const data = await loadFile(contactsPath);
  const filteredData = data.filter((element) => element.id === contactId);
  console.table(filteredData);
}

async function removeContact(contactId) {
  const data = await loadFile(contactsPath);
  const index = data.findIndex((element) => element.id === contactId);
  if (index === -1) {
    console.log("Contact not found");
  } else {
    data.splice(index, 1);
    console.log("Contact removed");
    saveFile(contactsPath, data);
  }
}

async function addContact({ name, email, phone }) {
  const data = await loadFile(contactsPath);
  data.push({ id: nanoid(), name: name, email: email, phone: phone });
  console.log("Contact added");
  saveFile(contactsPath, data);
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
