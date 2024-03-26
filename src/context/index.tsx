import React, { createContext, useContext } from 'react';

// Definindo o tipo para um contato
interface Contact {
  id: string;
  name: string;
  numberMain: string;
  numberCel: string;
  numberJob: string;
}

// Criando um contexto para os contatos
const ContactsContext = createContext<Contact[]>([]);

// Hook customizado para usar o contexto de contatos
export const useContacts = () => {
  return useContext(ContactsContext);
};

// Componente pai que fornece os contatos através do contexto
export const ContactsProvider: React.FC<{ contacts: Contact[], children: React.ReactNode }> = ({ contacts, children }) => {
  return (
    <ContactsContext.Provider value={contacts}>
      {children}
    </ContactsContext.Provider>
  );
};