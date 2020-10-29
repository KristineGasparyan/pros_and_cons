import React, { Component } from 'react';
import './App.css';

export default class ProsAndConsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prosList: ['I really like it!', 'Successful company', 'Creative workplace', 'New experience and knowledge', 'I am sure, a pleasant atmosphere', ''],
      consList: ['Hope there is no any :)', '']
    };
  }

  addEmptyEntry = (listType) => {
    let emptyItem = this.state[listType].concat([''])
    this.setState({
      [listType]: emptyItem,
    })
  }

  removeEntry = (listType, index) => {
    this.setState((prevState) => ({
      ...prevState,
      [listType]: prevState[listType].filter((_item, i) => i !== index),
    }));
  }

  onEntryChange = (e, index, listType) => {
    const { value } = e.target;
    const list = [...this.state[listType]];
    list[index] = value;

    this.setState({
      [listType]: list,
    })

    if (this.state[listType].length - 1 === index) {
      this.addEmptyEntry(listType)
    }

    if (list[index].length === 0) {
      this.removeEntry(listType, index);
    }
  }

  generateEntryList = (listType) => {
    return (
      this.state[listType].map((entry, index) => (
        <li key={index}>
          <input
            value={entry}
            onChange={(e) => this.onEntryChange(e, index, listType)}
            type='text'
          />
        </li>
      ))
    )
  }

  render() {
    return (
      <div className='pros-and-cons-wrapper'>
        <div className='list-header'>
          <span>Should I work at Renderforest?</span>
        </div>
        <div className='lists-wrapper'>
          {
            Object.keys(this.state).map((listType) => (
              <div className='item-list' >
                <div className='label'> <span>{listType === 'prosList' ? 'PROS' : 'CONS'}</span> </div>
                <div className='content-wrapper'>
                  <ol>
                    {this.generateEntryList(listType)}
                  </ol>
                </div>
              </div>
            ))
          }
        </div>
      </div >
    );
  }
}