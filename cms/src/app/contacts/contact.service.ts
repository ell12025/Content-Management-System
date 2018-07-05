import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Contact } from "./contact.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS";
import { Subject } from "rxjs/internal/Subject";
import { Document } from "../documents/document.model";
import { DocumentService } from "../documents/document.service";

@Injectable()
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[];
  maxContactId: number;
  contactsListClone: Contact[];



  // Class constructor
  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }


  // Get all contacts
  getContacts() {
    return this.contacts.slice();
  }



  // Get a single contact based on ID
  getContact(id: string) {
    for(var i = 0; i < this.contacts.length; i++)
    {
      if(this.contacts[i].id == id)
      {
        return this.contacts[i];
      }
    }
    return null;
  }





  // Get contact max ID
  getMaxId(): number {
    var maxId = 0;

    for(var i = 0; i < this.contacts.length; i++)
    {
      var currentId = parseInt(this.contacts[i].id);
      if(currentId > maxId)
      {
        maxId = currentId;
      }
    }
    return maxId;
  }





  // Add a new contact
  addContact(newContact: Contact) {
    if(newContact === null || newContact === undefined)
    {
      return;
    }

    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    this.contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contactsListClone);
  }




  // Update a contact
  updateContact(originalContact: Contact, newContact: Contact) {
    if(originalContact === null || originalContact === undefined
    || newContact === null || newContact === undefined)
    {
      return;
    }

    var pos = this.contacts.indexOf(originalContact);

    if(pos < 0 )
    {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contactsListClone);
  }




  // Delete a contact when 'delete' is clicked
  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }

    var pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos,1);
    this.contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contacts.slice());
  }




}
