import React, { Component } from "react";
import ContactForm from "./contactForm/ContactForm";
import Filter from "./filter/Filter";
import ContactList from "./contactList/ContactList";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  state = {
    contacts: JSON.parse(localStorage.getItem("contacts")) || [],
    // [
    //   { id: uuidv4(), name: "Rosie Simpson", number: "459-12-56" },
    //   { id: uuidv4(), name: "Hermione Kline", number: "443-89-12" },
    //   { id: uuidv4(), name: "Eden Clements", number: "645-17-79" },
    //   { id: uuidv4(), name: "Annie Copeland", number: "227-91-26" },
    // ],
    filter: "",
  };
  componentDidUpdate() {
    const { contacts } = this.state;
    localStorage.setItem("contacts", JSON.stringify([...contacts]));
  }

  checkExistAndAdd = (newContact) => {
    const { contacts } = this.state;
    contacts.some(
      (contact) =>
        contact.name.toLocaleLowerCase() ===
          newContact.name.toLocaleLowerCase() ||
        contacts.some((contact) => contact.number === newContact.number)
    )
      ? alert(
          `Friend ${newContact.name} or number ${newContact.number} is alredy exist`
        )
      : this.setState({
          contacts: [...contacts, { ...newContact, id: uuidv4() }],
        });
  };

  handleFilter = (e) => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };
  filteredContacts = () =>
    this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

  handleDelete = (id) => {
    const filteredContacts = this.state.contacts.filter(
      (contact) => contact.id !== id
    );
    this.setState({ contacts: filteredContacts });
  };

  render() {
    const { filter } = this.state;
    const { handleDelete, handleFilter, checkExistAndAdd, filteredContacts } =
      this;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm checkExist={checkExistAndAdd} />

        <h2>Contacts</h2>
        <Filter inputValue={filter} handleFilter={handleFilter} />
        <ContactList
          contacts={filteredContacts()}
          handleDelete={handleDelete}
        />
      </div>
    );
  }
}

export default App;
