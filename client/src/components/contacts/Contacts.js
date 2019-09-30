import React, {Fragment, useContext} from 'react';
import PropTypes from 'prop-types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = (props) => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;

  if (contacts.length===0) {
    return <h4>Please add a contact</h4>
  }
  return (
    <Fragment>
      <TransitionGroup>
      {filtered!==null
        ? filtered.map((contact) => (<CSSTransition key={contact.id} timeout={500} classNames='item'><ContactItem contact={contact}/></CSSTransition>)) //if dont want animation for filter then just remove it from this line
        : contacts.map(contact => (<CSSTransition key={contact.id} timeout={500} classNames='item'><ContactItem contact={contact}/></CSSTransition>))
      }
    </TransitionGroup>
    </Fragment>
  )
}

Contacts.propTypes = {

};

export default Contacts;
