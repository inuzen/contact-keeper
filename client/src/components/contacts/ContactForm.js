import React, {useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext'

const ContactForm = (props) => {
  const contactContext = useContext(ContactContext);
  const {addContact, updateContact, clearCurrent, current} = contactContext;

  //useEffect = lifecycle simulation. did update in this case
  useEffect(() => {
    if (current!==null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email:'',
        phone:'',
        type: 'personal'});
    }
  }, [contactContext, current]) //second argument is an array of trigger-changes. if one of them changes it fires the useEffect
  const [contact, setContact] = useState({
    name: '',
    email:'',
    phone:'',
    type: 'personal'
  })

  const {name, email, phone, type} = contact;

  const onChange = e => setContact({...contact, [e.target.name]: e.target.value}); //spread on contact means taken everything from current state
  const onSubmit = e =>{
    e.preventDefault();
    if (current===null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  }

  const clearAll = ()=>{
    clearCurrent();
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
      <input type="text" placeholder='Name' name='name' value={name} onChange={onChange}/>
      <input type="email" placeholder='Email' name='email' value={email} onChange={onChange}/>
      <input type="text" placeholder='Phone' name='phone' value={phone} onChange={onChange}/>
      <h5>Contact Type</h5>
      <input type="radio" name='type' value="personal" checked = {type==='personal'} onChange={onChange}/> Personal{' '}
      <input type="radio" name='type' value="professional" checked = {type==='professional'} onChange={onChange}/> Professional{' '}
      <div>
        <input type='submit' value={current ? 'Update Contact' : 'Add Contact'} className='btn btn-primary btn-block'></input>
      </div>
      {current && <div>
        <button className='btn btn-light btn-block' onClick={clearAll}>Clear</button>
      </div>}
    </form>

  )
}

ContactForm.propTypes = {

};

export default ContactForm;
